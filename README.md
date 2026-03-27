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

1. Executer `.\build-public.ps1`
2. Verifier le dossier `dist`
3. Connecter le depot a Cloudflare Pages
4. Utiliser ces parametres :
   - Build command : `powershell -ExecutionPolicy Bypass -File .\build-public.ps1`
   - Build output directory : `dist`

La version publique publiee inclut uniquement :
- accueil
- entreprise
- centre de devis
- demandes informatique et nettoyage
- contact
- veille
- assets publics

Les pages BTS, scripts, outils et ateliers prives restent hors du build public.
