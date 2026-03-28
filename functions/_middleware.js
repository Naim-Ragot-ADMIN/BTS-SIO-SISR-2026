import { readAuthSummary } from "./api/auth/_auth.js";

const PRIVATE_PAGES = new Set([
  "/bts.html",
  "/preuves-e5.html",
  "/projets.html",
  "/scripts.html",
  "/pilotage.html",
  "/outils.html",
  "/atelier-devis.html",
  "/njr-solutions-informatique.html",
  "/njr-solutions-nettoyage.html",
  "/cv_naim.pdf",
  "/README.md",
  "/CLOUDFLARE_SETUP.md"
]);

const PRIVATE_PREFIXES = [
  "/automation-scripts/",
  "/02_SCRIPTS/",
  "/COURS/",
  "/VEILLE/"
];

function requiresPrivateAccess(pathname) {
  return PRIVATE_PAGES.has(pathname) || PRIVATE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (!requiresPrivateAccess(url.pathname)) {
    return context.next();
  }

  const summary = await readAuthSummary(context.env, context.request);
  if (summary.authenticated) {
    return context.next();
  }

  const redirectUrl = new URL("/connexion.html", url.origin);
  redirectUrl.searchParams.set("redirect", `${url.pathname}${url.search}`);
  if (summary.setupRequired) {
    redirectUrl.searchParams.set("setup", "1");
  }

  return Response.redirect(redirectUrl.toString(), 302);
}
