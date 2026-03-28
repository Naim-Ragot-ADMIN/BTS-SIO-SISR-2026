# BTS-SIO-SISR-2026

Depot de travail BTS SIO option SISR.

## Contenu
- `01_LAB` : architecture, schemas, plan reseau
- `02_SCRIPTS` : scripts PowerShell / Bash
- `03_PROJETS` : situations professionnelles (E5)
- `04_DOCUMENTATION` : procedures et checklists
- `05_E5` : portfolio et tableau de synthese

Acces Git securise via cle SSH.

## Publication Cloudflare Pages

Le depot contient une version source complete du site, avec des pages privees BTS / admin qui ne doivent pas etre diffusees publiquement.

Pour publier uniquement la version publique :

1. Executer `node .\build-public.mjs`
2. Verifier le dossier `dist`
3. Connecter le depot a Cloudflare Pages
4. Utiliser ces parametres :
   - Build command : `node build-public.mjs`
   - Build output directory : `dist`

Le script `build-public.ps1` reste disponible pour construire la meme version publique localement sous Windows.

La version publique publiee inclut uniquement :
- accueil
- entreprise
- centre de devis
- demandes informatique et nettoyage
- contact
- veille
- assets publics

Les pages BTS, scripts, outils et ateliers prives restent hors du build public.

## Backend Cloudflare

Le projet contient aussi une V1 de backend via `functions/` pour :

- `GET /api/health`
- `POST /api/contact`
- `POST /api/quote`
- `GET /api/admin/submissions`

Une page privee `pilotage.html` sert de cockpit local/admin pour verifier :

- l'etat des Functions
- le stockage D1 ou KV
- la presence de Turnstile
- la lecture des demandes cote admin

Voir aussi :

- `CLOUDFLARE_SETUP.md`
- `cloudflare/d1-schema.sql`
