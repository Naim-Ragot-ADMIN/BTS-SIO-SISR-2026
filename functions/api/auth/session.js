import { json } from "../_utils.js";
import { authUnavailableResponse, readAuthSummary } from "./_auth.js";

export async function onRequestGet(context) {
  if (!context.env.DB) {
    return authUnavailableResponse();
  }

  const summary = await readAuthSummary(context.env, context.request);
  return json({
    ok: true,
    ...summary
  });
}
