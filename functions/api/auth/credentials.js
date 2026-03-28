import { errorResponse, json, readJson, sanitizeText } from "../_utils.js";
import { authUnavailableResponse, buildSessionCookie, createSession, getCurrentSession, rotateCredentials } from "./_auth.js";

export async function onRequestPost(context) {
  try {
    if (!context.env.DB) {
      return authUnavailableResponse();
    }

    const currentSession = await getCurrentSession(context.env, context.request, { touch: false });
    if (!currentSession) {
      return errorResponse("Session privee invalide ou expiree.", 401, "unauthorized");
    }

    const payload = await readJson(context.request);
    const username = sanitizeText(payload?.username || currentSession.username || "", 80);
    const password = String(payload?.password || "");
    const confirmPassword = String(payload?.confirmPassword || "");

    if (!password) {
      return errorResponse("Renseigne un nouveau mot de passe.", 400, "missing_password");
    }
    if (password.length < 8) {
      return errorResponse("Le mot de passe doit contenir au moins 8 caracteres.", 400, "weak_password");
    }
    if (password !== confirmPassword) {
      return errorResponse("La confirmation du mot de passe ne correspond pas.", 400, "password_mismatch");
    }

    let user;
    try {
      user = await rotateCredentials(context.env, currentSession, username, password);
    } catch (error) {
      if (error?.message === "username_taken") {
        return errorResponse("Cet identifiant est deja utilise.", 409, "username_taken");
      }
      return errorResponse("Impossible de mettre a jour les identifiants.", 400, error?.message || "credentials_update_failed");
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
  } catch (error) {
    return errorResponse(error?.message || "credentials_update_failed", 500, "credentials_update_failed");
  }
}
