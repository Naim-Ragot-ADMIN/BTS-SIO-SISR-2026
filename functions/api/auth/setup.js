import { errorResponse, json, readJson, sanitizeText } from "../_utils.js";
import { authUnavailableResponse, buildSessionCookie, createInitialUser, createSession, readAuthSummary } from "./_auth.js";

export async function onRequestPost(context) {
  if (!context.env.DB) {
    return authUnavailableResponse();
  }

  const summary = await readAuthSummary(context.env, context.request, { touch: false });
  if (!summary.setupRequired) {
    return errorResponse("L'espace prive est deja initialise.", 409, "already_configured");
  }

  const payload = await readJson(context.request);
  const username = sanitizeText(payload?.username || "", 80);
  const password = String(payload?.password || "");
  const confirmPassword = String(payload?.confirmPassword || "");

  if (!username || !password) {
    return errorResponse("Identifiant et mot de passe requis.", 400, "missing_credentials");
  }
  if (password.length < 8) {
    return errorResponse("Le mot de passe doit contenir au moins 8 caracteres.", 400, "weak_password");
  }
  if (password !== confirmPassword) {
    return errorResponse("La confirmation du mot de passe ne correspond pas.", 400, "password_mismatch");
  }

  let user;
  try {
    user = await createInitialUser(context.env, username, password);
  } catch (error) {
    if (error?.message === "already_configured") {
      return errorResponse("L'espace prive a deja ete configure.", 409, "already_configured");
    }
    return errorResponse("Impossible de creer le premier compte.", 400, error?.message || "setup_failed");
  }

  const session = await createSession(context.env, { id: user.id || "", username: user.username }, context.request);
  return json({
    ok: true,
    authenticated: true,
    configured: true,
    username: session.username,
    expiresAt: session.expiresAt
  }, 200, {
    "set-cookie": buildSessionCookie(session.token)
  });
}
