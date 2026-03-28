import {
  baseCapabilities,
  createReference,
  errorResponse,
  getClientMeta,
  json,
  maybeNotifyWebhook,
  readJson,
  sanitizeText,
  storeSubmission,
  verifyTurnstile
} from "./_utils.js";

export async function onRequestPost(context) {
  const payload = await readJson(context.request);
  if (!payload) {
    return errorResponse("Charge utile JSON invalide.", 400, "invalid_json");
  }

  const name = sanitizeText(payload.name, 160);
  const email = sanitizeText(payload.email, 200);
  const phone = sanitizeText(payload.phone, 60);
  const service = sanitizeText(payload.service, 120);
  const subject = sanitizeText(payload.subject, 180) || (service ? `Demande ${service} / NJR Solutions` : "Contact site NJR Solutions");
  const message = sanitizeText(payload.message, 5000);
  const sourcePage = sanitizeText(payload.sourcePage || "contact.html", 80);
  const turnstileToken = sanitizeText(payload.turnstileToken, 2048);

  if (!name) return errorResponse("Nom requis.", 400, "missing_name");
  if (!email && !phone) return errorResponse("Email ou telephone requis.", 400, "missing_contact");
  if (!message || message.length < 10) return errorResponse("Message trop court.", 400, "missing_message");

  const captcha = await verifyTurnstile(context.env, context.request, turnstileToken);
  if (!captcha.ok) {
    return errorResponse("Validation anti-spam invalide.", 403, "turnstile_failed", { details: captcha.details || [captcha.reason] });
  }

  const reference = createReference("NJR-CONTACT");
  const createdAt = new Date().toISOString();
  const record = {
    id: reference,
    submissionType: "contact",
    service,
    sourcePage,
    name,
    email,
    phone,
    city: "",
    subject,
    message,
    summary: message,
    payload,
    metadata: {
      client: getClientMeta(context.request),
      turnstile: captcha
    },
    createdAt,
    status: "received"
  };

  const storage = await storeSubmission(context.env, record);
  const webhook = await maybeNotifyWebhook(context.env.CONTACT_WEBHOOK_URL, {
    reference,
    type: "contact",
    subject,
    name,
    email,
    phone,
    service,
    message,
    createdAt
  });

  if (!storage.ok && !webhook.delivered) {
    return errorResponse(
      "Le backend est pret mais aucun stockage ou webhook n'est encore configure.",
      503,
      "storage_not_configured",
      { features: baseCapabilities(context.env) }
    );
  }

  return json({
    ok: true,
    reference,
    stored: storage.storage,
    notified: webhook.delivered,
    createdAt
  }, 201);
}
