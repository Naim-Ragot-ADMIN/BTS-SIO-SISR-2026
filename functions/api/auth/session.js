import { json } from "../_utils.js";
import { authUnavailableResponse, readAuthSummary } from "./_auth.js";

export async function onRequestGet(context) {
  try {
    if (!context.env.DB) {
      return authUnavailableResponse();
    }

    const summary = await readAuthSummary(context.env, context.request);
    return json({
      ok: true,
      ...summary
    });
  } catch (error) {
    return json({
      ok: false,
      code: "auth_session_failed",
      message: error?.message || "auth_session_failed"
    }, 500);
  }
}
