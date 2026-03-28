import { errorResponse, json, readJson, sanitizeText } from "../_utils.js";
import { authUnavailableResponse, authenticateUser, buildSessionCookie, createSession, readAuthSummary } from "./_auth.js";

export async function onRequestPost(context) {
  if (!context.env.DB) {
    return authUnavailableResponse();
  }

  const summary = await readAuthSummary(context.env, context.request, { touch: false });
  if (summary.setupRequired) {
    return errorResponse("L'espace prive n'est pas encore initialise. Cree d'abord le premier compte.", 409, "setup_required", {
      setupRequired: true
    });
  }

  const payload = await readJson(context.request);
  const username = sanitizeText(payload?.username || "", 80);
  const password = String(payload?.password || "");
  if (!username || !password) {
    return errorResponse("Identifiant et mot de passe requis.", 400, "missing_credentials");
  }

  const user = await authenticateUser(context.env, username, password);
  if (!user) {
    return errorResponse("Identifiant ou mot de passe incorrect.", 401, "invalid_credentials");
  }

  const session = await createSession(context.env, user, context.request);
  return json({
    ok: true,
    authenticated: true,
    username: session.username,
    expiresAt: session.expiresAt
  }, 200, {
    "set-cookie": buildSessionCookie(session.token)
  });
}
