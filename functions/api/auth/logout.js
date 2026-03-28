import { json } from "../_utils.js";
import { authUnavailableResponse, clearSessionCookie, destroySession } from "./_auth.js";

export async function onRequestPost(context) {
  try {
    if (!context.env.DB) {
      return authUnavailableResponse();
    }

    await destroySession(context.env, context.request);
    return json({
      ok: true,
      authenticated: false
    }, 200, {
      "set-cookie": clearSessionCookie()
    });
  } catch (error) {
    return json({
      ok: false,
      code: "logout_failed",
      message: error?.message || "logout_failed"
    }, 500);
  }
}
