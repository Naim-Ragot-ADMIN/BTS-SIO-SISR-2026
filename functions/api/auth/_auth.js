import { getClientMeta, json, sanitizeText } from "../_utils.js";

export const SESSION_COOKIE = "njr_private_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 14;
const PASSWORD_ITERATIONS = 120000;

const AUTH_SCHEMA = `
CREATE TABLE IF NOT EXISTS auth_users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  password_iterations INTEGER NOT NULL DEFAULT 120000,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  session_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  ip_masked TEXT,
  user_agent TEXT,
  FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_auth_users_username ON auth_users(username);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_hash ON auth_sessions(session_hash);
CREATE INDEX IF NOT EXISTS idx_auth_sessions_expires ON auth_sessions(expires_at);
`;

function toBase64Url(bytes) {
  const text = String.fromCharCode(...bytes);
  return btoa(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function utf8(value) {
  return new TextEncoder().encode(String(value || ""));
}

function normalizeUsername(value) {
  return sanitizeText(value || "", 80).trim().toLowerCase();
}

function safeEqual(left, right) {
  const a = String(left || "");
  const b = String(right || "");
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return result === 0;
}

async function sha256Hex(value) {
  const digest = await crypto.subtle.digest("SHA-256", utf8(value));
  return Array.from(new Uint8Array(digest)).map((chunk) => chunk.toString(16).padStart(2, "0")).join("");
}

async function derivePasswordHash(password, salt, iterations = PASSWORD_ITERATIONS) {
  const secret = await crypto.subtle.importKey("raw", utf8(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({
    name: "PBKDF2",
    hash: "SHA-256",
    iterations,
    salt: utf8(salt)
  }, secret, 256);
  return toBase64Url(new Uint8Array(bits));
}

function randomSecret(size = 32) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return toBase64Url(bytes);
}

function parseCookies(request) {
  const raw = String(request.headers.get("cookie") || "");
  return raw.split(";").reduce((accumulator, part) => {
    const [name, ...rest] = part.trim().split("=");
    if (!name) return accumulator;
    accumulator[name] = decodeURIComponent(rest.join("=") || "");
    return accumulator;
  }, {});
}

function cookieBase(maxAge = SESSION_TTL_SECONDS) {
  return `${SESSION_COOKIE}=`;
}

export function buildSessionCookie(token, maxAge = SESSION_TTL_SECONDS) {
  return `${cookieBase()}${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

export function clearSessionCookie() {
  return `${cookieBase()}deleted; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

export async function ensureAuthStorage(env) {
  if (!env.DB) return false;
  if (env.__authStorageReady) return true;
  await env.DB.exec(AUTH_SCHEMA);
  env.__authStorageReady = true;
  return true;
}

export async function readAuthSummary(env, request, options = {}) {
  const available = await ensureAuthStorage(env);
  if (!available) {
    return {
      available: false,
      configured: false,
      setupRequired: false,
      authenticated: false,
      username: "",
      expiresAt: "",
      canBootstrap: false
    };
  }

  const countRow = await env.DB.prepare("SELECT COUNT(*) AS total FROM auth_users").first();
  const totalUsers = Number(countRow?.total || 0);
  const configured = totalUsers > 0;
  const session = configured ? await getCurrentSession(env, request, options) : null;

  return {
    available: true,
    configured,
    setupRequired: !configured,
    authenticated: Boolean(session),
    username: session?.username || "",
    expiresAt: session?.expiresAt || "",
    canBootstrap: !configured
  };
}

export async function createInitialUser(env, username, password) {
  await ensureAuthStorage(env);
  const normalized = normalizeUsername(username);
  if (!normalized || String(password || "").length < 8) {
    throw new Error("invalid_credentials");
  }

  const existing = await env.DB.prepare("SELECT COUNT(*) AS total FROM auth_users").first();
  if (Number(existing?.total || 0) > 0) {
    throw new Error("already_configured");
  }

  const now = new Date().toISOString();
  const salt = randomSecret(16);
  const hash = await derivePasswordHash(password, salt);

  const id = crypto.randomUUID();

  await env.DB.prepare(`
    INSERT INTO auth_users (
      id,
      username,
      password_hash,
      password_salt,
      password_iterations,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id,
    normalized,
    hash,
    salt,
    PASSWORD_ITERATIONS,
    now,
    now
  ).run();

  return { id, username: normalized };
}

export async function authenticateUser(env, username, password) {
  await ensureAuthStorage(env);
  const normalized = normalizeUsername(username);
  if (!normalized || !password) return null;

  const user = await env.DB.prepare(`
    SELECT id, username, password_hash, password_salt, password_iterations
    FROM auth_users
    WHERE lower(username) = ?
    LIMIT 1
  `).bind(normalized).first();

  if (!user) return null;

  const derived = await derivePasswordHash(password, user.password_salt, Number(user.password_iterations || PASSWORD_ITERATIONS));
  if (!safeEqual(derived, user.password_hash)) return null;

  return {
    id: user.id,
    username: user.username
  };
}

export async function createSession(env, user, request) {
  await ensureAuthStorage(env);
  const meta = getClientMeta(request);
  const token = randomSecret(32);
  const tokenHash = await sha256Hex(token);
  const now = new Date();
  const createdAt = now.toISOString();
  const expiresAt = new Date(now.getTime() + (SESSION_TTL_SECONDS * 1000)).toISOString();

  await env.DB.prepare(`
    INSERT INTO auth_sessions (
      id,
      user_id,
      session_hash,
      created_at,
      expires_at,
      last_seen_at,
      ip_masked,
      user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    crypto.randomUUID(),
    user.id,
    tokenHash,
    createdAt,
    expiresAt,
    createdAt,
    meta.ipMasked,
    meta.userAgent
  ).run();

  return {
    token,
    username: user.username,
    expiresAt
  };
}

export async function getCurrentSession(env, request, options = {}) {
  await ensureAuthStorage(env);
  const cookies = parseCookies(request);
  const token = sanitizeText(cookies[SESSION_COOKIE] || "", 400);
  if (!token) return null;

  const tokenHash = await sha256Hex(token);
  const now = new Date().toISOString();
  const row = await env.DB.prepare(`
    SELECT
      auth_sessions.id,
      auth_sessions.expires_at,
      auth_users.id AS user_id,
      auth_users.username
    FROM auth_sessions
    INNER JOIN auth_users ON auth_users.id = auth_sessions.user_id
    WHERE auth_sessions.session_hash = ?
      AND auth_sessions.expires_at > ?
    LIMIT 1
  `).bind(tokenHash, now).first();

  if (!row) return null;

  if (options.touch !== false) {
    await env.DB.prepare(`
      UPDATE auth_sessions
      SET last_seen_at = ?
      WHERE id = ?
    `).bind(new Date().toISOString(), row.id).run();
  }

  return {
    id: row.id,
    userId: row.user_id,
    username: row.username,
    expiresAt: row.expires_at,
    token
  };
}

export async function destroySession(env, request) {
  await ensureAuthStorage(env);
  const cookies = parseCookies(request);
  const token = sanitizeText(cookies[SESSION_COOKIE] || "", 400);
  if (!token) return;
  const tokenHash = await sha256Hex(token);
  await env.DB.prepare("DELETE FROM auth_sessions WHERE session_hash = ?").bind(tokenHash).run();
}

export async function rotateCredentials(env, session, username, password) {
  await ensureAuthStorage(env);
  const nextUsername = normalizeUsername(username || session.username);
  if (!nextUsername || String(password || "").length < 8) {
    throw new Error("invalid_credentials");
  }

  const duplicate = await env.DB.prepare(`
    SELECT id
    FROM auth_users
    WHERE lower(username) = ?
      AND id != ?
    LIMIT 1
  `).bind(nextUsername, session.userId).first();

  if (duplicate) {
    throw new Error("username_taken");
  }

  const salt = randomSecret(16);
  const hash = await derivePasswordHash(password, salt);
  const updatedAt = new Date().toISOString();

  await env.DB.prepare(`
    UPDATE auth_users
    SET username = ?, password_hash = ?, password_salt = ?, password_iterations = ?, updated_at = ?
    WHERE id = ?
  `).bind(
    nextUsername,
    hash,
    salt,
    PASSWORD_ITERATIONS,
    updatedAt,
    session.userId
  ).run();

  await env.DB.prepare("DELETE FROM auth_sessions WHERE user_id = ?").bind(session.userId).run();

  return {
    id: session.userId,
    username: nextUsername
  };
}

export function authUnavailableResponse() {
  return json({
    ok: false,
    code: "auth_unavailable",
    message: "L'authentification serveur n'est pas encore configuree. Active le binding D1 DB dans Cloudflare."
  }, 503);
}
