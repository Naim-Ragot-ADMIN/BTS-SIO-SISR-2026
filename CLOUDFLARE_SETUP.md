# Cloudflare Setup

Ce site peut maintenant utiliser Cloudflare Pages Functions pour traiter les demandes publiques, stocker les soumissions et proteger les formulaires.

## Fonctions disponibles

- `GET /api/health`
- `POST /api/contact`
- `POST /api/quote`
- `GET /api/admin/submissions` avec header `x-admin-key`
- `GET /api/auth/session`
- `POST /api/auth/setup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/credentials`

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
- ou laisser les routes auth creer automatiquement leurs tables au premier appel

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

Le site peut maintenant utiliser une authentification en ligne simple :

- la page `connexion.html` cree le premier compte si aucun acces prive n'existe encore
- le mot de passe est stocke cote serveur dans D1
- les sessions privees sont gerees par cookie serveur
- `functions/_middleware.js` redirige les pages BTS/scripts/outils vers `connexion.html` si la session n'est pas valide

Si tu veux aller encore plus loin ensuite :

- Cloudflare Access pour un vrai SSO / mail autorise
- D1 + R2 pour des pieces jointes et preuves plus lourdes

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
