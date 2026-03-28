# Cloudflare Setup

Ce site peut maintenant utiliser Cloudflare Pages Functions pour traiter les demandes publiques, stocker les soumissions et proteger les formulaires.

## Fonctions disponibles

- `GET /api/health`
- `POST /api/contact`
- `POST /api/quote`
- `GET /api/admin/submissions` avec header `x-admin-key`

## Cockpit prive

La page `pilotage.html` permet de verifier cote prive :

- si les Functions repondent
- si D1 ou KV est branche
- si Turnstile est actif
- si l'API admin peut lister les demandes

## Bindings recommandes

### D1

Binding conseille :

- nom : `DB`

Schema :

- appliquer `cloudflare/d1-schema.sql`

### KV optionnel

Binding optionnel si tu veux un fallback sans D1 :

- nom : `SUBMISSIONS_KV`

## Secrets recommandes

- `ADMIN_API_KEY`
- `TURNSTILE_SECRET_KEY`
- `TURNSTILE_SITE_KEY`
- `CONTACT_WEBHOOK_URL`
- `QUOTE_WEBHOOK_URL`

## Turnstile

Si `TURNSTILE_SECRET_KEY` et `TURNSTILE_SITE_KEY` sont definies :

- les formulaires publics peuvent afficher un widget anti-spam
- l'API validera le token cote serveur

## Webhooks

Tu peux brancher :

- un webhook `n8n`
- un webhook Discord
- un bridge mail

Les soumissions seront stockees dans D1 et peuvent aussi declencher une notification immediate.

## Acces prive

Pour proteger un futur espace BTS/admin en ligne, la meilleure option reste Cloudflare Access.

## Build public

Le build public doit inclure :

- `assets`
- `functions`
- `_headers`

Le site publie restera public pour :

- accueil
- entreprise
- centre de demandes
- demandes informatique / nettoyage
- contact
- veille

Les pages privees BTS/admin peuvent rester hors diffusion publique tant qu'un vrai controle d'acces n'est pas en place.

## SEO / indexation

Le build public embarque aussi :

- `robots.txt`
- `sitemap.xml`

Ce n'est pas instantane pour Google, mais cela aide a remplacer progressivement les anciens resultats WordPress par les nouvelles pages du site.
