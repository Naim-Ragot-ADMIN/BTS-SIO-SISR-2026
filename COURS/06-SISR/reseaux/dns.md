# DNS  Domain Name System  BTS SIO SISR

##  Rôle du DNS
Le **DNS** permet de traduire un **nom de domaine** (ex : www.google.com) en **adresse IP**.
Sans DNS, lutilisateur devrait connaître les adresses IP des serveurs.

---

##  Principe de fonctionnement
1. Le client interroge son **serveur DNS local**
2. Si la réponse nest pas en cache :
   - serveur racine
   - serveur TLD (.fr, .com)
   - serveur faisant autorité
3. Ladresse IP est renvoyée au client
4. La réponse est **mise en cache**

---

##  Types de requêtes
- **Récursive** : le client attend une réponse finale
- **Itérative** : chaque serveur renvoie vers le suivant

 En entreprise, le client fait une requête récursive vers le DNS interne.

---

##  Enregistrements DNS essentiels

| Type | Rôle | Exemple |
|-----|-----|--------|
| A | Nom  IPv4 | site.fr  192.168.1.10 |
| AAAA | Nom  IPv6 | site.fr  fe80::1 |
| CNAME | Alias | www  site |
| MX | Serveur mail | mail.site.fr |
| NS | Serveur DNS | ns1.site.fr |
| PTR | IP  nom | résolution inverse |
| TXT | Infos diverses | SPF, DKIM |

---

##  Ports et protocoles
- **UDP 53** : requêtes classiques
- **TCP 53** : réponses volumineuses / transfert de zone

---

##  DNS en entreprise
- DNS interne (Active Directory)
- Zones directes / inverses
- Mise en cache pour performance
- Résolution des noms internes

---

##  Lien avec la cybersécurité
- **DNS spoofing** : fausse réponse DNS
- **DNS cache poisoning**
- **Amplification DNS** (attaque DDoS)
- DNS sécurisé : **DNSSEC**

---

##  Dépannage (réflexe BTS)
- IP OK mais site inaccessible  DNS
- Commandes utiles :
  - 
slookup
  - ping nomdedomaine
  - ipconfig /displaydns

---

##  À retenir pour lexamen
- DNS = **résolution de noms**
- Cache DNS = gain de performance
- UDP 53 par défaut
- DNS essentiel au fonctionnement du réseau

---

##  Questions types BTS
- Rôle du DNS ?
- Différence A / CNAME ?
- Pourquoi DNS utilise UDP ?
- Exemple dattaque DNS ?

---

##  Résumé en 1 phrase
**Le DNS est lannuaire dInternet qui traduit les noms compréhensibles en adresses IP.**
