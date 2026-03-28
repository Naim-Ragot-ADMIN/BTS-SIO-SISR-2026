import {
  baseCapabilities,
  createReference,
  errorResponse,
  getClientMeta,
  json,
  maybeNotifyWebhook,
  readJson,
  sanitizeArray,
  sanitizeText,
  storeSubmission,
  verifyTurnstile
} from "./_utils.js";

export async function onRequestPost(context) {
  const payload = await readJson(context.request);
  if (!payload) {
    return errorResponse("Charge utile JSON invalide.", 400, "invalid_json");
  }

  const quoteType = sanitizeText(payload.quoteType || "general", 40);
  const name = sanitizeText(payload.name, 160);
  const email = sanitizeText(payload.email, 200);
  const phone = sanitizeText(payload.phone, 60);
  const city = sanitizeText(payload.city, 120);
  const subject = sanitizeText(payload.subject, 180) || `Demande devis ${quoteType}`;
  const message = sanitizeText(payload.message, 5000);
  const summary = sanitizeText(payload.summary, 5000);
  const sourcePage = sanitizeText(payload.sourcePage || "devis", 80);
  const serviceMode = sanitizeText(payload.serviceMode, 80);
  const urgency = sanitizeText(payload.urgency, 80);
  const travelZone = sanitizeText(payload.travelZone, 120);
  const frequency = sanitizeText(payload.frequency, 120);
  const selections = sanitizeArray(payload.selections, 30);
  const totalEstimate = Number(payload.totalEstimate || 0);
  const turnstileToken = sanitizeText(payload.turnstileToken, 2048);

  if (!name) return errorResponse("Nom ou entreprise requis.", 400, "missing_name");
  if (!email && !phone) return errorResponse("Email ou telephone requis.", 400, "missing_contact");
  if (!selections.length) return errorResponse("Au moins une prestation est requise.", 400, "missing_selection");

  const captcha = await verifyTurnstile(context.env, context.request, turnstileToken);
  if (!captcha.ok) {
    return errorResponse("Validation anti-spam invalide.", 403, "turnstile_failed", { details: captcha.details || [captcha.reason] });
  }

  const reference = createReference("NJR-QUOTE");
  const createdAt = new Date().toISOString();
  const record = {
    id: reference,
    submissionType: "quote",
    service: quoteType,
    sourcePage,
    name,
    email,
    phone,
    city,
    subject,
    message,
    summary: summary || message,
    payload: {
      quoteType,
      serviceMode,
      urgency,
      travelZone,
      frequency,
      selections,
      totalEstimate,
      summary,
      message
    },
    metadata: {
      client: getClientMeta(context.request),
      turnstile: captcha
    },
    createdAt,
    status: "received"
  };

  const storage = await storeSubmission(context.env, record);
  const webhook = await maybeNotifyWebhook(context.env.QUOTE_WEBHOOK_URL, {
    reference,
    type: "quote",
    quoteType,
    subject,
    name,
    email,
    phone,
    city,
    serviceMode,
    urgency,
    travelZone,
    frequency,
    totalEstimate,
    selections,
    summary,
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
