import { errorResponse, json, sanitizeText } from "../_utils.js";

async function listKvSubmissions(kvNamespace, limit, submissionType) {
  const listed = await kvNamespace.list({ prefix: "submission:", limit: Math.min(limit, 100) });
  const values = await Promise.all(
    listed.keys.map(async (entry) => {
      const raw = await kvNamespace.get(entry.name);
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    })
  );

  return values
    .filter(Boolean)
    .filter((item) => !submissionType || item.submissionType === submissionType)
    .sort((left, right) => String(right.createdAt || "").localeCompare(String(left.createdAt || "")))
    .slice(0, limit)
    .map((item) => ({
      id: item.id,
      submission_type: item.submissionType,
      service: item.service,
      source_page: item.sourcePage,
      name: item.name,
      email: item.email,
      phone: item.phone,
      city: item.city,
      subject: item.subject,
      status: item.status,
      created_at: item.createdAt
    }));
}

export async function onRequestGet(context) {
  const expected = String(context.env.ADMIN_API_KEY || "").trim();
  if (!expected) {
    return errorResponse("ADMIN_API_KEY non configuree.", 503, "admin_not_configured");
  }

  const provided = String(context.request.headers.get("x-admin-key") || "").trim();
  if (!provided || provided !== expected) {
    return errorResponse("Acces refuse.", 401, "unauthorized");
  }

  const url = new URL(context.request.url);
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || 25), 1), 100);
  const submissionType = sanitizeText(url.searchParams.get("type") || "", 40).toLowerCase();
  const allowedTypes = new Set(["contact", "quote"]);
  const typeFilter = allowedTypes.has(submissionType) ? submissionType : "";

  if (!context.env.DB && !context.env.SUBMISSIONS_KV) {
    return errorResponse("Aucun stockage n'est configure pour lister les demandes.", 503, "storage_not_configured");
  }

  if (context.env.DB) {
    const query = `
      SELECT
        id,
        submission_type,
        service,
        source_page,
        name,
        email,
        phone,
        city,
        subject,
        status,
        created_at
      FROM submissions
      ${typeFilter ? "WHERE submission_type = ?" : ""}
      ORDER BY created_at DESC
      LIMIT ?
    `;

    const prepared = typeFilter
      ? context.env.DB.prepare(query).bind(typeFilter, limit)
      : context.env.DB.prepare(query).bind(limit);

    const { results } = await prepared.all();

    return json({
      ok: true,
      storage: "d1",
      count: results.length,
      items: results
    });
  }

  const items = await listKvSubmissions(context.env.SUBMISSIONS_KV, limit, typeFilter);

  return json({
    ok: true,
    storage: "kv",
    count: items.length,
    items
  });
}
