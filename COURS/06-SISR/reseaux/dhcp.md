# DHCP  Dynamic Host Configuration Protocol  BTS SIO SISR

##  Rôle du DHCP
Le **DHCP** permet dattribuer automatiquement les paramètres réseau aux machines :
- Adresse IP
- Masque de sous-réseau
- Passerelle par défaut
- Serveur DNS

 Il évite la configuration manuelle poste par poste.

---

##  Fonctionnement (DORA)
Le protocole DHCP suit le processus **DORA** :

1. **Discover** : le client cherche un serveur DHCP
2. **Offer** : le serveur propose une configuration IP
3. **Request** : le client accepte loffre
4. **Acknowledge** : le serveur confirme

---

##  Ports et protocoles
- **UDP 67** : serveur DHCP
- **UDP 68** : client DHCP
- Communication en broadcast au départ

---

##  Paramètres fournis par DHCP
- Adresse IP
- Masque
- Passerelle
- DNS
- Durée du bail
- Domaine DNS

---

##  Notion de bail DHCP
- Le **bail** est une durée dattribution de ladresse IP
- Le client renouvelle automatiquement le bail
- À expiration, lIP peut être réattribuée

---

##  DHCP en entreprise
- Serveur DHCP centralisé
- Étendues (plages dadresses)
- Exclusions
- Réservations (MAC  IP fixe)
- DHCP Relay pour réseaux distants

---

##  Lien avec la cybersécurité
- **DHCP rogue** : faux serveur DHCP
- Risque dinterception du trafic
- Protection : DHCP snooping, VLAN

---

##  Dépannage (réflexe BTS)
- Pas dIP  DHCP en cause
- Commandes utiles :
  - ipconfig /all
  - ipconfig /renew
  - ipconfig /release

---

##  À retenir pour lexamen
- DHCP = attribution automatique IP
- Processus **DORA**
- UDP 67/68
- Indispensable en réseau dentreprise

---

##  Questions types BTS
- Expliquer DORA
- Rôle du DHCP
- Différence IP statique / dynamique
- Exemple de risque DHCP

---

##  Résumé en 1 phrase
**Le DHCP automatise la configuration réseau des postes grâce à lattribution dynamique des adresses IP.**
