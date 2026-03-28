import { baseCapabilities, json } from "./_utils.js";

export async function onRequestGet(context) {
  return json({
    ok: true,
    runtime: "cloudflare-pages-functions",
    features: baseCapabilities(context.env)
  });
}
