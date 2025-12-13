# Modèle OSI  BTS SIO SISR

##  Contexte BTS
Le modèle OSI (Open Systems Interconnection) est un modèle théorique utilisé pour comprendre, concevoir et dépanner les réseaux informatiques.  
Il est **très souvent utilisé à lexamen** (questions directes, mises en situation, E4/E5).

---

##  Objectif du modèle OSI
- Normaliser les communications réseau
- Faciliter linteropérabilité entre matériels et logiciels
- Aider au **diagnostic des pannes réseau**

---

##  Les 7 couches du modèle OSI

| N° | Couche | Rôle principal | Exemples |
|----|--------|---------------|----------|
| 7 | Application | Interaction avec lutilisateur | HTTP, FTP, SMTP, DNS |
| 6 | Présentation | Formatage, chiffrement | SSL/TLS, encodage |
| 5 | Session | Gestion des sessions | NetBIOS, RPC |
| 4 | Transport | Fiabilité, ports | TCP, UDP |
| 3 | Réseau | Routage, adressage | IP, ICMP |
| 2 | Liaison | Trames, MAC | Ethernet, ARP |
| 1 | Physique | Transmission électrique | Câble RJ45, fibre |

---

##  Sens de circulation des données
- **Émission** : couche 7  couche 1  
- **Réception** : couche 1  couche 7  

Chaque couche ajoute (ou retire) des informations  **encapsulation**.

---

##  Utilité concrète pour le dépannage
Le modèle OSI permet de **localiser une panne** :

- Pas de lien  couche 1 (câble, carte réseau)
- Pas dIP  couche 3
- Site inaccessible  couche 7
- Ping OK mais pas HTTP  couche 4 ou 7

 Méthode de raisonnement très appréciée au BTS.

---

##  Lien avec la cybersécurité
- Pare-feu : couche 3 à 7
- Chiffrement TLS : couche 6
- Attaques DoS : couche 4
- Attaques applicatives : couche 7

---

##  À RETENIR POUR LEXAMEN
- OSI = **modèle théorique**
- TCP/IP = **modèle pratique**
- Chaque couche a un rôle précis
- Sert surtout à **expliquer et diagnostiquer**

---

##  Questions types BTS
- Donner les 7 couches du modèle OSI
- À quelle couche appartient le protocole TCP ?
- À quelle couche se situe une attaque XSS ?
- Comment le modèle OSI aide-t-il au dépannage réseau ?

---

##  Astuce mémotechnique
**A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing  
(Application  Présentation  Session  Transport  Réseau  Liaison  Physique)
