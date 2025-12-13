# TCP vs UDP  BTS SIO SISR

##  Objectif
Comprendre les différences entre **TCP** et **UDP** (couche 4  Transport), pour choisir le bon protocole selon le besoin : fiabilité, latence, débit, temps réel.

---

##  Définition rapide
- **TCP (Transmission Control Protocol)** : protocole **orienté connexion**, **fiable**, avec contrôle derreur et dordre.
- **UDP (User Datagram Protocol)** : protocole **non orienté connexion**, **rapide**, sans garantie de livraison.

---

##  Fonctionnement

### TCP : connexion + fiabilité
- Établit une connexion (3-way handshake : SYN / SYN-ACK / ACK)
- Numérote les segments (ordre garanti)
- Accuse réception (ACK)
- Retransmet en cas de perte
- Contrôle de flux et congestion

 Avantage : fiable  
 Inconvénient : plus lent / plus de surcharge

---

### UDP : envoi direct
- Envoi best effort (pas de handshake)
- Pas dACK, pas de retransmission
- Pas de contrôle dordre

 Avantage : faible latence / rapide  
 Inconvénient : pertes possibles

---

##  Comparatif (à connaître)

| Critère | TCP | UDP |
|--------|-----|-----|
| Connexion | Oui | Non |
| Fiabilité | Oui (ACK + retransmission) | Non |
| Ordre des données | Garanti | Non garanti |
| Vitesse / latence | + lent | + rapide |
| Surcharge (overhead) | Plus élevée | Faible |
| Cas dusage | Web, mail, fichiers | Streaming, VoIP, jeux |

---

##  Exemples de protocoles
### Souvent en TCP
- HTTP/HTTPS (80/443)
- SMTP/IMAP/POP (mail)
- SSH (22)
- FTP (21)

### Souvent en UDP
- DNS (53) **souvent UDP**, parfois TCP si réponse trop grosse
- DHCP (67/68)
- VoIP (RTP)
- Jeux en ligne
- Streaming (selon techno)

---

##  Dépannage (réflexe BTS)
- Si **la connexion coupe / page ne charge pas**  souvent TCP (timeout, handshake, ports)
- Si **ça lag / micro-coupures audio**  souvent UDP (pertes tolérées mais visibles)
- Test : ports (ex. Test-NetConnection), pare-feu, NAT, règles routeur

---

##  Lien cybersécurité
- TCP : attaques SYN flood, scan de ports (SYN/ACK)
- UDP : amplification (DNS, NTP), flood UDP

---

##  À retenir pour lexamen
- TCP = **fiable** (connexion, accusés, retransmission)
- UDP = **rapide** (pas de connexion, pas de garanties)
- Le choix dépend du besoin : **fiabilité vs temps réel**

---

##  Questions type BTS
- Différence TCP/UDP ?
- Pourquoi DNS utilise souvent UDP ?
- Pourquoi la VoIP privilégie UDP ?
- Citer des protocoles TCP et UDP + ports

---

##  Mini résumé en 1 phrase
**TCP garantit que ça arrive correctement ; UDP privilégie la vitesse même si ça peut se perdre.**
