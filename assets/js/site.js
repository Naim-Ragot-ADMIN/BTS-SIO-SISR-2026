const PORTFOLIO_DATA = {
  identity: {
    name: "Naim Ragot",
    title: "Technicien systemes, reseaux et support",
    location: "Villeneuve-sur-Lot",
    email: "ragotnaimpro@gmail.com",
    phone: "07 82 30 75 36"
  },
  company: {
    name: "NJR Solutions",
    mission: "Accompagner particuliers, independants et petites structures avec des services de proximite clairs, serieux et adaptes.",
    values: [
      "Parler simplement sans perdre la rigueur technique",
      "Intervenir proprement avec une vraie trace du travail realise",
      "Proposer des solutions utiles, adaptees et durables"
    ]
  },
  trustPoints: [
    { title: "Intervention locale", text: "Villeneuve-sur-Lot, Pujols et Bias sans frais de deplacement sur les demandes courantes." },
    { title: "Parcours simple", text: "Le site aide a cadrer une demande rapidement, sans jargon ni formulaire trop lourd." },
    { title: "Trace claire", text: "Compte-rendu, recapitulatif ou fiche d'intervention selon le besoin traite." }
  ],
  serviceLanes: [
    {
      title: "Depannage & installation",
      badge: "Informatique",
      text: "Pour PC lent, poste neuf, imprimante, remise en route ou intervention de proximite.",
      points: ["Particulier", "TPE", "Sur place ou a distance"],
      link: "demande-informatique.html",
      cta: "Demande informatique"
    },
    {
      title: "Wi-Fi, box & petit reseau",
      badge: "Informatique",
      text: "Pour connexion instable, imprimante reseau, partage simple et environnement maison ou bureau.",
      points: ["Wi-Fi", "Box", "Petit bureau"],
      link: "demande-informatique.html",
      cta: "Ouvrir le parcours info"
    },
    {
      title: "Maison, vitres & remise au propre",
      badge: "Nettoyage",
      text: "Pour entretien ponctuel, regulier, vitres, logement vide ou remise en etat legere.",
      points: ["Maison", "Vitres", "Ponctuel ou regulier"],
      link: "demande-nettoyage.html",
      cta: "Demande nettoyage"
    },
    {
      title: "Auto & exterieur",
      badge: "Nettoyage",
      text: "Pour voiture, utilitaire, terrasse, cour, balcon ou mobilier exterieur.",
      points: ["Auto", "Terrasse", "Vehicule pro"],
      link: "demande-nettoyage.html",
      cta: "Ouvrir le parcours nettoyage"
    }
  ],
  responseCommitments: [
    { title: "Demande rapide", text: "Nom, contact utile et prestations suffisent pour preparer une demande exploitable." },
    { title: "Lecture immediate", text: "Chaque page montre le bon univers, les services utiles et un montant de depart lisible." },
    { title: "Zone locale claire", text: "Villeneuve-sur-Lot, Pujols et Bias restent sans frais sur les demandes courantes." },
    { title: "Suivi propre", text: "Le message, le recapitulatif et la trace d'intervention restent simples a reutiliser." }
  ],
  requestPrep: [
    { title: "Coordonnees utiles", text: "Nom ou entreprise, puis email ou telephone pour permettre un retour rapide." },
    { title: "Prestations selectionnees", text: "Une ou plusieurs prestations suffisent a cadrer le besoin des le depart." },
    { title: "Contexte concret", text: "Quelques lignes sur le probleme, la surface, le materiel ou la situation font gagner du temps." },
    { title: "Zone ou urgence", text: "La ville, le secteur ou le niveau d'urgence aident a prioriser la bonne reponse." }
  ],
  juryHighlights: [
    { title: "Contexte compris", text: "Le jury doit comprendre rapidement le besoin initial, l'environnement et l'enjeu concret." },
    { title: "Choix justifies", text: "Les outils, commandes, tests et decisions doivent etre relies a un vrai raisonnement technique." },
    { title: "Preuves visibles", text: "Captures, scripts, schemas, supervision ou documentation rendent la situation beaucoup plus solide." },
    { title: "Analyse critique", text: "Expliquer les limites, risques et pistes d'amelioration donne une vraie posture professionnelle." }
  ],
  btsMilestones: [
    { title: "Cadrer", text: "Definir la situation, le besoin, le contexte et l'objectif avant toute explication technique." },
    { title: "Prouver", text: "Montrer des preuves concretes: commandes, scripts, captures, tests et documentation." },
    { title: "Expliquer", text: "Presenter les choix, les etapes et les verifications avec un vocabulaire simple mais rigoureux." },
    { title: "Conclure", text: "Terminer par le resultat, l'impact, les limites et ce qui serait ameliore a plus grande echelle." }
  ],
  btsDeliverables: [
    { title: "Fiche situation", text: "Une synthese exploitable en revision, en oral ou en annexe de presentation." },
    { title: "Trame orale", text: "Une base courte pour presenter une situation sans perdre le fil devant le jury." },
    { title: "Pack preuves", text: "Une checklist de pieces a montrer pour eviter les oublis de derniere minute." },
    { title: "Veille utile", text: "Des sujets recents et credibles a reinjecter dans tes exemples BTS." }
  ],
  projects: [
    { title: "Plan d'upgrade d'un pare-feu sature", angle: "bts entreprise reseau securite", type: "Reseau / securite", impact: "Audit, choix materiel, budget et continuite de service.", result: "Situation E5 forte et cas realiste de prestation d'infrastructure.", level: "Fort", link: "COURS/08-E5/README.md" },
    { title: "Masterisation et normalisation du parc", angle: "bts entreprise documentation", type: "Postes / deploiement", impact: "Procedure, nomenclature, preparation et documentation.", result: "Montre une logique reproductible et un vrai sens de l'organisation.", level: "Fort", link: "README.md" },
    { title: "Scripts PowerShell de demo BTS", angle: "bts documentation", type: "Automatisation", impact: "Scripts concrets pour montrer ton raisonnement technique.", result: "Tres utile a l'oral et pour illustrer ton niveau de pratique.", level: "Fort", link: "02_SCRIPTS/powershell/demo_exam_bts.ps1" },
    { title: "Bibliotheque scripts d'automatisation", angle: "bts entreprise reseau securite documentation", type: "Automatisation / infra", impact: "Scripts concrets pour AD, DHCP, IIS, Zabbix et Grafana inspires de documentations officielles.", result: "Tres utile comme support BTS, labo et base de production a adapter.", level: "Fort", link: "scripts.html" },
    { title: "Durcissement Windows Server", angle: "bts entreprise securite", type: "Hardening", impact: "Reduction de surface d'attaque et hygiene de configuration.", result: "Renforce ton profil systeme et securite.", level: "Moyen", link: "02_SCRIPTS/powershell/hardening_windows_server.ps1" },
    { title: "Audit securite et controles de base", angle: "bts entreprise securite documentation", type: "Audit", impact: "Analyse, controles, restitution et priorisation.", result: "Base solide pour des prestations, rapports ou situations pro.", level: "Fort", link: "02_SCRIPTS/powershell/audit_security.ps1" },
    { title: "Veille techno et cyber", angle: "bts documentation", type: "Veille", impact: "Suivi des alertes, synthese et capitalisation.", result: "Montre une progression serieuse et continue.", level: "Moyen", link: "VEILLE/2025/veille_2025-12-13.md" }
  ],
  resources: [
    { title: "CV PDF", type: "Presentation", desc: "Version prete a transmettre a un recruteur, jury ou client.", link: "cv_naim.pdf" },
    { title: "Extraction CV texte", type: "Preparation", desc: "Pratique pour alimenter des candidatures ou reformuler des blocs.", link: "cv_extract.txt", private: true },
    { title: "README portfolio", type: "Documentation", desc: "Vue d'ensemble du depot et de la logique du projet.", link: "README.md", private: true },
    { title: "Bibliotheque scripts automation", type: "Technique", desc: "Page dediee aux scripts d'automatisation infra avec telechargement et sources officielles.", link: "scripts.html", private: true },
    { title: "Dossier E4", type: "BTS", desc: "Base de revision et de structuration pour l'epreuve E4.", link: "COURS/07-E4/README.md", private: true },
    { title: "Dossier E5", type: "BTS", desc: "Point d'appui pour tes situations professionnelles et l'oral.", link: "COURS/08-E5/README.md", private: true },
    { title: "Cours reseaux SISR", type: "Technique", desc: "Rappels utiles DNS, DHCP, TCP/UDP et modele OSI.", link: "COURS/06-SISR/reseaux/README.md", private: true },
    { title: "Scripts PowerShell", type: "Technique", desc: "Bibliotheque d'automatisation systeme, securite et support.", link: "02_SCRIPTS/powershell/demo_exam_bts.ps1", private: true },
    { title: "Simulateur de devis NJR", type: "Entreprise", desc: "Module autonome pour composer une demande de devis et l'envoyer proprement.", link: "devis_njr.html" }
  ],
  services: [
    { title: "Support poste et installation", desc: "Diagnostic, optimisation, reinstallation, imprimantes et remise en service de postes fixes ou portables.", tags: ["Informatique", "Support", "Particuliers"] },
    { title: "Reseau local et Wi-Fi", desc: "Wi-Fi, box, imprimantes reseau, petit bureau, partage et connectivite du quotidien.", tags: ["Informatique", "Reseau", "TPE"] },
    { title: "Sauvegarde et securite simple", desc: "Transfert de donnees, hygiene numerique, sauvegarde cloud ou NAS de base et controle des acces.", tags: ["Informatique", "Securite", "Sauvegarde"] },
    { title: "Entretien maison et locaux", desc: "Entretien ponctuel ou regulier, vitres, remise en etat et nettoyage de logement ou petit bureau.", tags: ["Nettoyage", "Maison", "Locaux"] },
    { title: "Nettoyage auto", desc: "Nettoyage interieur, complet ou vehicule utilitaire avec formule simple et lisible.", tags: ["Nettoyage", "Auto", "Vehicule pro"] },
    { title: "Nettoyage exterieur", desc: "Terrasse, cour, balcon, abords et mobilier exterieur avec deplacement local adapte.", tags: ["Nettoyage", "Exterieur", "Proximite"] }
  ],
  timeline: [
    { role: "Technicien systemes et reseaux", meta: "Coaxis · Alternance · Juillet 2023 - Decembre 2024", text: "Firewalls, VPN, supervision Zabbix, maintenance postes, mise en rack et gestion des incidents." },
    { role: "Technicien alarme et video-surveillance", meta: "Verisure / Ariane Securite · Decembre 2024 - Mai 2025", text: "Installation, mise en service, relation client et organisation des interventions." },
    { role: "Technicien du territoire", meta: "La Regie · Mai 2025 - Septembre 2025", text: "Traçabilite, organisation des tournees, autonomie et rigueur terrain." }
  ],
  checklist: [
    ["cv-ready", "CV a jour", "Verifier experiences, competences et forme generale."],
    ["e5-situations", "Situations E5 structurees", "Objectif, actions, resultats et outils clairement definis."],
    ["scripts-clean", "Scripts presentables", "Selectionner les scripts les plus solides pour la demo."],
    ["veille-active", "Veille mise a jour", "Ajouter regulierement une note utile et credible."],
    ["portfolio-proof", "Portfolio pret a montrer", "Verifier le design, les liens et la coherence globale."],
    ["business-offer", "Offres NJR clarifiees", "Savoir presenter en 30 secondes ce que tu proposes."]
  ],
  watchTopics: [
    "Windows Server et Active Directory",
    "VPN, reseaux locaux, Wi-Fi et pare-feu",
    "Automatisation PowerShell",
    "Vulnerabilites critiques et hygiene cyber",
    "Support client et documentation"
  ],
  btsSkills: [
    { title: "Administration systeme", text: "Windows Server, hygiene de configuration, comptes, droits, scripts et maintenance." },
    { title: "Reseaux et services", text: "Adressement, DNS, DHCP, VPN, segmentation simple et logique d'infrastructure." },
    { title: "Securite et audit", text: "Controle de base, durcissement, priorisation des risques et restitution." },
    { title: "Documentation et oral", text: "Preuves, synthese, compte-rendu, argumentation et posture professionnelle." }
  ],
  oralBlocks: [
    { title: "Situation", text: "Explique le contexte, le besoin initial et ce qui etait en jeu." },
    { title: "Actions", text: "Detaille les etapes, outils, tests et decisions prises pendant le travail." },
    { title: "Resultats", text: "Montre l'impact concret, ce qui a ete corrige ou securise, et les limites." },
    { title: "Analyse", text: "Prepare ce que tu ferais mieux, autrement, ou a plus grande echelle." }
  ],
  serviceOffers: [
    { title: "Support poste et installation", text: "Diagnostic, optimisation, reinstallation, imprimantes et mise en service de materiel.", badge: "Informatique" },
    { title: "Reseau et connectivite", text: "Wi-Fi, box, imprimantes reseau, partages et petit environnement de travail.", badge: "Informatique" },
    { title: "Sauvegarde et hygiene numerique", text: "Protection des acces, transfert de donnees, sauvegarde simple et controle de base.", badge: "Informatique" },
    { title: "Entretien maison et locaux", text: "Entretien ponctuel ou regulier, vitres, remises au propre et logements.", badge: "Nettoyage" },
    { title: "Nettoyage auto", text: "Interieur, complet, utilitaire et vehicule professionnel avec formule lisible.", badge: "Nettoyage" },
    { title: "Terrasse et exterieur", text: "Terrasse, cour, balcon, mobilier exterieur et abords avec deplacement local adapte.", badge: "Nettoyage" }
  ],
  servicePacks: [
    {
      title: "Pack Essentiel Informatique",
      audience: "Particulier",
      priceNote: "A partir de 69 EUR",
      text: "Pour depannage poste, optimisation, imprimante ou remise en service rapide.",
      features: ["Diagnostic rapide", "Poste ou peripherique", "Demande simple"],
      link: "demande-informatique.html"
    },
    {
      title: "Pack Connectivite",
      audience: "Maison / bureau",
      priceNote: "A partir de 79 EUR",
      text: "Pour box, Wi-Fi, imprimante reseau, petit partage et connectivite du quotidien.",
      features: ["Wi-Fi", "Box", "Petit reseau"],
      link: "demande-informatique.html"
    },
    {
      title: "Pack Entretien Maison",
      audience: "Logement / location",
      priceNote: "A partir de 20 EUR",
      text: "Pour entretien regulier, vitres, remise au propre et petites remises en etat.",
      features: ["Maison", "Vitres", "Regularite"],
      link: "demande-nettoyage.html"
    },
    {
      title: "Pack Auto & Utilitaire",
      audience: "Particulier / pro",
      priceNote: "A partir de 39 EUR",
      text: "Pour nettoyage interieur, complet ou vehicule professionnel avec formule lisible.",
      features: ["Interieur", "Complet", "Vehicule pro"],
      link: "demande-nettoyage.html"
    }
  ],
  businessScenarios: [
    { title: "Poste lent ou instable", badge: "Informatique", text: "Diagnostic, optimisation, mises a jour, sauvegarde et remise en etat sur une demande simple a comprendre.", link: "demande-informatique.html" },
    { title: "Wi-Fi, imprimante ou petit reseau", badge: "Informatique", text: "Le site aide a qualifier le besoin reseau, le mode d'intervention et les infos utiles avant devis.", link: "demande-informatique.html" },
    { title: "Sauvegarde ou securite du quotidien", badge: "Informatique", text: "Le client peut cadrer un besoin de transfert, de sauvegarde ou d'hygiene numerique sans jargon.", link: "demande-informatique.html" },
    { title: "Entretien maison ou local", badge: "Nettoyage", text: "Le client peut choisir un besoin ponctuel ou regulier, puis preciser la zone et le contexte.", link: "demande-nettoyage.html" },
    { title: "Voiture, utilitaire ou exterieur", badge: "Nettoyage", text: "Les prestations auto et exterieures sont deja separees pour eviter les demandes floues.", link: "demande-nettoyage.html" }
  ],
  businessFaq: [
    { question: "Les montants affiches sur les simulateurs sont-ils definitifs ?", answer: "Non. Le site donne une estimation structurée pour cadrer le besoin. La validation finale reste faite par NJR Solutions selon le contexte reel, les contraintes et le perimetre exact." },
    { question: "Pourquoi separer informatique et nettoyage sur deux pages ?", answer: "Parce que les besoins, les prestations, les unites de prix et les informations utiles a collecter ne sont pas les memes. Cette separation rend la demande plus claire et plus professionnelle." },
    { question: "Que gagne le client avec ce systeme ?", answer: "Un parcours plus simple, moins d'aller-retour, une estimation plus lisible et une demande deja exploitable pour preparer un devis ou une intervention." },
    { question: "Le site sert-il aussi au BTS ?", answer: "Oui. Il sert a montrer une demarche de structuration, de documentation, d'automatisation et de presentation professionnelle sur un projet concret." }
  ],
  quoteSteps: [
    { title: "Choisir l'activite", text: "Le visiteur entre dans le bon univers des le depart: informatique ou nettoyage." },
    { title: "Construire l'estimation", text: "Il ajoute ses prestations, ajuste les quantites et voit le montant se mettre a jour." },
    { title: "Envoyer une demande propre", text: "Le panier et le recapitulatif preparent une demande beaucoup plus facile a traiter." }
  ],
  quoteFaq: [
    { question: "Comment savoir quel simulateur utiliser ?", answer: "Si le besoin concerne un PC, un reseau, du Wi-Fi, une sauvegarde, une installation ou un probleme logiciel, il faut passer par l'informatique. Si le besoin concerne la maison, les locaux, l'auto, la terrasse, la cour, les vitres ou la remise en etat, il faut passer par le nettoyage." },
    { question: "Pourquoi afficher un panier sur un site de services ?", answer: "Parce que cela rend les choix visibles, evitent les oublis et permet au client de comprendre le montant estime avant l'envoi de la demande." },
    { question: "Les frais de deplacement sont-ils pris en compte ?", answer: "Oui. Le simulateur nettoyage integre deja la logique de zone et de deplacement. Le simulateur informatique permet aussi d'ajuster ce point dans l'estimation." },
    { question: "Peut-on envoyer une demande meme sans tout remplir ?", answer: "Oui, mais plus la demande est precise, plus la reponse peut etre rapide et fiable. Le site aide justement a combler les informations manquantes." }
  ],
  interventionSteps: [
    ["need-qualified", "Besoin qualifie", "Probleme compris, contexte releve et urgence estimee."],
    ["backup-check", "Sauvegarde verifiee", "Verifier ce qui doit etre preserve avant intervention."],
    ["tests-run", "Tests et diagnostic", "Confirmer la cause probable et valider la piste de correction."],
    ["fix-applied", "Correction appliquee", "Action technique realisee et resultat controle."],
    ["client-report", "Compte-rendu client", "Expliquer ce qui a ete fait et les suites a prevoir."],
    ["invoice-ready", "Devis / facture / trace", "Laisser une trace exploitable pour le suivi et la facturation."]
  ],
  pitches: {
    jury: "Je suis Naim Ragot, etudiant en BTS SIO option SISR. Mon objectif est de presenter un profil oriente systemes, reseaux, securite et documentation a travers des situations concretes.",
    recruiter: "Je suis Naim Ragot, technicien systemes et reseaux en BTS SIO SISR. Je recherche des contextes ou je peux etre utile rapidement sur le support, l'infrastructure, l'automatisation et l'accompagnement utilisateur.",
    client: "Je suis Naim Ragot, fondateur de NJR Solutions. Je propose des services de proximite en informatique et en nettoyage avec une approche simple, serieuse et accessible."
  }
};

const STORAGE_KEYS = {
  checklist: "naim_portfolio_checklist_v4",
  note: "naim_portfolio_note_v4",
  leads: "naim_portfolio_leads_v4",
  watch: "naim_portfolio_watch_v4",
  intervention: "naim_portfolio_intervention_v1",
  brief: "naim_portfolio_brief_v1",
  contact: "naim_portfolio_contact_v1",
  oral: "naim_portfolio_oral_v1",
  feedCache: "naim_portfolio_feed_cache_v1",
  feedClips: "naim_portfolio_feed_clips_v1",
  juryPrep: "naim_portfolio_jury_prep_v1",
  evidencePrep: "naim_portfolio_evidence_prep_v1",
  authConfig: "naim_portfolio_auth_v1"
};

const SESSION_KEYS = {
  authSession: "naim_portfolio_auth_session_v1"
};

const PRIVATE_PAGES = new Set([
  "bts.html",
  "projets.html",
  "scripts.html",
  "outils.html",
  "atelier-devis.html",
  "njr-solutions-informatique.html",
  "njr-solutions-nettoyage.html"
]);

const DEFAULT_AUTH = {
  username: "admin",
  password: "admin"
};

const LIVE_FEEDS = [
  {
    id: "cisa",
    title: "CISA Advisories",
    short: "CISA",
    category: "Advisories",
    url: "https://www.cisa.gov/cybersecurity-advisories/all.xml",
    homepage: "https://www.cisa.gov/news-events/cybersecurity-advisories"
  },
  {
    id: "cert-fr",
    title: "CERT-FR",
    short: "CERT-FR",
    category: "Alertes",
    url: "https://www.cert.ssi.gouv.fr/feed/",
    homepage: "https://www.cert.ssi.gouv.fr/"
  },
  {
    id: "cert-eu-advisories",
    title: "CERT-EU Security Advisories",
    short: "CERT-EU",
    category: "Security Advisories",
    url: "https://cert.europa.eu/publications/security-advisories-rss",
    homepage: "https://cert.europa.eu/publications/security-advisories/"
  },
  {
    id: "cert-eu-intel",
    title: "CERT-EU Threat Intelligence",
    short: "CERT-EU",
    category: "Threat Intel",
    url: "https://cert.europa.eu/publications/threat-intelligence-rss",
    homepage: "https://cert.europa.eu/publications/threat-intelligence/"
  }
];

const BTS_JURY_QUESTIONS = [
  { category: "all", text: "Peux-tu presenter la situation en 1 minute, de facon simple et structurée ?" },
  { category: "all", text: "Quel etait le besoin initial et quel risque y avait-il si rien n'etait fait ?" },
  { category: "technique", text: "Pourquoi as-tu choisi cette solution technique plutot qu'une autre ?" },
  { category: "technique", text: "Quels outils ou commandes as-tu utilises pour diagnostiquer le probleme ?" },
  { category: "technique", text: "Quelles verifications as-tu faites avant et apres ton intervention ?" },
  { category: "analyse", text: "Quelles limites ou difficultes as-tu rencontre pendant cette situation ?" },
  { category: "analyse", text: "Si tu devais refaire cette situation aujourd'hui, qu'ameliorerais-tu ?" },
  { category: "analyse", text: "Quelle competence BTS cette situation illustre le mieux selon toi, et pourquoi ?" },
  { category: "oral", text: "Comment expliques-tu cette situation a un jury non expert sans perdre la rigueur technique ?" },
  { category: "oral", text: "Quel resultat concret peux-tu prouver a partir de captures, scripts ou tests ?" },
  { category: "oral", text: "Comment montres-tu que tu as compris la logique globale et pas seulement applique une procedure ?" }
];

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function isPublicOnlyMode() {
  return document.documentElement.dataset.accessMode === "public";
}

function safeJsonParse(value, fallback) {
  try { return JSON.parse(value) || fallback; } catch { return fallback; }
}

function readStore(key, fallback) { return safeJsonParse(localStorage.getItem(key), fallback); }
function writeStore(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    || "element";
}

function hashString(input) {
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;
  const text = String(input || "");
  for (let index = 0; index < text.length; index += 1) {
    const code = text.charCodeAt(index);
    h1 ^= code;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= code + index;
    h2 = Math.imul(h2, 0x85ebca6b);
  }
  return `${(h1 >>> 0).toString(16).padStart(8, "0")}${(h2 >>> 0).toString(16).padStart(8, "0")}`;
}

function hashCredentials(username, password) {
  return hashString(`${String(username || "").trim().toLowerCase()}::${password || ""}::njr-private-area`);
}

function getDefaultAuthConfig() {
  return {
    username: DEFAULT_AUTH.username,
    passwordHash: hashCredentials(DEFAULT_AUTH.username, DEFAULT_AUTH.password),
    updatedAt: new Date().toISOString()
  };
}

function readAuthConfigRecord() {
  const stored = readStore(STORAGE_KEYS.authConfig, null);
  return stored?.username && stored?.passwordHash ? stored : null;
}

function getAuthConfig() {
  return readAuthConfigRecord() || getDefaultAuthConfig();
}

function hasStoredAuthConfig() {
  return Boolean(readAuthConfigRecord());
}

function isDefaultAuthConfig(config = getAuthConfig()) {
  const defaults = getDefaultAuthConfig();
  return String(config?.username || "").trim().toLowerCase() === String(defaults.username || "").trim().toLowerCase()
    && String(config?.passwordHash || "") === String(defaults.passwordHash || "");
}

function getAuthSession() {
  return safeJsonParse(sessionStorage.getItem(SESSION_KEYS.authSession), null);
}

function isAuthenticated() {
  const session = getAuthSession();
  const config = getAuthConfig();
  return Boolean(session?.username && session?.token && session.username === config.username && session.token === config.passwordHash);
}

function loginPrivateArea(username, password) {
  const config = getAuthConfig();
  const valid = String(username || "").trim().toLowerCase() === String(config.username || "").trim().toLowerCase()
    && hashCredentials(username, password) === config.passwordHash;
  if (!valid) return false;
  sessionStorage.setItem(SESSION_KEYS.authSession, JSON.stringify({
    username: config.username,
    token: config.passwordHash,
    loggedAt: new Date().toISOString()
  }));
  return true;
}

function logoutPrivateArea() {
  sessionStorage.removeItem(SESSION_KEYS.authSession);
}

function updatePrivateCredentials(username, password) {
  const nextConfig = {
    username: String(username || "").trim() || DEFAULT_AUTH.username,
    passwordHash: hashCredentials(username, password),
    updatedAt: new Date().toISOString()
  };
  writeStore(STORAGE_KEYS.authConfig, nextConfig);
  sessionStorage.setItem(SESSION_KEYS.authSession, JSON.stringify({
    username: nextConfig.username,
    token: nextConfig.passwordHash,
    loggedAt: nextConfig.updatedAt
  }));
}

function resetPrivateCredentials() {
  const defaults = getDefaultAuthConfig();
  writeStore(STORAGE_KEYS.authConfig, defaults);
  sessionStorage.setItem(SESSION_KEYS.authSession, JSON.stringify({
    username: defaults.username,
    token: defaults.passwordHash,
    loggedAt: defaults.updatedAt
  }));
}

function isPrivatePage(pageName) {
  return PRIVATE_PAGES.has(pageName);
}

function canAccessPrivateContent() {
  return !isPublicOnlyMode() && isAuthenticated();
}

function filterPrivateItems(items = []) {
  return canAccessPrivateContent() ? items : items.filter((item) => !item.private);
}

function showToast(message, tone = "default") {
  let stack = $("#toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.id = "toast-stack";
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }

  const lastToast = stack.lastElementChild;
  if (lastToast?.dataset?.message === message && lastToast?.dataset?.tone === tone) return;

  const toast = document.createElement("div");
  toast.className = `toast${tone !== "default" ? ` toast--${tone}` : ""}`;
  toast.textContent = message;
  toast.dataset.message = message;
  toast.dataset.tone = tone;
  stack.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 220);
  }, 2600);
}

async function copyText(text, successMessage = "Copie effectuee.") {
  if (!text) {
    showToast("Rien a copier pour le moment.", "warning");
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage, "success");
    return true;
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "absolute";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();
    try {
      document.execCommand("copy");
      showToast(successMessage, "success");
      return true;
    } catch {
      showToast("Copie impossible pour le moment.", "warning");
      return false;
    } finally {
      helper.remove();
    }
  }
}

function downloadTextFile(filename, content, mime = "application/json") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}

function bindCopyButtons(scope = document) {
  $$("[data-copy-link]", scope).forEach((button) => {
    if (button.dataset.boundCopy === "true") return;
    button.dataset.boundCopy = "true";
    button.addEventListener("click", () => {
      copyText(button.dataset.copyLink, button.dataset.copyMessage || "Chemin copie.");
    });
  });
}

function initCopyValue(buttonId, targetId, successMessage) {
  const button = $("#" + buttonId);
  const target = $("#" + targetId);
  if (!button || !target) return;
  button.addEventListener("click", () => {
    copyText(target.textContent.trim(), successMessage);
  });
}

function feedById(id) {
  return LIVE_FEEDS.find((feed) => feed.id === id);
}

function escapeHtml(text) {
  return String(text || "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char]));
}

function cleanText(text = "") {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<body>${text}</body>`, "text/html");
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
}

function formatFeedDate(value) {
  if (!value) return "Date inconnue";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function summarizeFeedText(text, maxLength = 180) {
  const cleaned = cleanText(text);
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 1).trim()}…`;
}

function parseFeedXml(xmlText, feed) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "application/xml");
  if (doc.querySelector("parsererror")) {
    throw new Error("Flux XML invalide");
  }

  const nodes = Array.from(doc.querySelectorAll("item, entry"));
  return nodes.map((node, index) => {
    const title = node.querySelector("title")?.textContent?.trim() || `${feed.title} #${index + 1}`;
    const link = node.querySelector("link")?.textContent?.trim()
      || node.querySelector("link")?.getAttribute("href")
      || feed.homepage;
    const pubDate = node.querySelector("pubDate")?.textContent?.trim()
      || node.querySelector("updated")?.textContent?.trim()
      || node.querySelector("published")?.textContent?.trim()
      || "";
    const description = node.querySelector("description")?.textContent
      || node.querySelector("summary")?.textContent
      || node.querySelector("content")?.textContent
      || "";
    return {
      title,
      link,
      pubDate,
      description: summarizeFeedText(description),
      feedId: feed.id,
      feedTitle: feed.title,
      category: feed.category,
      sourceUrl: feed.url
    };
  });
}

function normalizeRss2JsonItems(payload, feed) {
  return (payload.items || []).map((item) => ({
    title: item.title || feed.title,
    link: item.link || feed.homepage,
    pubDate: item.pubDate || "",
    description: summarizeFeedText(item.description || item.content || ""),
    feedId: feed.id,
    feedTitle: payload.feed?.title || feed.title,
    category: feed.category,
    sourceUrl: feed.url
  }));
}

async function fetchFeedItems(feed) {
  const directXml = async () => {
    const response = await fetch(feed.url, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    return parseFeedXml(text, feed);
  };

  const viaRss2Json = async () => {
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
    const response = await fetch(proxyUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Proxy HTTP ${response.status}`);
    const payload = await response.json();
    if (payload.status !== "ok") throw new Error(payload.message || "Proxy indisponible");
    return normalizeRss2JsonItems(payload, feed);
  };

  const viaAllOrigins = async () => {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feed.url)}`;
    const response = await fetch(proxyUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`Proxy HTTP ${response.status}`);
    const text = await response.text();
    return parseFeedXml(text, feed);
  };

  const attempts = [directXml, viaRss2Json, viaAllOrigins];
  let lastError = null;
  for (const attempt of attempts) {
    try {
      const items = await attempt();
      if (items.length) return items;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Aucun element recupere");
}

async function refreshLiveFeeds(feedIds = LIVE_FEEDS.map((feed) => feed.id), force = false) {
  const cache = readStore(STORAGE_KEYS.feedCache, {});
  const ttl = 30 * 60 * 1000;
  const results = await Promise.all(feedIds.map(async (id) => {
    const feed = feedById(id);
    if (!feed) return null;
    const cached = cache[id];
    const now = Date.now();
    if (!force && cached?.fetchedAt && now - new Date(cached.fetchedAt).getTime() < ttl) {
      return { ...cached, fromCache: true };
    }
    try {
      const items = await fetchFeedItems(feed);
      const payload = {
        id: feed.id,
        title: feed.title,
        homepage: feed.homepage,
        category: feed.category,
        fetchedAt: new Date().toISOString(),
        items: items.slice(0, 8)
      };
      cache[id] = payload;
      writeStore(STORAGE_KEYS.feedCache, cache);
      return payload;
    } catch (error) {
      if (cached) return { ...cached, fromCache: true, stale: true };
      return {
        id: feed.id,
        title: feed.title,
        homepage: feed.homepage,
        category: feed.category,
        fetchedAt: "",
        items: [],
        error: error.message || "Erreur de chargement"
      };
    }
  }));
  return results.filter(Boolean);
}

function renderHeader(page) {
  const shell = $("#app-header");
  if (!shell) return;
  const quotePages = [
    "devis_njr.html",
    "demande-informatique.html",
    "demande-nettoyage.html",
    "atelier-devis.html",
    "njr-solutions-informatique.html",
    "njr-solutions-nettoyage.html"
  ];
  const authenticated = canAccessPrivateContent();
  const publicOnly = isPublicOnlyMode();
  const links = [
    ["index.html", "Accueil", false],
    ["bts.html", "BTS", true],
    ["projets.html", "Projets", true],
    ["scripts.html", "Scripts", true],
    ["entreprise.html", "Entreprise", false],
    ["devis_njr.html", "Devis", false],
    ["outils.html", "Outils", true],
    ["veille.html", "Veille", false],
    ["contact.html", "Contact", false]
  ].filter(([, , isPrivate]) => authenticated || !isPrivate);
  shell.innerHTML = `
    <header class="site-topbar">
      <div class="site-topbar__inner">
        <div class="brand">
          <div class="brand__mark">
            <img src="assets/img/logo-njr.png" alt="Logo NJR Solutions" class="brand__logo" />
          </div>
          <div class="brand__copy">
            <strong>${PORTFOLIO_DATA.identity.name} · BTS SIO SISR</strong>
            <span>${PORTFOLIO_DATA.identity.title} · ${PORTFOLIO_DATA.company.name}</span>
          </div>
        </div>
        <div class="topbar-actions">
          <button class="command-launch" type="button" id="open-command-palette">
            Recherche rapide
            <span>Ctrl+K</span>
          </button>
          ${publicOnly ? "" : `
            <button class="account-chip ${authenticated ? "is-authenticated" : ""}" type="button" id="open-auth-modal">
              ${authenticated ? "Prive" : "Connexion"}
              <span>${authenticated ? "Actif" : "Public"}</span>
            </button>
          `}
          <nav class="nav">
            ${links.map(([href, label]) => {
              const active = page === href || (href === "devis_njr.html" && quotePages.includes(page));
              return `<a href="${href}" class="${active ? "is-active" : ""}">${label}</a>`;
            }).join("")}
          </nav>
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  const shell = $("#app-footer");
  if (!shell) return;
  const authenticated = canAccessPrivateContent();
  const publicOnly = isPublicOnlyMode();
  shell.innerHTML = `
    <footer class="footer footer--rich">
      <div class="footer-grid">
        <article class="footer-card">
          <strong>${PORTFOLIO_DATA.identity.name}</strong>
          <span class="notice">${PORTFOLIO_DATA.identity.title}</span>
          <span class="notice">${PORTFOLIO_DATA.identity.location}</span>
          <span class="notice">${PORTFOLIO_DATA.identity.email}</span>
          <span class="notice">${PORTFOLIO_DATA.identity.phone}</span>
        </article>
        <article class="footer-card">
          <strong>BTS</strong>
          ${publicOnly ? `<span class="notice">Non publie sur la version publique</span>` : authenticated ? `<a href="bts.html">Espace BTS</a>` : `<span class="notice">Connexion requise</span>`}
          ${publicOnly ? `<span class="notice">Contenu reserve</span>` : authenticated ? `<a href="projets.html">Projets</a>` : `<span class="notice">Projets prives</span>`}
          ${publicOnly ? `<span class="notice">Scripts non diffuses</span>` : authenticated ? `<a href="scripts.html">Scripts</a>` : `<span class="notice">Scripts prives</span>`}
          <a href="veille.html">Veille</a>
        </article>
        <article class="footer-card">
          <strong>NJR Solutions</strong>
          <a href="entreprise.html">Espace entreprise</a>
          <a href="devis_njr.html">Simulateurs</a>
          ${publicOnly ? `<span class="notice">Outils internes hors ligne</span>` : authenticated ? `<a href="outils.html">Outils</a>` : `<span class="notice">Outils prives</span>`}
          <a href="contact.html">Contact</a>
        </article>
        <article class="footer-card">
          <strong>Informations</strong>
          <span class="notice">${PORTFOLIO_DATA.company.mission}</span>
          <a href="mentions-legales.html">Mentions legales</a>
          <a href="conditions-generales.html">Conditions generales</a>
          <a href="confidentialite.html">Confidentialite</a>
        </article>
      </div>
      <div class="footer-bottom">${PORTFOLIO_DATA.identity.name} · BTS SIO SISR · ${PORTFOLIO_DATA.company.name} · ${new Date().getFullYear()}</div>
    </footer>
  `;
}

function getQuickLinks() {
  return [
    { label: "Accueil", href: "index.html", type: "Page", keywords: "home portfolio presentation" },
    { label: "Espace BTS", href: "bts.html", type: "Page", keywords: "bts e4 e5 oral preuves", private: true },
    { label: "Projets", href: "projets.html", type: "Page", keywords: "projets situations techniques", private: true },
    { label: "Scripts", href: "scripts.html", type: "Page", keywords: "scripts automation powershell bash ad zabbix grafana", private: true },
    { label: "Entreprise", href: "entreprise.html", type: "Page", keywords: "entreprise services clients brief" },
    { label: "Devis", href: "devis_njr.html", type: "Page", keywords: "devis simulateur njr" },
    { label: "Outils", href: "outils.html", type: "Page", keywords: "notes suivi local leads", private: true },
    { label: "Atelier devis", href: "atelier-devis.html", type: "Page", keywords: "devis prive admin generateur", private: true },
    { label: "Veille", href: "veille.html", type: "Page", keywords: "veille rss cyber" },
    { label: "Contact", href: "contact.html", type: "Page", keywords: "contact email telephone" },
    { label: "Mentions legales", href: "mentions-legales.html", type: "Page", keywords: "legal mentions hebergement editeur" },
    { label: "Conditions generales", href: "conditions-generales.html", type: "Page", keywords: "conditions devis intervention tarifs" },
    { label: "Confidentialite", href: "confidentialite.html", type: "Page", keywords: "privacy donnees personnelles localstorage" },
    { label: "CV PDF", href: "cv_naim.pdf", type: "Fichier", keywords: "cv pdf recrutement" },
    { label: "Script AD Forest", href: "automation-scripts/deploy-ad-forest.ps1", type: "Script", keywords: "ad active directory forest powershell", private: true },
    { label: "Script Zabbix Grafana", href: "automation-scripts/deploy-zabbix-grafana.sh", type: "Script", keywords: "zabbix grafana docker bash monitoring", private: true }
  ].filter((item) => canAccessPrivateContent() || !item.private);
}

function renderCommandPalette() {
  if ($("#command-palette")) return;
  const shell = document.createElement("div");
  shell.id = "command-palette";
  shell.className = "command-palette";
  shell.innerHTML = `
    <div class="command-palette__backdrop" data-close-command></div>
    <div class="command-palette__dialog" role="dialog" aria-modal="true" aria-label="Recherche rapide">
      <div class="command-palette__head">
        <input id="command-palette-input" class="search" placeholder="Chercher une page, un fichier, un script..." />
        <button class="btn btn--secondary btn--small" type="button" data-close-command>Fermer</button>
      </div>
      <div class="quick-list" id="command-palette-results"></div>
    </div>
  `;
  document.body.appendChild(shell);
}

function renderAuthModal() {
  if (isPublicOnlyMode()) return;
  if ($("#auth-modal")) return;
  const shell = document.createElement("div");
  shell.id = "auth-modal";
  shell.className = "auth-modal";
  shell.innerHTML = `
    <div class="auth-modal__backdrop" data-close-auth></div>
    <div class="auth-modal__dialog" role="dialog" aria-modal="true" aria-label="Espace prive">
      <div class="auth-modal__head">
        <div>
          <strong>Espace prive</strong>
          <p class="notice">Mode public pour les clients, mode prive pour le BTS, les scripts et les outils internes.</p>
        </div>
        <button class="btn btn--secondary btn--small" type="button" data-close-auth>Fermer</button>
      </div>
      <div id="auth-modal-body"></div>
    </div>
  `;
  document.body.appendChild(shell);
}

function renderAuthModalBody() {
  const body = $("#auth-modal-body");
  if (!body) return;
  const authenticated = canAccessPrivateContent();
  const config = getAuthConfig();
  const hasStoredConfig = hasStoredAuthConfig();
  const usesDefaultCredentials = isDefaultAuthConfig(config);
  const publicStatusText = hasStoredConfig && !usesDefaultCredentials
    ? "Les identifiants locaux ont deja ete modifies sur ce navigateur. Utilise les identifiants actuels ou reinitialise l'acces local si besoin."
    : "Cet appareil utilise encore l'acces local par defaut. Une fois connecte, l'identifiant et le mot de passe peuvent etre modifies.";

  body.innerHTML = authenticated
    ? `
      <div class="auth-panel-grid">
        <article class="tool">
          <h3>Session active</h3>
          <p>Tu es connecte en mode prive avec l'identifiant <strong>${config.username}</strong>.</p>
          <div class="actions">
            <button class="btn btn--secondary" type="button" id="logout-private-area">Se deconnecter</button>
            <button class="btn btn--secondary" type="button" id="reset-private-area">Reinitialiser l'acces</button>
          </div>
          <p class="notice">Le mode prive debloque BTS, projets, scripts et outils.</p>
        </article>
        <article class="tool">
          <h3>Changer les identifiants</h3>
          <div style="display:grid;gap:12px;margin-top:14px">
            <label>Nouvel identifiant
              <input id="private-username" class="field" value="${config.username}" />
            </label>
            <label>Nouveau mot de passe
              <input id="private-password" class="field" type="password" placeholder="Nouveau mot de passe" />
            </label>
            <label>Confirmation
              <input id="private-password-confirm" class="field" type="password" placeholder="Confirmer le mot de passe" />
            </label>
            <button class="btn btn--primary" type="button" id="save-private-credentials">Enregistrer</button>
          </div>
          <p class="notice" id="auth-modal-status">Tu peux changer l'identifiant et le mot de passe a tout moment sur cet appareil.</p>
        </article>
      </div>
    `
    : `
      <div class="auth-panel-grid">
        <article class="tool">
          <h3>Connexion</h3>
          <div style="display:grid;gap:12px;margin-top:14px">
            <label>Identifiant
              <input id="login-username" class="field" autocomplete="username" placeholder="Identifiant" />
            </label>
            <label>Mot de passe
              <input id="login-password" class="field" type="password" autocomplete="current-password" placeholder="Mot de passe" />
            </label>
            <button class="btn btn--primary" type="button" id="login-private-area">Se connecter</button>
          </div>
          <p class="notice" id="auth-modal-status">${publicStatusText}</p>
        </article>
        <article class="tool">
          <h3>Acces public</h3>
          <p>Les clients peuvent continuer a consulter les pages entreprise, devis, veille et contact sans se connecter.</p>
          <div class="actions">
            <button class="btn btn--secondary" type="button" id="reset-public-credentials">Reinitialiser l'acces local</button>
          </div>
          <p class="notice">Cette protection reste locale au navigateur. La reinitialisation remet l'acces local par defaut sur cet appareil. Pour un vrai verrou serveur, il faudra un backend ou un hebergement avec authentification.</p>
        </article>
      </div>
    `;

  const status = $("#auth-modal-status");

  $("#login-private-area")?.addEventListener("click", () => {
    const username = $("#login-username")?.value.trim() || "";
    const password = $("#login-password")?.value || "";
    if (!loginPrivateArea(username, password)) {
      if (status) {
        status.textContent = hasStoredConfig && !usesDefaultCredentials
          ? "Connexion refusee : les identifiants locaux ont deja ete modifies sur ce navigateur. Utilise le mot de passe actuel ou reinitialise l'acces local."
          : "Connexion refusee : l'identifiant ou le mot de passe ne correspond pas.";
      }
      showToast("Connexion refusee.", "warning");
      return;
    }
    showToast("Mode prive active.", "success");
    refreshSiteChrome();
    renderAuthModalBody();
    window.setTimeout(() => window.location.reload(), 180);
  });

  $("#logout-private-area")?.addEventListener("click", () => {
    logoutPrivateArea();
    showToast("Mode public reactive.", "success");
    refreshSiteChrome();
    renderAuthModalBody();
    window.setTimeout(() => window.location.reload(), 180);
  });

  $("#save-private-credentials")?.addEventListener("click", () => {
    const username = $("#private-username")?.value.trim() || "";
    const password = $("#private-password")?.value || "";
    const confirm = $("#private-password-confirm")?.value || "";
    if (!username || !password) {
      if (status) status.textContent = "Renseigne un identifiant et un mot de passe.";
      showToast("Champs incomplets.", "warning");
      return;
    }
    if (password !== confirm) {
      if (status) status.textContent = "La confirmation ne correspond pas.";
      showToast("Confirmation invalide.", "warning");
      return;
    }
    updatePrivateCredentials(username, password);
    if (status) status.textContent = "Identifiants mis a jour sur cet appareil.";
    showToast("Identifiants mis a jour.", "success");
    refreshSiteChrome();
    renderAuthModalBody();
  });

  $("#reset-private-area")?.addEventListener("click", () => {
    resetPrivateCredentials();
    if (status) status.textContent = "Acces local reinitialise.";
    showToast("Acces reinitialise.", "success");
    refreshSiteChrome();
    renderAuthModalBody();
    window.setTimeout(() => window.location.reload(), 180);
  });

  $("#reset-public-credentials")?.addEventListener("click", () => {
    const defaults = getDefaultAuthConfig();
    writeStore(STORAGE_KEYS.authConfig, defaults);
    logoutPrivateArea();
    if (status) status.textContent = "Reinitialisation effectuee sur les identifiants locaux par defaut.";
    showToast("Acces local reinitialise.", "success");
    renderAuthModalBody();
    window.setTimeout(() => window.location.reload(), 180);
  });
}

function initAuthControls() {
  if (isPublicOnlyMode()) return;
  renderAuthModal();
  const modal = $("#auth-modal");
  if (!modal) return;

  const open = () => {
    renderAuthModalBody();
    modal.classList.add("is-open");
  };
  const close = () => {
    modal.classList.remove("is-open");
  };

  if (window.__authControlsReady) return;
  window.__authControlsReady = true;

  document.addEventListener("click", (event) => {
    if (event.target.closest("#open-auth-modal")) {
      open();
      return;
    }
    if (event.target.matches("[data-close-auth]")) {
      close();
    }
  });
}

function renderPrivateGate(pageName) {
  const main = $("main.site-shell.page");
  if (!main) return;
  const labels = {
    "bts.html": "Espace BTS",
    "projets.html": "Projets",
    "scripts.html": "Scripts",
    "outils.html": "Outils"
  };
  main.innerHTML = `
    <section class="section reveal is-visible">
      <div class="auth-gate">
        <div class="eyebrow">Acces prive</div>
        <h1>${labels[pageName] || "Espace prive"}</h1>
        <p>Cette partie du site est reservee a l'espace prive. Les visiteurs publics gardent acces aux pages entreprise, devis, veille et contact.</p>
        <div class="actions">
          <button class="btn btn--primary" type="button" id="open-auth-gate">Se connecter</button>
          <a class="btn btn--secondary" href="entreprise.html">Espace entreprise</a>
          <a class="btn btn--secondary" href="devis_njr.html">Devis</a>
          <a class="btn btn--secondary" href="contact.html">Contact</a>
        </div>
        <p class="notice">Utilise les identifiants locaux de cet appareil pour ouvrir cette partie privee.</p>
      </div>
    </section>
  `;
  $("#open-auth-gate")?.addEventListener("click", () => {
    $("#open-auth-modal")?.click();
  });
}

function refreshSiteChrome() {
  renderHeader(window.__currentPageName || "index.html");
  renderFooter();
  initAuthControls();
  initCommandPalette();
  applyAccessMode();
}

function applyAccessMode() {
  const authenticated = canAccessPrivateContent();
  $$("[data-private-only]").forEach((node) => {
    node.hidden = !authenticated;
  });
}

function initCommandPalette() {
  renderCommandPalette();
  const palette = $("#command-palette");
  const input = $("#command-palette-input");
  const results = $("#command-palette-results");
  if (!palette || !input || !results) return;

  const renderResults = (query = "") => {
    const cleanQuery = query.trim().toLowerCase();
    const items = getQuickLinks()
      .filter((item) => !cleanQuery || [item.label, item.type, item.keywords, item.href].join(" ").toLowerCase().includes(cleanQuery))
      .slice(0, 10);

    results.innerHTML = items.length
      ? items.map((item) => `
          <a class="quick-item" href="${item.href}">
            <span class="badge">${item.type}</span>
            <strong>${item.label}</strong>
            <span class="notice">${item.href}</span>
          </a>
        `).join("")
      : `<div class="quick-item"><strong>Aucun resultat</strong><span class="notice">Essaie un autre mot-cle ou une autre categorie.</span></div>`;
  };

  const openPalette = () => {
    palette.classList.add("is-open");
    renderResults(input.value);
    window.setTimeout(() => input.focus(), 30);
  };

  const closePalette = () => {
    palette.classList.remove("is-open");
  };

  if (window.__commandPaletteReady) {
    renderResults(input.value);
    return;
  }
  window.__commandPaletteReady = true;

  document.addEventListener("click", (event) => {
    if (event.target.closest("#open-command-palette")) {
      openPalette();
      return;
    }
    if (event.target.matches("[data-close-command]")) {
      closePalette();
    }
  });
  input.addEventListener("input", () => renderResults(input.value));
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openPalette();
      return;
    }
    if (event.key === "Escape" && palette.classList.contains("is-open")) {
      closePalette();
    }
  });

  renderResults("");
}

function initBackToTop() {
  if ($("#back-to-top")) return;
  const button = document.createElement("button");
  button.id = "back-to-top";
  button.className = "back-to-top";
  button.type = "button";
  button.textContent = "Haut";
  document.body.appendChild(button);

  const toggle = () => {
    button.classList.toggle("is-visible", window.scrollY > 420);
  };

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggle);
  toggle();
}

function applyReveal() {
  const items = $$(".reveal");
  const tick = () => {
    items.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight - 80) item.classList.add("is-visible");
    });
  };
  window.addEventListener("scroll", tick);
  tick();
}

function tagClass(index) {
  return ["a", "b", "c"][index % 3];
}

function renderProjectCards(containerId, filter = "all", search = "") {
  const container = $("#" + containerId);
  if (!container) return;
  const query = search.trim().toLowerCase();
  const items = PORTFOLIO_DATA.projects
    .filter((project) => filter === "all" || project.angle.includes(filter))
    .filter((project) => !query || [project.title, project.type, project.impact, project.result, project.angle, project.link].join(" ").toLowerCase().includes(query));
  container.innerHTML = items.length
    ? items.map((project) => `
      <article class="card">
        <div class="card__top">
          <div>
            <h3>${project.title}</h3>
            <p>${project.type}</p>
          </div>
          <span class="badge">${project.level}</span>
        </div>
        <p><strong>Valeur :</strong> ${project.impact}</p>
        <p>${project.result}</p>
        <div class="tags">${project.angle.split(" ").map((tag, i) => `<span class="tag tag--${tagClass(i)}">${tag}</span>`).join("")}</div>
        <div class="inline-actions">
          <a class="btn btn--secondary btn--small" href="${project.link}">Ouvrir la ressource</a>
          <button class="btn btn--secondary btn--small" type="button" data-copy-link="${project.link}" data-copy-message="Chemin du projet copie.">Copier le chemin</button>
        </div>
      </article>
    `).join("")
    : `<article class="card empty-state"><h3>Aucun projet ne correspond a cette recherche</h3><p>Essaie un autre mot-cle, un autre filtre ou reviens a la vue complete.</p></article>`;
  bindCopyButtons(container);
  return items.length;
}

function initProjectFilters(filterContainerId, cardsContainerId, searchInputId = "", countId = "") {
  const host = $("#" + filterContainerId);
  if (!host) return;
  host.__projectRender = () => {
    const active = $("button.is-active", host)?.dataset.filter || "all";
    const search = searchInputId ? ($("#" + searchInputId)?.value || "") : "";
    const total = renderProjectCards(cardsContainerId, active, search);
    const count = countId ? $("#" + countId) : null;
    if (count) count.textContent = `${total} projet${total > 1 ? "s" : ""} affiche${total > 1 ? "s" : ""}`;
  };
  $$("button", host).forEach((button) => {
    button.addEventListener("click", () => {
      $$("button", host).forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      host.__projectRender();
    });
  });
  host.__projectRender();
}

function initProjectSearch(inputId, cardsContainerId, filterContainerId = "", countId = "") {
  const input = $("#" + inputId);
  if (!input) return;
  const render = () => {
    const host = filterContainerId ? $("#" + filterContainerId) : null;
    if (host?.__projectRender) {
      host.__projectRender();
      return;
    }
    const total = renderProjectCards(cardsContainerId, "all", input.value);
    const count = countId ? $("#" + countId) : null;
    if (count) count.textContent = `${total} projet${total > 1 ? "s" : ""} affiche${total > 1 ? "s" : ""}`;
  };
  input.addEventListener("input", render);
  render();
}

function renderResourceLines(containerId, search = "") {
  const container = $("#" + containerId);
  if (!container) return;
  const query = search.trim().toLowerCase();
  const items = filterPrivateItems(PORTFOLIO_DATA.resources)
    .filter((resource) => !query || [resource.title, resource.type, resource.desc, resource.link].join(" ").toLowerCase().includes(query))
  container.innerHTML = items.length
    ? items.map((resource) => `
      <article class="resource-line">
        <strong>${resource.title}</strong>
        <span class="notice">${resource.type} · ${resource.desc}</span>
        <div class="inline-actions">
          <a class="btn btn--secondary btn--small" href="${resource.link}">Ouvrir</a>
          <button class="btn btn--secondary btn--small" type="button" data-copy-link="${resource.link}" data-copy-message="Chemin de ressource copie.">Copier le chemin</button>
        </div>
      </article>
    `).join("")
    : `<article class="resource-line"><strong>Aucune ressource trouvee</strong><span class="notice">Essaie un autre mot-cle ou une autre formulation.</span></article>`;
  bindCopyButtons(container);
}

function initResourceSearch(inputId, resultId) {
  const input = $("#" + inputId);
  if (!input) return;
  renderResourceLines(resultId, "");
  input.addEventListener("input", () => renderResourceLines(resultId, input.value));
}

function renderResourceHighlights(containerId, limit = 4) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = filterPrivateItems(PORTFOLIO_DATA.resources)
    .slice(0, limit)
    .map((resource) => `
      <article class="card">
        <div class="card__top">
          <div>
            <h3>${resource.title}</h3>
            <p>${resource.type}</p>
        </div>
        <span class="pill">${resource.type}</span>
      </div>
      <p>${resource.desc}</p>
      <div class="inline-actions">
        <a class="btn btn--secondary btn--small" href="${resource.link}">Ouvrir la ressource</a>
        <button class="btn btn--secondary btn--small" type="button" data-copy-link="${resource.link}" data-copy-message="Chemin de ressource copie.">Copier le chemin</button>
      </div>
    </article>
  `).join("");
  bindCopyButtons(container);
}

function renderServiceCards(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.services.map((service) => `
    <article class="card">
      <h3>${service.title}</h3>
      <p>${service.desc}</p>
      <div class="tags">${service.tags.map((tag, i) => `<span class="tag tag--${tagClass(i)}">${tag}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderBtsSkills(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.btsSkills.map((skill) => `
    <article class="card">
      <h3>${skill.title}</h3>
      <p>${skill.text}</p>
    </article>
  `).join("");
}

function renderJuryHighlights(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.juryHighlights.map((item, index) => `
    <article class="card card--compact">
      <span class="step-badge">${String(index + 1).padStart(2, "0")}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function renderBtsMilestones(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.btsMilestones.map((step, index) => `
    <article class="card card--compact">
      <span class="step-badge">${String(index + 1).padStart(2, "0")}</span>
      <h3>${step.title}</h3>
      <p>${step.text}</p>
    </article>
  `).join("");
}

function renderBtsDeliverables(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.btsDeliverables.map((item) => `
    <article class="card">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function renderOralBlocks(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.oralBlocks.map((block, index) => `
    <article class="card card--compact">
      <span class="step-badge">0${index + 1}</span>
      <h3>${block.title}</h3>
      <p>${block.text}</p>
    </article>
  `).join("");
}

function renderServiceOffers(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.serviceOffers.map((offer) => `
    <article class="card">
      <div class="card__top">
        <div>
          <h3>${offer.title}</h3>
          <p>${offer.text}</p>
        </div>
        <span class="pill">${offer.badge}</span>
      </div>
    </article>
  `).join("");
}

function renderServicePacks(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.servicePacks.map((pack, index) => `
    <article class="pack-card${index === 1 ? " pack-card--featured" : ""}">
      <div class="card__top">
        <div>
          <div class="label">${pack.audience}</div>
          <h3>${pack.title}</h3>
        </div>
        <span class="pill">${pack.priceNote}</span>
      </div>
      <p>${pack.text}</p>
      <div class="tags">
        ${pack.features.map((feature, featureIndex) => `<span class="tag tag--${tagClass(featureIndex)}">${feature}</span>`).join("")}
      </div>
      <div class="inline-actions">
        <a class="btn btn--secondary btn--small" href="${pack.link}">Ouvrir la demande adaptee</a>
      </div>
    </article>
  `).join("");
}

function renderServiceLanes(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.serviceLanes.map((lane) => `
    <article class="card lane-card">
      <div class="card__top">
        <div>
          <h3>${lane.title}</h3>
          <p>${lane.text}</p>
        </div>
        <span class="pill">${lane.badge}</span>
      </div>
      <div class="feature-list">
        ${lane.points.map((point, index) => `<span class="tag tag--${tagClass(index)}">${point}</span>`).join("")}
      </div>
      <div class="inline-actions">
        <a class="btn btn--secondary btn--small" href="${lane.link}">${lane.cta}</a>
      </div>
    </article>
  `).join("");
}

function renderResponseCommitments(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.responseCommitments.map((item, index) => `
    <article class="card card--compact">
      <span class="step-badge">${String(index + 1).padStart(2, "0")}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function renderRequestPrep(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.requestPrep.map((item) => `
    <article class="card card--compact">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function renderTrustPoints(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.trustPoints.map((item) => `
    <article class="card card--compact">
      <span class="step-badge">OK</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function renderScenarioCards(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.businessScenarios.map((scenario) => `
    <article class="card scenario-card">
      <span class="pill">${scenario.badge}</span>
      <h3>${scenario.title}</h3>
      <p>${scenario.text}</p>
      <div class="inline-actions">
        <a class="btn btn--secondary btn--small" href="${scenario.link}">Ouvrir la page adaptee</a>
      </div>
    </article>
  `).join("");
}

function renderFaq(containerId, items = PORTFOLIO_DATA.businessFaq) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = items.map((item, index) => `
    <details class="faq-item"${index === 0 ? " open" : ""}>
      <summary>${item.question}</summary>
      <p>${item.answer}</p>
    </details>
  `).join("");
}

function renderQuoteSteps(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.quoteSteps.map((step, index) => `
    <article class="card card--compact">
      <span class="step-badge">${String(index + 1).padStart(2, "0")}</span>
      <h3>${step.title}</h3>
      <p>${step.text}</p>
    </article>
  `).join("");
}

function renderTimeline(containerId) {
  const container = $("#" + containerId);
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.timeline.map((item) => `
    <article class="card">
      <h3>${item.role}</h3>
      <p><strong>${item.meta}</strong></p>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function renderChecklist(containerId, progressTextId, progressBarId, priorityId) {
  const container = $("#" + containerId);
  if (!container) return;
  const state = readStore(STORAGE_KEYS.checklist, {});
  container.innerHTML = PORTFOLIO_DATA.checklist.map(([id, title, desc]) => `
    <label class="check-item ${state[id] ? "is-done" : ""}">
      <input type="checkbox" data-id="${id}" ${state[id] ? "checked" : ""} />
      <div>
        <strong>${title}</strong>
        <div class="notice">${desc}</div>
      </div>
    </label>
  `).join("");

  $$("input[type='checkbox']", container).forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const next = readStore(STORAGE_KEYS.checklist, {});
      next[event.target.dataset.id] = event.target.checked;
      writeStore(STORAGE_KEYS.checklist, next);
      renderChecklist(containerId, progressTextId, progressBarId, priorityId);
    });
  });

  const completed = PORTFOLIO_DATA.checklist.filter(([id]) => state[id]).length;
  const total = PORTFOLIO_DATA.checklist.length;
  const progress = Math.round((completed / total) * 100);
  const progressText = $("#" + progressTextId);
  const progressBar = $("#" + progressBarId);
  const priority = $("#" + priorityId);
  if (progressText) progressText.textContent = `${progress}%`;
  if (progressBar) progressBar.style.width = `${progress}%`;
  if (priority) priority.textContent = progress < 40 ? "Structurer" : progress < 80 ? "Consolider" : "Finaliser";
}

function initChecklistReset(buttonId, renderArgs) {
  const button = $("#" + buttonId);
  if (!button) return;
  button.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEYS.checklist);
    renderChecklist(...renderArgs);
    showToast("Checklist BTS reinitialisee.", "success");
  });
}

function renderInterventionChecklist(containerId, progressTextId) {
  const container = $("#" + containerId);
  if (!container) return;
  const state = readStore(STORAGE_KEYS.intervention, {});
  container.innerHTML = PORTFOLIO_DATA.interventionSteps.map(([id, title, desc]) => `
    <label class="check-item ${state[id] ? "is-done" : ""}">
      <input type="checkbox" data-id="${id}" ${state[id] ? "checked" : ""} />
      <div>
        <strong>${title}</strong>
        <div class="notice">${desc}</div>
      </div>
    </label>
  `).join("");

  $$("input[type='checkbox']", container).forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const next = readStore(STORAGE_KEYS.intervention, {});
      next[event.target.dataset.id] = event.target.checked;
      writeStore(STORAGE_KEYS.intervention, next);
      renderInterventionChecklist(containerId, progressTextId);
    });
  });

  const done = PORTFOLIO_DATA.interventionSteps.filter(([id]) => state[id]).length;
  const total = PORTFOLIO_DATA.interventionSteps.length;
  const progress = $("#" + progressTextId);
  if (progress) progress.textContent = `${done}/${total} etapes`;
}

function initInterventionReset(buttonId, containerId, progressTextId) {
  const button = $("#" + buttonId);
  if (!button) return;
  button.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEYS.intervention);
    renderInterventionChecklist(containerId, progressTextId);
    showToast("Checklist d'intervention reinitialisee.", "success");
  });
}

function initNoteTool(textareaId, statusId, copyButtonId, clearButtonId) {
  const textarea = $("#" + textareaId);
  const status = $("#" + statusId);
  if (!textarea) return;
  textarea.value = localStorage.getItem(STORAGE_KEYS.note) || "";
  textarea.addEventListener("input", () => {
    localStorage.setItem(STORAGE_KEYS.note, textarea.value);
    if (status) status.textContent = "Note sauvegardee localement.";
  });
  $("#" + copyButtonId)?.addEventListener("click", async () => {
    const copied = await copyText(textarea.value, "Note copiee.");
    if (status) status.textContent = copied ? "Note copiee." : "Copie impossible pour le moment.";
  });
  $("#" + clearButtonId)?.addEventListener("click", () => {
    textarea.value = "";
    localStorage.removeItem(STORAGE_KEYS.note);
    if (status) status.textContent = "Note effacee.";
    showToast("Note locale effacee.", "success");
  });
}

function initBriefTool() {
  const output = $("#brief-output");
  if (!output) return;
  const status = $("#brief-status");
  const fields = ["brief-client", "brief-need", "brief-priority", "brief-deadline", "brief-context"];
  const saved = readStore(STORAGE_KEYS.brief, null);
  if (saved) {
    if ($("#brief-client")) $("#brief-client").value = saved.client || "";
    if ($("#brief-need")) $("#brief-need").value = saved.need || "";
    if ($("#brief-priority")) $("#brief-priority").value = saved.priority || "Normale";
    if ($("#brief-deadline")) $("#brief-deadline").value = saved.deadline || "";
    if ($("#brief-context")) $("#brief-context").value = saved.context || "";
  }

  const collect = () => ({
    client: $("#brief-client")?.value.trim() || "",
    need: $("#brief-need")?.value.trim() || "",
    priority: $("#brief-priority")?.value || "Normale",
    deadline: $("#brief-deadline")?.value.trim() || "",
    context: $("#brief-context")?.value.trim() || ""
  });

  const build = (persist = true) => {
    const data = collect();
    const client = data.client || "Client a preciser";
    const need = data.need || "Besoin a preciser";
    const priority = data.priority || "Normale";
    const deadline = data.deadline || "Delai non renseigne";
    const context = data.context || "Contexte non precise.";
    output.textContent = [
      `Client : ${client}`,
      `Besoin : ${need}`,
      `Priorite : ${priority}`,
      `Delai souhaite : ${deadline}`,
      "",
      "Contexte :",
      context,
      "",
      "Actions proposees :",
      "- Diagnostic initial et validation du perimetre",
      "- Identification des risques et contraintes",
      "- Proposition d'action ou de devis si necessaire",
      "- Documentation et suivi de l'intervention"
    ].join("\n");
    if (persist) {
      writeStore(STORAGE_KEYS.brief, data);
      if (status) status.textContent = "Brief sauvegarde localement.";
    }
    return data;
  };

  fields.forEach((id) => {
    $("#" + id)?.addEventListener("input", () => build());
    $("#" + id)?.addEventListener("change", () => build());
  });

  $("#generate-brief")?.addEventListener("click", () => {
    build();
    showToast("Brief client mis a jour.", "success");
  });
  $("#copy-brief")?.addEventListener("click", async () => {
    await copyText(output.textContent, "Brief copie.");
  });
  $("#save-brief")?.addEventListener("click", () => {
    writeStore(STORAGE_KEYS.brief, collect());
    if (status) status.textContent = "Brief sauvegarde localement.";
    showToast("Brief sauvegarde.", "success");
  });
  $("#send-brief-mail")?.addEventListener("click", () => {
    const data = build();
    const subject = `Brief client ${data.client || "NJR Solutions"}`.trim();
    window.location.href = `mailto:${PORTFOLIO_DATA.identity.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(output.textContent)}`;
  });
  build(Boolean(saved));
}

function initBtsOralTool() {
  const output = $("#oral-builder-output");
  if (!output) return;
  const status = $("#oral-builder-status");
  const fields = ["oral-context", "oral-actions", "oral-results", "oral-skills"];
  const saved = readStore(STORAGE_KEYS.oral, null);
  if (saved) {
    if ($("#oral-context")) $("#oral-context").value = saved.context || "";
    if ($("#oral-actions")) $("#oral-actions").value = saved.actions || "";
    if ($("#oral-results")) $("#oral-results").value = saved.results || "";
    if ($("#oral-skills")) $("#oral-skills").value = saved.skills || "";
  }

  const collect = () => ({
    context: $("#oral-context")?.value.trim() || "",
    actions: $("#oral-actions")?.value.trim() || "",
    results: $("#oral-results")?.value.trim() || "",
    skills: $("#oral-skills")?.value.trim() || ""
  });

  const render = (persist = true) => {
    const data = collect();
    output.textContent = [
      "Presentation rapide E5",
      "",
      `Situation : ${data.context || "Contexte a preciser."}`,
      `Actions : ${data.actions || "Actions a preciser."}`,
      `Resultats : ${data.results || "Resultats a preciser."}`,
      `Competences mobilisees : ${data.skills || "Competences a preciser."}`,
      "",
      "Conseil oral : commence par l'objectif, explique ton raisonnement, puis termine par l'impact concret et ce que tu referais mieux."
    ].join("\n");

    if (persist) {
      writeStore(STORAGE_KEYS.oral, data);
      if (status) status.textContent = "Synthese BTS sauvegardee localement.";
    }
  };

  fields.forEach((id) => {
    $("#" + id)?.addEventListener("input", () => render());
    $("#" + id)?.addEventListener("change", () => render());
  });

  $("#copy-oral-builder")?.addEventListener("click", async () => {
    await copyText(output.textContent, "Synthese orale copiee.");
  });

  $("#clear-oral-builder")?.addEventListener("click", () => {
    fields.forEach((id) => {
      const field = $("#" + id);
      if (field) field.value = "";
    });
    localStorage.removeItem(STORAGE_KEYS.oral);
    render(false);
    if (status) status.textContent = "Synthese BTS reinitialisee.";
    showToast("Synthese BTS reinitialisee.", "success");
  });

  render(Boolean(saved));
}

function initBtsJuryTool() {
  const output = $("#jury-question-output");
  if (!output) return;
  const category = $("#jury-question-category");
  const notes = $("#jury-answer-note");
  const status = $("#jury-question-status");
  const saved = readStore(STORAGE_KEYS.juryPrep, {});
  let currentIndex = Number(saved.currentIndex || 0);

  if (notes) notes.value = saved.note || "";
  if (category && saved.category) category.value = saved.category;

  const pool = () => BTS_JURY_QUESTIONS.filter((item) => !category || category.value === "all" || item.category === category.value || item.category === "all");

  const persist = () => {
    writeStore(STORAGE_KEYS.juryPrep, {
      category: category?.value || "all",
      currentIndex,
      note: notes?.value || ""
    });
  };

  const render = () => {
    const items = pool();
    if (!items.length) {
      output.textContent = "Aucune question disponible pour cette categorie.";
      return;
    }
    currentIndex = ((currentIndex % items.length) + items.length) % items.length;
    output.textContent = items[currentIndex].text;
    if (status) status.textContent = `Question ${currentIndex + 1} sur ${items.length}`;
    persist();
  };

  $("#next-jury-question")?.addEventListener("click", () => {
    currentIndex += 1;
    render();
  });

  $("#random-jury-question")?.addEventListener("click", () => {
    const items = pool();
    if (!items.length) return;
    currentIndex = Math.floor(Math.random() * items.length);
    render();
  });

  $("#copy-jury-question")?.addEventListener("click", async () => {
    await copyText(output.textContent, "Question de jury copiee.");
  });

  category?.addEventListener("change", () => {
    currentIndex = 0;
    render();
  });

  notes?.addEventListener("input", () => persist());
  render();
}

function initBtsTimerTool() {
  const display = $("#oral-timer-display");
  if (!display) return;
  const duration = $("#oral-timer-duration");
  const status = $("#oral-timer-status");
  let timerId = null;
  let remainingSeconds = Number(duration?.value || 300);

  const render = () => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const stop = () => {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  };

  const reset = () => {
    stop();
    remainingSeconds = Number(duration?.value || 300);
    render();
    if (status) status.textContent = "Minuteur pret.";
  };

  $("#start-oral-timer")?.addEventListener("click", () => {
    if (timerId) return;
    if (status) status.textContent = "Entrainement en cours...";
    timerId = window.setInterval(() => {
      remainingSeconds -= 1;
      render();
      if (remainingSeconds <= 0) {
        stop();
        remainingSeconds = 0;
        render();
        if (status) status.textContent = "Temps ecoule. Fais une reprise critique de ta presentation.";
        showToast("Temps oral termine.", "success");
      }
    }, 1000);
  });

  $("#pause-oral-timer")?.addEventListener("click", () => {
    stop();
    if (status) status.textContent = "Minuteur en pause.";
  });

  $("#reset-oral-timer")?.addEventListener("click", reset);
  duration?.addEventListener("change", reset);
  reset();
}

function initSituationCardBuilder() {
  const output = $("#situation-card-output");
  if (!output) return;
  const status = $("#situation-card-status");
  const score = $("#situation-card-score");
  const fill = $("#situation-card-fill");
  const list = $("#situation-card-list");
  const storageKey = "naim_portfolio_situation_card_v1";
  const fields = {
    title: $("#situation-card-title"),
    context: $("#situation-card-context"),
    actions: $("#situation-card-actions"),
    result: $("#situation-card-result"),
    proof: $("#situation-card-proof"),
    skills: $("#situation-card-skills")
  };

  const saved = readStore(storageKey, null);
  if (saved) {
    Object.entries(fields).forEach(([key, field]) => {
      if (field) field.value = saved[key] || "";
    });
  }

  const collect = () => Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, field?.value.trim() || ""]));

  const updateQuality = (data) => {
    const checks = [
      { title: "Situation nommee", ok: data.title.length >= 4, note: "Titre de situation" },
      { title: "Contexte clair", ok: data.context.length >= 20, note: "Besoin et environnement" },
      { title: "Actions detaillees", ok: data.actions.length >= 25, note: "Etapes et outils" },
      { title: "Resultat concret", ok: data.result.length >= 15, note: "Impact ou correction" },
      { title: "Preuves citees", ok: data.proof.length >= 10, note: "Captures, scripts ou docs" },
      { title: "Competences reliees", ok: data.skills.length >= 8, note: "Competences BTS" }
    ];
    const done = checks.filter((item) => item.ok).length;
    const percent = Math.round((done / checks.length) * 100);
    if (score) score.textContent = `${percent}%`;
    if (fill) fill.style.width = `${percent}%`;
    if (list) {
      list.innerHTML = checks.map((item) => `
        <div class="quality-item ${item.ok ? "is-done" : ""}">
          <strong>${item.title}</strong>
          <span>${item.ok ? "OK" : item.note}</span>
        </div>
      `).join("");
    }
    if (status) {
      status.textContent = percent >= 100
        ? "Fiche situation prete pour revision, oral ou export."
        : percent >= 80
          ? "La fiche est tres solide. Un dernier detail peut encore la renforcer."
          : percent >= 60
            ? "La base est bonne. Il manque encore quelques elements convaincants pour le jury."
            : "Complete la situation pour obtenir une fiche exploitable devant le jury.";
    }
  };

  const render = (persist = true) => {
    const data = collect();
    output.textContent = [
      "Fiche situation jury",
      "",
      `Situation : ${data.title || "Titre a preciser"}`,
      `Contexte : ${data.context || "Contexte a preciser"}`,
      "",
      "Actions et choix techniques :",
      data.actions || "Actions a preciser",
      "",
      "Resultat obtenu :",
      data.result || "Resultat a preciser",
      "",
      "Preuves a montrer :",
      data.proof || "Preuves a preciser",
      "",
      "Competences mobilisees :",
      data.skills || "Competences a preciser",
      "",
      "Conseil oral : commencer par le besoin, justifier les choix, montrer la preuve la plus forte, puis conclure par l'impact et l'analyse critique."
    ].join("\n");
    if (persist) {
      writeStore(storageKey, data);
    }
    updateQuality(data);
  };

  Object.values(fields).forEach((field) => {
    field?.addEventListener("input", () => render());
    field?.addEventListener("change", () => render());
  });

  $("#copy-situation-card")?.addEventListener("click", async () => {
    await copyText(output.textContent, "Fiche situation copiee.");
  });

  $("#download-situation-card")?.addEventListener("click", () => {
    const title = collect().title || "situation-bts";
    downloadTextFile(`fiche-situation-${slugify(title)}.txt`, output.textContent, "text/plain;charset=utf-8");
    showToast("Fiche situation telechargee.", "success");
  });

  $("#clear-situation-card")?.addEventListener("click", () => {
    Object.values(fields).forEach((field) => {
      if (field) field.value = "";
    });
    localStorage.removeItem(storageKey);
    render(false);
    showToast("Fiche situation reinitialisee.", "success");
  });

  render(Boolean(saved));
}

function initEvidencePlanner() {
  const output = $("#evidence-pack-output");
  if (!output) return;
  const title = $("#evidence-title");
  const context = $("#evidence-context");
  const status = $("#evidence-pack-status");
  const saved = readStore(STORAGE_KEYS.evidencePrep, {});

  if (title) title.value = saved.title || "";
  if (context) context.value = saved.context || "";
  if (saved.items) {
    Object.entries(saved.items).forEach(([id, value]) => {
      const checkbox = $(`#${id}`);
      if (checkbox) checkbox.checked = Boolean(value);
    });
  }

  const collect = () => {
    const items = {};
    $$("[data-evidence-item]").forEach((checkbox) => {
      items[checkbox.id] = checkbox.checked;
    });
    return {
      title: title?.value.trim() || "",
      context: context?.value.trim() || "",
      items
    };
  };

  const render = () => {
    const data = collect();
    const selected = Object.entries(data.items)
      .filter(([, checked]) => checked)
      .map(([id]) => {
        const label = document.querySelector(`label[for="${id}"] strong`);
        return label ? label.textContent : id;
      });

    output.textContent = [
      `Situation : ${data.title || "Situation a preciser"}`,
      data.context ? `Contexte : ${data.context}` : "Contexte : a preciser",
      "",
      "Preuves a preparer :",
      ...(selected.length ? selected.map((item, index) => `${index + 1}. ${item}`) : ["Aucune preuve selectionnee pour le moment."]),
      "",
      "Conseil : prepare au moins une preuve technique, une preuve de resultat et une preuve de demarche."
    ].join("\n");

    writeStore(STORAGE_KEYS.evidencePrep, data);
    if (status) status.textContent = `${selected.length} preuve${selected.length > 1 ? "s" : ""} selectionnee${selected.length > 1 ? "s" : ""}.`;
  };

  title?.addEventListener("input", render);
  context?.addEventListener("input", render);
  $$("[data-evidence-item]").forEach((checkbox) => {
    checkbox.addEventListener("change", render);
  });

  $("#copy-evidence-pack")?.addEventListener("click", async () => {
    await copyText(output.textContent, "Pack de preuves copie.");
  });

  $("#reset-evidence-pack")?.addEventListener("click", () => {
    if (title) title.value = "";
    if (context) context.value = "";
    $$("[data-evidence-item]").forEach((checkbox) => {
      checkbox.checked = false;
    });
    localStorage.removeItem(STORAGE_KEYS.evidencePrep);
    render();
    showToast("Pack de preuves reinitialise.", "success");
  });

  render();
}

async function initLiveFeedBoard({
  containerId,
  statusId = "",
  metaId = "",
  refreshButtonId = "",
  feedIds = LIVE_FEEDS.map((feed) => feed.id),
  limit = 3,
  compact = false,
  autoRefreshMs = 20 * 60 * 1000
}) {
  const container = $("#" + containerId);
  if (!container) return;
  const status = statusId ? $("#" + statusId) : null;
  const meta = metaId ? $("#" + metaId) : null;
  const refreshButton = refreshButtonId ? $("#" + refreshButtonId) : null;

  const renderBoard = async (force = false) => {
    if (status) status.textContent = force ? "Actualisation en cours..." : "Chargement des flux officiels...";
    const feeds = await refreshLiveFeeds(feedIds, force);
    const merged = feeds.flatMap((feed) => (feed.items || []).slice(0, limit).map((item) => ({ ...item, fetchedAt: feed.fetchedAt, homepage: feed.homepage, stale: feed.stale })));
    merged.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));
    const visibleItems = merged.slice(0, limit * Math.max(1, Math.min(feedIds.length, compact ? 2 : feedIds.length)));

    container.innerHTML = visibleItems.length
      ? visibleItems.map((item) => `
          <article class="feed-item${compact ? " feed-item--compact" : ""}">
            <div class="feed-item__top">
              <span class="pill">${escapeHtml(item.feedTitle || item.category || "Flux")}</span>
              <span class="notice">${escapeHtml(formatFeedDate(item.pubDate))}</span>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description || "Aucun resume disponible.")}</p>
            <div class="inline-actions">
              <a class="btn btn--secondary btn--small" href="${item.link}" target="_blank" rel="noopener">Lire l'article</a>
              <button class="btn btn--secondary btn--small" type="button" data-copy-link="${item.link}" data-copy-message="Lien du flux copie.">Copier le lien</button>
            </div>
          </article>
        `).join("")
      : `<article class="feed-item empty-state"><h3>Flux indisponibles</h3><p>Le tableau n'a pas reussi a charger les flux pour le moment. Un nouveau chargement est tente automatiquement.</p></article>`;

    bindCopyButtons(container);

    const lastDates = feeds.map((feed) => feed.fetchedAt).filter(Boolean).sort().reverse();
    if (meta) meta.textContent = lastDates.length ? `Derniere mise a jour locale: ${formatFeedDate(lastDates[0])}` : "Aucune mise a jour disponible.";
    if (status) {
      const staleCount = feeds.filter((feed) => feed.stale).length;
      status.textContent = staleCount ? `Affichage partiel depuis le cache local (${staleCount} flux en attente de reponse).` : "Flux officiels charges automatiquement.";
    }
  };

  refreshButton?.addEventListener("click", () => renderBoard(true));
  await renderBoard(false);
  if (autoRefreshMs > 0) {
    window.setInterval(() => renderBoard(true), autoRefreshMs);
  }
}

function buildTopicTokens(topic) {
  return String(topic || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((token) => token.length >= 4);
}

function matchFeedTopics(item, topics = []) {
  const haystack = [
    item.title,
    item.description,
    item.feedTitle,
    item.category
  ].filter(Boolean).join(" ").toLowerCase();

  return topics.filter((topic) => buildTopicTokens(topic).some((token) => haystack.includes(token))).slice(0, 3);
}

function buildFeedSummary(items = []) {
  if (!items.length) {
    return "Aucun article de veille selectionne pour le moment.";
  }

  return [
    "Synthese veille NJR Solutions / BTS",
    "",
    ...items.map((item, index) => [
      `${index + 1}. ${item.title || "Article sans titre"}`,
      `${item.feedTitle || item.category || "Flux"} · ${formatFeedDate(item.pubDate)}`,
      item.link || "",
      item.description || "Aucun resume disponible."
    ].filter(Boolean).join("\n"))
  ].join("\n\n");
}

function renderFeedClips(containerId, statusId = "") {
  const host = $("#" + containerId);
  if (!host) return;
  const status = statusId ? $("#" + statusId) : null;
  const items = readStore(STORAGE_KEYS.feedClips, []);

  if (!items.length) {
    host.innerHTML = `<article class="feed-item empty-state"><h3>Aucun article sauvegarde</h3><p>Enregistre les alertes ou articles utiles depuis le tableau RSS pour te construire une base locale exploitable au BTS.</p></article>`;
    if (status) status.textContent = "Bibliotheque locale vide.";
    return;
  }

  host.innerHTML = items.map((item, index) => `
    <article class="feed-item">
      <div class="feed-item__top">
        <span class="pill">${escapeHtml(item.feedTitle || item.category || "Flux")}</span>
        <span class="notice">${escapeHtml(formatFeedDate(item.savedAt || item.pubDate))}</span>
      </div>
      <h3>${escapeHtml(item.title || "Article sans titre")}</h3>
      <p>${escapeHtml(item.description || "Aucun resume disponible.")}</p>
      <div class="inline-actions">
        <a class="btn btn--secondary btn--small" href="${item.link}" target="_blank" rel="noopener">Lire l'article</a>
        <button class="btn btn--secondary btn--small" type="button" data-copy-link="${item.link}" data-copy-message="Lien de veille copie.">Copier le lien</button>
        <button class="btn btn--secondary btn--small" type="button" data-feed-clip-delete="${index}">Retirer</button>
      </div>
    </article>
  `).join("");

  bindCopyButtons(host);
  $$("[data-feed-clip-delete]", host).forEach((button) => {
    button.addEventListener("click", () => {
      const clips = readStore(STORAGE_KEYS.feedClips, []);
      clips.splice(Number(button.dataset.feedClipDelete), 1);
      writeStore(STORAGE_KEYS.feedClips, clips);
      renderFeedClips(containerId, statusId);
      showToast("Article retire de la bibliotheque locale.", "success");
    });
  });

  if (status) status.textContent = `${items.length} article(s) sauvegarde(s) localement.`;
}

async function initVeilleWorkbench({
  containerId,
  statusId = "",
  metaId = "",
  refreshButtonId = "",
  searchId = "",
  sourceId = "",
  summaryButtonId = "",
  savedContainerId = "",
  savedStatusId = "",
  clearSavedButtonId = "",
  resetFiltersButtonId = "",
  feedIds = LIVE_FEEDS.map((feed) => feed.id),
  limit = 6,
  autoRefreshMs = 20 * 60 * 1000
}) {
  const container = $("#" + containerId);
  if (!container) return;

  const status = statusId ? $("#" + statusId) : null;
  const meta = metaId ? $("#" + metaId) : null;
  const refreshButton = refreshButtonId ? $("#" + refreshButtonId) : null;
  const search = searchId ? $("#" + searchId) : null;
  const source = sourceId ? $("#" + sourceId) : null;
  const summaryButton = summaryButtonId ? $("#" + summaryButtonId) : null;
  const clearSavedButton = clearSavedButtonId ? $("#" + clearSavedButtonId) : null;
  const resetFiltersButton = resetFiltersButtonId ? $("#" + resetFiltersButtonId) : null;

  let allItems = [];
  let feedSnapshots = [];

  const renderSaved = () => renderFeedClips(savedContainerId, savedStatusId);

  const filteredItems = () => {
    const term = search?.value.trim().toLowerCase() || "";
    const sourceValue = source?.value || "all";

    return allItems.filter((item) => {
      const matchesSource = sourceValue === "all" || item.feedId === sourceValue;
      const haystack = [
        item.title,
        item.description,
        item.feedTitle,
        item.category
      ].filter(Boolean).join(" ").toLowerCase();
      const matchesTerm = !term || haystack.includes(term);
      return matchesSource && matchesTerm;
    });
  };

  const renderVisibleBoard = () => {
    const visibleItems = filteredItems();
    const topics = readStore(STORAGE_KEYS.watch, PORTFOLIO_DATA.watchTopics);
    const savedLinks = new Set(readStore(STORAGE_KEYS.feedClips, []).map((item) => item.link));

    container.innerHTML = visibleItems.length
      ? visibleItems.map((item) => {
          const matchingTopics = matchFeedTopics(item, topics);
          const isSaved = savedLinks.has(item.link);
          return `
            <article class="feed-item">
              <div class="feed-item__top">
                <span class="pill">${escapeHtml(item.feedTitle || item.category || "Flux")}</span>
                <span class="notice">${escapeHtml(formatFeedDate(item.pubDate))}</span>
              </div>
              <h3>${escapeHtml(item.title || "Article sans titre")}</h3>
              <p>${escapeHtml(item.description || "Aucun resume disponible.")}</p>
              ${matchingTopics.length ? `<div class="feed-tags">${matchingTopics.map((topic) => `<span class="feed-tag">Watchlist: ${escapeHtml(topic)}</span>`).join("")}</div>` : ""}
              <div class="inline-actions">
                <a class="btn btn--secondary btn--small" href="${item.link}" target="_blank" rel="noopener">Lire l'article</a>
                <button class="btn btn--secondary btn--small" type="button" data-copy-link="${item.link}" data-copy-message="Lien du flux copie.">Copier le lien</button>
                <button class="btn ${isSaved ? "btn--secondary" : "btn--accent"} btn--small" type="button" data-feed-save="${encodeURIComponent(item.link)}">${isSaved ? "Deja sauvegarde" : "Sauvegarder"}</button>
              </div>
            </article>
          `;
        }).join("")
      : `<article class="feed-item empty-state"><h3>Aucun resultat</h3><p>Essaie un autre mot-cle, change la source ou relance l'actualisation.</p></article>`;

    bindCopyButtons(container);

    $$("[data-feed-save]", container).forEach((button) => {
      button.addEventListener("click", () => {
        const link = decodeURIComponent(button.dataset.feedSave);
        const selected = allItems.find((item) => item.link === link);
        if (!selected) return;

        const clips = readStore(STORAGE_KEYS.feedClips, []);
        if (clips.some((item) => item.link === selected.link)) {
          showToast("Cet article est deja dans la bibliotheque locale.", "warning");
          return;
        }

        clips.unshift({
          ...selected,
          savedAt: new Date().toISOString()
        });
        writeStore(STORAGE_KEYS.feedClips, clips.slice(0, 24));
        renderSaved();
        showToast("Article sauvegarde pour ta veille.", "success");
        renderVisibleBoard();
      });
    });

    const lastDates = feedSnapshots.map((feed) => feed.fetchedAt).filter(Boolean).sort().reverse();
    if (meta) {
      meta.textContent = lastDates.length
        ? `${visibleItems.length} article(s) visibles · Derniere mise a jour locale: ${formatFeedDate(lastDates[0])}`
        : `${visibleItems.length} article(s) visibles · Aucune mise a jour disponible.`;
    }
    if (status) {
      const staleCount = feedSnapshots.filter((feed) => feed.stale).length;
      status.textContent = staleCount
        ? `Affichage partiel depuis le cache local (${staleCount} flux en attente de reponse).`
        : "Flux officiels charges automatiquement.";
    }
  };

  const refreshBoard = async (force = false) => {
    if (status) status.textContent = force ? "Actualisation en cours..." : "Chargement des flux officiels...";

    feedSnapshots = await refreshLiveFeeds(feedIds, force);
    allItems = feedSnapshots
      .flatMap((feed) => (feed.items || []).slice(0, limit).map((item) => ({
        ...item,
        fetchedAt: feed.fetchedAt,
        homepage: feed.homepage,
        stale: feed.stale
      })))
      .sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));

    renderVisibleBoard();
  };

  search?.addEventListener("input", renderVisibleBoard);
  source?.addEventListener("change", renderVisibleBoard);
  refreshButton?.addEventListener("click", () => refreshBoard(true));
  summaryButton?.addEventListener("click", () => {
    const clips = readStore(STORAGE_KEYS.feedClips, []);
    const items = clips.length ? clips : filteredItems().slice(0, 8);
    copyText(buildFeedSummary(items), "Synthese de veille copiee.");
  });
  clearSavedButton?.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEYS.feedClips);
    renderSaved();
    showToast("Bibliotheque locale de veille videe.", "success");
  });
  resetFiltersButton?.addEventListener("click", () => {
    if (search) search.value = "";
    if (source) source.value = "all";
    renderVisibleBoard();
  });

  renderSaved();
  await refreshBoard(false);
  if (autoRefreshMs > 0) {
    window.setInterval(() => refreshBoard(true), autoRefreshMs);
  }
}

function renderLeads() {
  const host = $("#lead-list");
  if (!host) return;
  const leads = readStore(STORAGE_KEYS.leads, []);
  if (!leads.length) {
    host.innerHTML = `<div class="lead-item"><strong>Aucun suivi pour le moment</strong><span class="notice">Ajoute un contact ou une mission pour garder une trace locale.</span></div>`;
    return;
  }
  host.innerHTML = leads.map((lead, index) => `
    <article class="lead-item">
      <strong>${lead.name}</strong>
      <span class="notice">${lead.type} · ${lead.status} · ${lead.date || "sans date"}</span>
      <p>${lead.note}</p>
      <div class="inline-actions">
        <button class="btn btn--secondary btn--small" type="button" data-lead-copy="${index}">Copier</button>
        <button class="btn btn--secondary btn--small" type="button" data-lead-delete="${index}">Supprimer</button>
      </div>
    </article>
  `).join("");
  $$("[data-lead-copy]", host).forEach((button) => {
    button.addEventListener("click", () => {
      const lead = leads[Number(button.dataset.leadCopy)];
      if (!lead) return;
      copyText([
        lead.name,
        `${lead.type} · ${lead.status}`,
        lead.date || "",
        "",
        lead.note || ""
      ].filter(Boolean).join("\n"), "Fiche contact copiee.");
    });
  });
  $$("[data-lead-delete]", host).forEach((button) => {
    button.addEventListener("click", () => {
      const leadsNow = readStore(STORAGE_KEYS.leads, []);
      leadsNow.splice(Number(button.dataset.leadDelete), 1);
      writeStore(STORAGE_KEYS.leads, leadsNow);
      renderLeads();
      showToast("Entree supprimee du suivi local.", "success");
    });
  });
}

function initLeadTool() {
  const submit = $("#lead-add");
  if (!submit) return;
  renderLeads();
  submit.addEventListener("click", () => {
    const name = $("#lead-name")?.value.trim();
    const type = $("#lead-type")?.value || "Client";
    const status = $("#lead-status")?.value || "A traiter";
    const date = $("#lead-date")?.value.trim() || "";
    const note = $("#lead-note")?.value.trim() || "";
    if (!name) {
      showToast("Ajoute au moins un nom ou une mission.", "warning");
      return;
    }
    const leads = readStore(STORAGE_KEYS.leads, []);
    leads.unshift({ name, type, status, date, note });
    writeStore(STORAGE_KEYS.leads, leads);
    ["#lead-name", "#lead-note", "#lead-date"].forEach((id) => { const el = $(id); if (el) el.value = ""; });
    renderLeads();
    showToast("Element ajoute au suivi local.", "success");
  });
}

function renderWatchList() {
  const host = $("#watch-list");
  if (!host) return;
  const items = readStore(STORAGE_KEYS.watch, PORTFOLIO_DATA.watchTopics);
  host.innerHTML = items.map((topic, index) => `
    <article class="watch-item">
      <strong>${topic}</strong>
      <div class="inline-actions">
        <button class="btn btn--secondary btn--small" type="button" data-copy-link="${topic}" data-copy-message="Sujet de veille copie.">Copier</button>
        <button class="btn btn--secondary btn--small" type="button" data-watch-delete="${index}">Retirer</button>
      </div>
    </article>
  `).join("");
  bindCopyButtons(host);
  $$("[data-watch-delete]", host).forEach((button) => {
    button.addEventListener("click", () => {
      const itemsNow = readStore(STORAGE_KEYS.watch, PORTFOLIO_DATA.watchTopics);
      itemsNow.splice(Number(button.dataset.watchDelete), 1);
      writeStore(STORAGE_KEYS.watch, itemsNow);
      renderWatchList();
      $("#watch-status") && ($("#watch-status").textContent = "Watchlist mise a jour.");
      showToast("Sujet retire de la watchlist.", "success");
    });
  });
}

function initWatchTool() {
  const add = $("#watch-add");
  if (!add) return;
  const reset = $("#watch-reset");
  const field = $("#watch-input");
  const copyAll = $("#watch-copy-all");
  renderWatchList();
  add.addEventListener("click", () => {
    const topic = field?.value.trim();
    if (!topic) {
      showToast("Ajoute un sujet de veille avant validation.", "warning");
      return;
    }
    const list = readStore(STORAGE_KEYS.watch, PORTFOLIO_DATA.watchTopics);
    if (list.some((item) => item.toLowerCase() === topic.toLowerCase())) {
      showToast("Ce sujet est deja present dans la watchlist.", "warning");
      return;
    }
    list.unshift(topic);
    writeStore(STORAGE_KEYS.watch, list);
    field.value = "";
    renderWatchList();
    $("#watch-status") && ($("#watch-status").textContent = "Sujet ajoute a la watchlist.");
    showToast("Sujet ajoute a la watchlist.", "success");
  });
  field?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    add.click();
  });
  reset?.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEYS.watch);
    renderWatchList();
    $("#watch-status") && ($("#watch-status").textContent = "Watchlist reinitialisee.");
    showToast("Watchlist reinitialisee.", "success");
  });
  copyAll?.addEventListener("click", () => {
    const list = readStore(STORAGE_KEYS.watch, PORTFOLIO_DATA.watchTopics);
    copyText(list.join("\n"), "Watchlist copiee.");
  });
}

function initCopyEmail(buttonId, targetId) {
  initCopyValue(buttonId, targetId, "Email copie.");
}

function initCopyPhone(buttonId, targetId) {
  initCopyValue(buttonId, targetId, "Telephone copie.");
}

function buildContactDraft() {
  const name = $("#contact-name")?.value.trim() || "Bonjour";
  const service = $("#contact-service")?.value?.trim() || "";
  const subjectField = $("#contact-subject")?.value?.trim() || "";
  const email = $("#contact-email")?.value.trim() || "";
  const phone = $("#contact-phone")?.value.trim() || "";
  const message = $("#contact-message")?.value.trim() || "Je souhaite echanger avec vous concernant votre portfolio / vos services.";
  const subject = subjectField || (service ? `Demande ${service} / NJR Solutions` : "Contact portfolio / NJR Solutions");
  const body = [
    name,
    email || "Email non renseigne",
    phone || "Telephone non renseigne",
    service ? `Service souhaite : ${service}` : "",
    "",
    message
  ].filter(Boolean).join("\n");
  const preview = [
    `Objet : ${subject}`,
    `Nom : ${name}`,
    `Email : ${email || "Non renseigne"}`,
    `Telephone : ${phone || "Non renseigne"}`,
    service ? `Sujet : ${service}` : "Sujet : Non precise",
    "",
    "Message :",
    message
  ].join("\n");
  return {
    name,
    service,
    subject,
    email,
    phone,
    message,
    body,
    preview
  };
}

function initMailDraft(buttonId) {
  const button = $("#" + buttonId);
  if (!button) return;
  button.addEventListener("click", () => {
    const draft = buildContactDraft();
    writeStore(STORAGE_KEYS.contact, {
      name: $("#contact-name")?.value.trim() || "",
      email: draft.email,
      phone: draft.phone,
      service: draft.service,
      subject: $("#contact-subject")?.value?.trim() || "",
      message: draft.message
    });
    window.location.href = `mailto:${PORTFOLIO_DATA.identity.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
  });
}

function initContactTool() {
  const preview = $("#contact-preview");
  if (!preview) return;
  const status = $("#contact-status");
  const fields = ["contact-name", "contact-email", "contact-phone", "contact-service", "contact-subject", "contact-message"];
  const saved = readStore(STORAGE_KEYS.contact, null);
  if (saved) {
    if ($("#contact-name")) $("#contact-name").value = saved.name || "";
    if ($("#contact-email")) $("#contact-email").value = saved.email || "";
    if ($("#contact-phone")) $("#contact-phone").value = saved.phone || "";
    if ($("#contact-service")) $("#contact-service").value = saved.service || "";
    if ($("#contact-subject")) $("#contact-subject").value = saved.subject || "";
    if ($("#contact-message")) $("#contact-message").value = saved.message || "";
  }

  const render = () => {
    const draft = buildContactDraft();
    preview.textContent = draft.preview;
    writeStore(STORAGE_KEYS.contact, {
      name: $("#contact-name")?.value.trim() || "",
      email: draft.email,
      phone: draft.phone,
      service: draft.service,
      subject: $("#contact-subject")?.value?.trim() || "",
      message: draft.message
    });
    if (status) status.textContent = "Brouillon sauvegarde localement.";
  };

  fields.forEach((id) => {
    $("#" + id)?.addEventListener("input", render);
    $("#" + id)?.addEventListener("change", render);
  });

  $("#copy-contact-preview")?.addEventListener("click", async () => {
    await copyText(preview.textContent, "Brouillon copie.");
  });

  $("#clear-contact-form")?.addEventListener("click", () => {
    fields.forEach((id) => {
      const node = $("#" + id);
      if (!node) return;
      node.value = "";
      if (id === "contact-service") node.value = "";
    });
    localStorage.removeItem(STORAGE_KEYS.contact);
    render();
    if (status) status.textContent = "Formulaire reinitialise.";
    showToast("Formulaire de contact reinitialise.", "success");
  });

  render();
}

function initPitchTool(selectId, outputId, copyId) {
  const select = $("#" + selectId);
  const output = $("#" + outputId);
  if (!select || !output) return;
  const render = () => {
    output.textContent = PORTFOLIO_DATA.pitches[select.value] || PORTFOLIO_DATA.pitches.jury;
  };
  select.addEventListener("change", render);
  $("#" + copyId)?.addEventListener("click", async () => {
    await copyText(output.textContent, "Presentation copiee.");
  });
  render();
}

function dataBackupPayload() {
  const data = {};
  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    const raw = localStorage.getItem(key);
    if (raw === null) return;
    data[name] = safeJsonParse(raw, raw);
  });
  return {
    version: 1,
    source: "NJR Solutions Portfolio",
    generatedAt: new Date().toISOString(),
    data
  };
}

function updateDataHubSummary(summaryId = "data-hub-summary") {
  const host = $("#" + summaryId);
  if (!host) return;
  const entries = Object.entries(STORAGE_KEYS)
    .filter(([, key]) => localStorage.getItem(key) !== null)
    .map(([name, key]) => ({ name, size: localStorage.getItem(key)?.length || 0 }));

  host.innerHTML = entries.length
    ? entries.map((entry) => `
        <div class="contact-line">
          <span>${entry.name}</span>
          <strong>${entry.size} car.</strong>
        </div>
      `).join("")
    : `<div class="notice">Aucune donnee locale stockee pour le moment.</div>`;
}

function initDataHub(exportId = "export-local-data", importTriggerId = "import-local-trigger", importInputId = "import-local-data", clearId = "clear-local-data", summaryId = "data-hub-summary") {
  const exportButton = $("#" + exportId);
  const importTrigger = $("#" + importTriggerId);
  const importInput = $("#" + importInputId);
  const clearButton = $("#" + clearId);

  updateDataHubSummary(summaryId);

  exportButton?.addEventListener("click", () => {
    const payload = dataBackupPayload();
    downloadTextFile(`njr-solutions-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(payload, null, 2));
    showToast("Sauvegarde locale exportee.", "success");
  });

  importTrigger?.addEventListener("click", () => importInput?.click());

  importInput?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      const data = payload.data || payload;
      Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
        if (!Object.prototype.hasOwnProperty.call(data, name)) return;
        localStorage.setItem(key, JSON.stringify(data[name]));
      });
      showToast("Sauvegarde importee. Rechargement du site...", "success");
      window.setTimeout(() => window.location.reload(), 320);
    } catch {
      showToast("Import impossible: fichier invalide.", "warning");
    } finally {
      event.target.value = "";
    }
  });

  clearButton?.addEventListener("click", () => {
    if (!window.confirm("Effacer toutes les donnees locales du site sur ce navigateur ?")) return;
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    showToast("Donnees locales effacees. Rechargement du site...", "success");
    window.setTimeout(() => window.location.reload(), 320);
  });
}

function renderWorkspaceSnapshot(containerId) {
  const host = $("#" + containerId);
  if (!host) return;
  const checklistState = readStore(STORAGE_KEYS.checklist, {});
  const checklistDone = PORTFOLIO_DATA.checklist.filter(([id]) => checklistState[id]).length;
  const checklistPercent = Math.round((checklistDone / PORTFOLIO_DATA.checklist.length) * 100);
  const leadsCount = readStore(STORAGE_KEYS.leads, []).length;
  const watchCount = readStore(STORAGE_KEYS.watch, PORTFOLIO_DATA.watchTopics).length;
  const feedCache = readStore(STORAGE_KEYS.feedCache, {});
  const feedCount = Object.values(feedCache).reduce((sum, entry) => sum + ((entry && entry.items) ? entry.items.length : 0), 0);

  host.innerHTML = `
    <article class="mini-panel">
      <div class="label">Progression BTS</div>
      <div class="kpi">${checklistPercent}%</div>
      <div class="notice">${checklistDone}/${PORTFOLIO_DATA.checklist.length} elements valides</div>
    </article>
    <article class="mini-panel">
      <div class="label">Suivi local</div>
      <div class="kpi">${leadsCount}</div>
      <div class="notice">contact${leadsCount > 1 ? "s" : ""} ou mission${leadsCount > 1 ? "s" : ""}</div>
    </article>
    <article class="mini-panel">
      <div class="label">Watchlist</div>
      <div class="kpi">${watchCount}</div>
      <div class="notice">sujets de veille memorises</div>
    </article>
    <article class="mini-panel">
      <div class="label">Flux recents</div>
      <div class="kpi">${feedCount}</div>
      <div class="notice">elements RSS en cache local</div>
    </article>
  `;
}

function renderCoverageCards(containerId) {
  const host = $("#" + containerId);
  if (!host) return;
  host.innerHTML = `
    <article class="card">
      <h3>Informatique</h3>
      <p>Diagnostic, remise en etat, postes, Wi-Fi, reseau local, sauvegarde, hygiene numerique et documentation d'intervention.</p>
      <div class="tags">
        <span class="tag tag--a">Support</span>
        <span class="tag tag--b">Reseau</span>
        <span class="tag tag--c">Securite</span>
      </div>
    </article>
    <article class="card">
      <h3>Nettoyage</h3>
      <p>Entretien ponctuel ou regulier, vitrerie, remise en etat, nettoyage voiture, terrasse et petits locaux.</p>
      <div class="tags">
        <span class="tag tag--a">Entretien</span>
        <span class="tag tag--b">Remise en etat</span>
        <span class="tag tag--c">Locaux</span>
      </div>
    </article>
    <article class="card">
      <h3>Zone et deplacement</h3>
      <p>Villeneuve-sur-Lot, Pujols et Bias sans frais. Secteur proche avec supplements progressifs selon la commune et le contexte.</p>
      <div class="tags">
        <span class="tag tag--a">Villeneuve-sur-Lot</span>
        <span class="tag tag--b">Pujols</span>
        <span class="tag tag--c">Bias</span>
      </div>
    </article>
  `;
}

function setStats(projectsId, resourcesId, servicesId) {
  if ($("#" + projectsId)) $("#" + projectsId).textContent = PORTFOLIO_DATA.projects.length;
  if ($("#" + resourcesId)) $("#" + resourcesId).textContent = filterPrivateItems(PORTFOLIO_DATA.resources).length;
  if ($("#" + servicesId)) $("#" + servicesId).textContent = PORTFOLIO_DATA.services.length;
}

function initSite(pageName) {
  window.__currentPageName = pageName;
  refreshSiteChrome();
  initCommandPalette();
  initBackToTop();
  applyReveal();
  if (isPrivatePage(pageName) && !canAccessPrivateContent()) {
    renderPrivateGate(pageName);
    return { allowPage: false, authenticated: false };
  }
  return { allowPage: true, authenticated: canAccessPrivateContent() };
}
