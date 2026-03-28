const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store"
};

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...headers
    }
  });
}

export function errorResponse(message, status = 400, code = "bad_request", extra = {}) {
  return json({
    ok: false,
    code,
    message,
    ...extra
  }, status);
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function sanitizeText(value, maxLength = 4000) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\t/g, " ")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeArray(values, maxItems = 20) {
  return Array.isArray(values)
    ? values
      .map((value) => sanitizeText(value, 240))
      .filter(Boolean)
      .slice(0, maxItems)
    : [];
}

export function createReference(prefix = "NJR") {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 12);
  const suffix = crypto.randomUUID().split("-")[0].toUpperCase();
  return `${prefix}-${stamp}-${suffix}`;
}

function maskIpv4(ip) {
  const parts = ip.split(".");
  if (parts.length !== 4) return ip;
  return `${parts[0]}.${parts[1]}.${parts[2]}.x`;
}

function maskIpv6(ip) {
  const parts = ip.split(":");
  return `${parts.slice(0, 4).join(":")}::`;
}

export function maskIp(ip) {
  const text = String(ip || "").trim();
  if (!text) return "";
  if (text.includes(".")) return maskIpv4(text);
  if (text.includes(":")) return maskIpv6(text);
  return text;
}

export function getClientMeta(request) {
  return {
    ipMasked: maskIp(request.headers.get("cf-connecting-ip") || ""),
    country: request.cf?.country || "",
    colo: request.cf?.colo || "",
    ray: request.headers.get("cf-ray") || "",
    userAgent: sanitizeText(request.headers.get("user-agent") || "", 400)
  };
}

export async function verifyTurnstile(env, request, token) {
  if (!env.TURNSTILE_SECRET_KEY) {
    return { ok: true, skipped: true };
  }

  const challenge = sanitizeText(token || "", 2048);
  if (!challenge) {
    return { ok: false, reason: "missing_token" };
  }

  const form = new URLSearchParams();
  form.set("secret", env.TURNSTILE_SECRET_KEY);
  form.set("response", challenge);
  const remoteIp = request.headers.get("cf-connecting-ip");
  if (remoteIp) form.set("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: form
  });

  if (!response.ok) {
    return { ok: false, reason: "turnstile_http_error", status: response.status };
  }

  const payload = await response.json();
  return {
    ok: Boolean(payload.success),
    skipped: false,
    details: payload["error-codes"] || []
  };
}

export async function maybeNotifyWebhook(url, payload) {
  if (!url) return { attempted: false, delivered: false };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload)
    });
    return {
      attempted: true,
      delivered: response.ok,
      status: response.status
    };
  } catch (error) {
    return {
      attempted: true,
      delivered: false,
      error: error.message || "webhook_error"
    };
  }
}

export async function storeSubmission(env, record) {
  if (env.DB) {
    await env.DB.prepare(`
      INSERT INTO submissions (
        id,
        submission_type,
        service,
        source_page,
        name,
        email,
        phone,
        city,
        subject,
        message,
        summary,
        payload_json,
        metadata_json,
        status,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      record.id,
      record.submissionType,
      record.service,
      record.sourcePage,
      record.name,
      record.email,
      record.phone,
      record.city,
      record.subject,
      record.message,
      record.summary,
      JSON.stringify(record.payload || {}),
      JSON.stringify(record.metadata || {}),
      record.status || "received",
      record.createdAt
    ).run();

    return { ok: true, storage: "d1" };
  }

  if (env.SUBMISSIONS_KV) {
    await env.SUBMISSIONS_KV.put(
      `submission:${record.id}`,
      JSON.stringify(record),
      {
        metadata: {
          type: record.submissionType,
          service: record.service,
          createdAt: record.createdAt
        }
      }
    );
    return { ok: true, storage: "kv" };
  }

  return { ok: false, storage: "none" };
}

export function baseCapabilities(env) {
  return {
    api: true,
    storage: Boolean(env.DB || env.SUBMISSIONS_KV),
    d1: Boolean(env.DB),
    kv: Boolean(env.SUBMISSIONS_KV),
    turnstile: Boolean(env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY),
    turnstileSiteKey: env.TURNSTILE_SITE_KEY || "",
    contactWebhook: Boolean(env.CONTACT_WEBHOOK_URL),
    quoteWebhook: Boolean(env.QUOTE_WEBHOOK_URL),
    adminApi: Boolean(env.ADMIN_API_KEY)
  };
}
