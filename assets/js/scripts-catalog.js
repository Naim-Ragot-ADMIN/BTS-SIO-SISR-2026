const SCRIPT_SECTIONS = [
  {
    id: "portable",
    title: "Scripts universels Windows + Linux",
    description: "La meme base peut etre lancee sur Windows ou Linux. Le script detecte l'OS et adapte les commandes, chemins ou controles."
  },
  {
    id: "windows",
    title: "Windows Server, Active Directory et poste admin",
    description: "Des scripts pratiques pour les labs Microsoft, le support poste, les partages et les automatismes d'administration."
  },
  {
    id: "linux",
    title: "Linux, Docker, monitoring et services auto-heberges",
    description: "Des stacks utiles pour la supervision, les services web, le lab et les environnements de demonstration."
  }
];

const SCRIPT_LIBRARY = [
  {
    id: "portable-system-inventory",
    title: "Inventaire systeme portable",
    section: "portable",
    runtime: "Python",
    tags: ["cross", "python", "inventory", "portable", "os-detect"],
    summary: "Genere un inventaire exploitable du poste ou du serveur: OS, hostname, disques, IP, memoire, Python et Docker.",
    useCase: "Audit rapide, annexe BTS, prerequis avant intervention",
    prereq: "Python 3",
    path: "automation-scripts/portable-system-inventory.py",
    sources: [
      { label: "Python platform", url: "https://docs.python.org/3/library/platform.html" },
      { label: "Python shutil", url: "https://docs.python.org/3/library/shutil.html" }
    ],
    preview: `#!/usr/bin/env python3
import platform
import socket
import shutil

system = platform.system().lower()
hostname = socket.gethostname()
report = {
    "system": system,
    "hostname": hostname
}`
  },
  {
    id: "portable-service-check",
    title: "Controle services multi-OS",
    section: "portable",
    runtime: "Python",
    tags: ["cross", "python", "service", "portable", "monitoring"],
    summary: "Verifie l'etat de services ou processus sur Windows et Linux avec une sortie JSON ou terminal lisible.",
    useCase: "Checklist de validation, support, supervision legere",
    prereq: "Python 3, droits suffisants selon le service vise",
    path: "automation-scripts/portable-service-check.py",
    sources: [
      { label: "Python subprocess", url: "https://docs.python.org/3/library/subprocess.html" }
    ],
    preview: `#!/usr/bin/env python3
import platform
import subprocess

if platform.system() == "Windows":
    command = ["powershell", "-NoProfile", "-Command", "Get-Service"]
else:
    command = ["systemctl", "is-active", "ssh"]`
  },
  {
    id: "portable-port-check",
    title: "Audit TCP et ports accessibles",
    section: "portable",
    runtime: "Python",
    tags: ["cross", "python", "network", "portable", "tcp"],
    summary: "Teste des cibles host:port, mesure la connectivite et produit un recap reutilisable.",
    useCase: "Verification reseau, precheck applicatif, support distant",
    prereq: "Python 3",
    path: "automation-scripts/portable-port-check.py",
    sources: [
      { label: "Python socket", url: "https://docs.python.org/3/library/socket.html" }
    ],
    preview: `#!/usr/bin/env python3
import socket

for target in targets:
    with socket.create_connection((host, port), timeout=timeout):
        print("OK", target)`
  },
  {
    id: "portable-backup-report",
    title: "Sauvegarde ZIP avec manifeste",
    section: "portable",
    runtime: "Python",
    tags: ["cross", "python", "backup", "portable", "archive"],
    summary: "Compresse un dossier, applique des exclusions et genere un manifeste JSON avec la trace des fichiers archives.",
    useCase: "Sauvegarde rapide avant intervention, archivage de support, preuve de methode",
    prereq: "Python 3, espace disque libre",
    path: "automation-scripts/portable-backup-report.py",
    sources: [
      { label: "Python zipfile", url: "https://docs.python.org/3/library/zipfile.html" }
    ],
    preview: `#!/usr/bin/env python3
from zipfile import ZipFile, ZIP_DEFLATED

with ZipFile(archive_path, "w", compression=ZIP_DEFLATED) as archive:
    archive.write(file_path, arcname=relative_path)`
  },
  {
    id: "portable-observability-stack",
    title: "Deploy observabilite portable",
    section: "portable",
    runtime: "Python",
    tags: ["cross", "python", "docker", "monitoring", "grafana", "prometheus"],
    summary: "Ecrit une stack Prometheus + Grafana et peut la lancer avec Docker Compose sur Windows ou Linux.",
    useCase: "Labo de supervision, demo BTS, pre-maquette monitoring",
    prereq: "Python 3, Docker et Docker Compose",
    path: "automation-scripts/portable-observability-stack.py",
    sources: [
      { label: "Docker Compose", url: "https://docs.docker.com/compose/" },
      { label: "Grafana Docker", url: "https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/" }
    ],
    preview: `#!/usr/bin/env python3
compose_file.write_text(COMPOSE_TEMPLATE, encoding="utf-8")
prometheus_file.write_text(PROMETHEUS_TEMPLATE, encoding="utf-8")

if args.launch:
    subprocess.run([docker_bin, "compose", "up", "-d"], cwd=project_dir, check=True)`
  },
  {
    id: "portable-http-smoke",
    title: "Smoke test HTTP multi-OS",
    section: "portable",
    runtime: "Python",
    tags: ["cross", "python", "http", "web", "portable", "monitoring"],
    summary: "Teste une ou plusieurs URL, remonte le code HTTP, le temps de reponse et un recap simple a conserver.",
    useCase: "Validation post-deploiement, verification web, check rapide de service",
    prereq: "Python 3",
    path: "automation-scripts/portable-http-smoke.py",
    sources: [
      { label: "Python urllib", url: "https://docs.python.org/3/library/urllib.request.html" }
    ],
    preview: `#!/usr/bin/env python3
from urllib import request

response = request.urlopen(url, timeout=timeout)
print(response.status, response.getheader("Content-Type"))`
  },
  {
    id: "portable-maintenance-bundle",
    title: "Bundle maintenance multi-OS",
    section: "portable",
    runtime: "Python",
    tags: ["cross", "python", "maintenance", "audit", "portable", "ops"],
    summary: "Lance un bundle de checks systeme, services, ports, URLs et commandes puis ecrit un JSON reutilisable.",
    useCase: "Routine d'audit, precheck avant intervention, support et BTS",
    prereq: "Python 3",
    path: "automation-scripts/portable-maintenance-bundle.py",
    sources: [
      { label: "Python subprocess", url: "https://docs.python.org/3/library/subprocess.html" },
      { label: "Python urllib", url: "https://docs.python.org/3/library/urllib.request.html" }
    ],
    preview: `report = {
    "system": detect_system(),
    "disks": disk_snapshot(),
    "services": service_snapshot(args.services),
    "ports": port_snapshot(args.ports, args.timeout)
}`
  },
  {
    id: "portable-network-diagnostic",
    title: "Diagnostic reseau multi-OS",
    section: "portable",
    runtime: "Python",
    tags: ["cross", "python", "network", "dns", "ping", "diagnostic"],
    summary: "Resolution DNS, ping et traceroute/tracert sur Windows ou Linux dans un seul script portable.",
    useCase: "Diagnostic reseau, preuve BTS, support de connectivite",
    prereq: "Python 3, ping disponible, traceroute/tracert facultatif",
    path: "automation-scripts/portable-network-diagnostic.py",
    sources: [
      { label: "Python socket", url: "https://docs.python.org/3/library/socket.html" },
      { label: "Python subprocess", url: "https://docs.python.org/3/library/subprocess.html" }
    ],
    preview: `report.append({
    "host": host,
    "resolved": resolve_host(host),
    "ping": ping_host(host),
    "trace": trace_host(host)
})`
  },
  {
    id: "portable-certificate-audit",
    title: "Audit certificats TLS multi-OS",
    section: "portable",
    runtime: "Python",
    tags: ["cross", "python", "tls", "certificate", "security", "audit"],
    summary: "Controle l'expiration, l'issuer, le SAN et le protocole TLS de plusieurs sites ou services HTTPS.",
    useCase: "Audit securite, suivi d'expiration, preuve BTS autour du chiffrement",
    prereq: "Python 3, acces reseau vers les cibles",
    path: "automation-scripts/portable-certificate-audit.py",
    sources: [
      { label: "Python ssl", url: "https://docs.python.org/3/library/ssl.html" },
      { label: "Python socket", url: "https://docs.python.org/3/library/socket.html" }
    ],
    preview: `with context.wrap_socket(sock, server_hostname=target["host"]) as tls_socket:
    certificate = tls_socket.getpeercert()
    cipher = tls_socket.cipher()
    protocol = tls_socket.version()`
  },
  {
    id: "portable-host-discovery",
    title: "Decouverte d'hotes multi-OS",
    section: "portable",
    runtime: "Python",
    tags: ["cross", "python", "network", "discovery", "ping", "diagnostic"],
    summary: "Scanne une ou plusieurs plages CIDR, detecte les hotes vivants et peut tenter la resolution inverse.",
    useCase: "Reconnaissance reseau, pre-audit, cartographie rapide de lab",
    prereq: "Python 3, commande ping disponible",
    path: "automation-scripts/portable-host-discovery.py",
    sources: [
      { label: "Python ipaddress", url: "https://docs.python.org/3/library/ipaddress.html" },
      { label: "Python concurrent.futures", url: "https://docs.python.org/3/library/concurrent.futures.html" }
    ],
    preview: `with ThreadPoolExecutor(max_workers=max(1, args.threads)) as executor:
    future_map = {executor.submit(probe_host, ip, args.timeout, args.reverse): ip for ip in ips}
    for future in as_completed(future_map):
        results.append(future.result())`
  },
  {
    id: "deploy-ad-forest",
    title: "Deployer une foret Active Directory",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "ad", "active-directory", "dns"],
    summary: "Installe AD DS, verifie les prerequis et cree une nouvelle foret avec DNS integre.",
    useCase: "Maquette Windows Server, lab AD DS, demo BTS",
    prereq: "Windows Server, console admin, mot de passe DSRM",
    path: "automation-scripts/deploy-ad-forest.ps1",
    sources: [
      { label: "Install-ADDSForest", url: "https://learn.microsoft.com/en-us/powershell/module/addsdeployment/install-addsforest" }
    ],
    preview: `Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
Import-Module ADDSDeployment

Test-ADDSForestInstallation @commonParams
Install-ADDSForest @commonParams -Force:$true -Confirm:$false`
  },
  {
    id: "import-ad-users",
    title: "Importer des utilisateurs AD depuis CSV",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "ad", "csv", "users"],
    summary: "Cree les OU, les comptes et les groupes de base a partir d'un CSV prestructure.",
    useCase: "Onboarding de lab, simulation entreprise, demo annexe",
    prereq: "Module ActiveDirectory, CSV correctement renseigne",
    path: "automation-scripts/import-ad-users-and-ou.ps1",
    sources: [
      { label: "New-ADUser", url: "https://learn.microsoft.com/en-us/powershell/module/activedirectory/new-aduser" }
    ],
    preview: `Import-Module ActiveDirectory
$users = Import-Csv -LiteralPath $CsvPath

foreach ($user in $users) {
    New-ADUser -Name $displayName -SamAccountName $user.SamAccountName
}`
  },
  {
    id: "deploy-dhcp-dns",
    title: "Deployer DHCP et options DNS",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "dhcp", "dns", "network"],
    summary: "Installe DHCP, cree une plage IPv4 et pose les options DNS et passerelle.",
    useCase: "Lab reseau Windows, maquette d'infra, service DHCP rapide",
    prereq: "Windows Server, droits admin, AD si autorisation DHCP",
    path: "automation-scripts/deploy-dhcp-dns.ps1",
    sources: [
      { label: "Add-DhcpServerv4Scope", url: "https://learn.microsoft.com/en-us/powershell/module/dhcpserver/add-dhcpserverv4scope" }
    ],
    preview: `Install-WindowsFeature -Name DHCP -IncludeManagementTools
Import-Module DhcpServer

Add-DhcpServerv4Scope -Name $ScopeName -StartRange ...
Set-DhcpServerv4OptionValue -ScopeId $ScopeId.IPAddressToString ...`
  },
  {
    id: "deploy-iis-site",
    title: "Deployer un site IIS et son App Pool",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "iis", "web", "website"],
    summary: "Installe IIS, cree un App Pool, deploie un site et le demarre proprement.",
    useCase: "Intranet, portail local, demo Windows web",
    prereq: "Windows Server, droits admin",
    path: "automation-scripts/deploy-iis-site.ps1",
    sources: [
      { label: "New-Website", url: "https://learn.microsoft.com/en-us/powershell/module/webadministration/new-website" }
    ],
    preview: `Install-WindowsFeature -Name Web-Server -IncludeManagementTools
Import-Module WebAdministration

New-WebAppPool -Name $AppPoolName
New-Website -Name $SiteName -Port $Port ...`
  },
  {
    id: "join-domain-workstation",
    title: "Joindre un poste au domaine",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "domain", "workstation", "support"],
    summary: "Renomme si besoin la machine, la joint au domaine et peut redemarrer automatiquement.",
    useCase: "Preparation poste, integration parc, support SISR",
    prereq: "Compte autorise a joindre le domaine, reseau OK",
    path: "automation-scripts/join-domain-workstation.ps1",
    sources: [
      { label: "Add-Computer", url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/add-computer" }
    ],
    preview: `Rename-Computer -NewName $ComputerName -Force
Add-Computer -DomainName $DomainName -Credential $Credential -OUPath $OUPath
Restart-Computer -Force`
  },
  {
    id: "create-smb-share",
    title: "Creer un partage SMB et ses ACL",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "smb", "share", "file-server"],
    summary: "Cree le dossier, applique les droits NTFS et publie le partage SMB avec acces lecture, modification ou total.",
    useCase: "Serveur de fichiers, departement, labo entreprise",
    prereq: "Windows Server ou Windows Pro avec partage SMB",
    path: "automation-scripts/create-smb-share.ps1",
    sources: [
      { label: "New-SmbShare", url: "https://learn.microsoft.com/en-us/powershell/module/smbshare/new-smbshare" }
    ],
    preview: `if (-not (Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
}

New-SmbShare -Name $ShareName -Path $Path -ReadAccess $ReadAccess`
  },
  {
    id: "set-firewall-baseline",
    title: "Poser une base pare-feu Windows",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "firewall", "security", "baseline"],
    summary: "Active les profils, journalise les paquets bloques et ouvre seulement les services choisis comme WinRM ou RDP.",
    useCase: "Durcissement initial, maquette securite, hygiene serveur",
    prereq: "Droits admin, revue prealable des regles necessaires",
    path: "automation-scripts/set-firewall-baseline.ps1",
    sources: [
      { label: "Set-NetFirewallProfile", url: "https://learn.microsoft.com/en-us/powershell/module/netsecurity/set-netfirewallprofile" }
    ],
    preview: `Set-NetFirewallProfile -Name $profiles -Enabled True -DefaultInboundAction Block

if ($EnableWinRM) {
    Enable-NetFirewallRule -DisplayGroup "Windows Remote Management"
}`
  },
  {
    id: "install-openssh-server",
    title: "Installer OpenSSH Server sur Windows",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "openssh", "ssh", "remote"],
    summary: "Installe OpenSSH Server, demarre le service, gere le port et la regle de pare-feu associee.",
    useCase: "Admin distante, lab hybride, poste technique",
    prereq: "Windows 10/11 ou Windows Server recent",
    path: "automation-scripts/install-openssh-server.ps1",
    sources: [
      { label: "OpenSSH on Windows", url: "https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse" }
    ],
    preview: `Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType Automatic`
  },
  {
    id: "export-event-logs",
    title: "Exporter les journaux Windows utiles",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "logs", "event", "support", "security"],
    summary: "Exporte les journaux Application, System ou Security dans un dossier date pour analyse ou annexe.",
    useCase: "Diagnostic, preuve d'incident, support, analyse BTS",
    prereq: "Droits admin pour Security, chemin de sortie accessible",
    path: "automation-scripts/export-event-logs.ps1",
    sources: [
      { label: "Get-WinEvent", url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/get-winevent" }
    ],
    preview: `Get-WinEvent -LogName $LogName -MaxEvents $MaxEvents |
    Select-Object TimeCreated, Id, LevelDisplayName, ProviderName, Message |
    Export-Csv -LiteralPath $csvPath -NoTypeInformation -Encoding UTF8`
  },
  {
    id: "deploy-ad-lab-core",
    title: "Deployer un coeur de lab AD complet",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "ad", "dhcp", "dns", "lab", "automation"],
    summary: "Orchestre la creation d'une foret AD, des OU, des groupes, du DHCP, des forwarders DNS et de partages de lab.",
    useCase: "Maquette BTS SISR, lab infra Microsoft, base de demo tres complete",
    prereq: "Windows Server, droits admin, prevoir un reboot potentiel",
    path: "automation-scripts/deploy-ad-lab-core.ps1",
    sources: [
      { label: "Install-ADDSForest", url: "https://learn.microsoft.com/en-us/powershell/module/addsdeployment/install-addsforest" },
      { label: "DhcpServer", url: "https://learn.microsoft.com/en-us/powershell/module/dhcpserver/add-dhcpserverv4scope" },
      { label: "New-SmbShare", url: "https://learn.microsoft.com/en-us/powershell/module/smbshare/new-smbshare" }
    ],
    preview: `Ensure-DomainForest
Ensure-OrganizationalUnits
Ensure-DnsForwarders
Ensure-DhcpScope
Ensure-LabShares`
  },
  {
    id: "invoke-windows-health-audit",
    title: "Audit Windows complet HTML + JSON",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "audit", "report", "support", "security"],
    summary: "Genere un rapport lisible avec disques, reseau, services critiques, pare-feu, partages, mises a jour et journaux.",
    useCase: "Audit machine, preuve BTS, diagnostic avant remediation",
    prereq: "PowerShell, droits admin recommandes",
    path: "automation-scripts/invoke-windows-health-audit.ps1",
    sources: [
      { label: "Get-HotFix", url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-hotfix" },
      { label: "Get-SmbShare", url: "https://learn.microsoft.com/en-us/powershell/module/smbshare/get-smbshare" },
      { label: "Get-WinEvent", url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/get-winevent" }
    ],
    preview: `$report = [ordered]@{
    Disks            = Get-DiskSnapshot
    Network          = Get-NetworkSnapshot
    CriticalServices = Get-ServiceSnapshot -Names $CriticalServices
}`
  },
  {
    id: "invoke-ad-user-lifecycle",
    title: "Piloter le cycle de vie utilisateurs AD",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "ad", "users", "lifecycle", "automation"],
    summary: "Cree, desactive, active, debloque, reinitialise ou exporte des comptes AD depuis un CSV unique.",
    useCase: "Administration comptes, onboarding, support, demonstration BTS",
    prereq: "Module ActiveDirectory, CSV propre, mot de passe pour create/reset",
    path: "automation-scripts/invoke-ad-user-lifecycle.ps1",
    sources: [
      { label: "New-ADUser", url: "https://learn.microsoft.com/en-us/powershell/module/activedirectory/new-aduser" },
      { label: "Set-ADAccountPassword", url: "https://learn.microsoft.com/en-us/powershell/module/activedirectory/set-adaccountpassword" },
      { label: "Unlock-ADAccount", url: "https://learn.microsoft.com/en-us/powershell/module/activedirectory/unlock-adaccount" }
    ],
    preview: `switch ($Action) {
  "Create" { New-ADUser @params }
  "Disable" { Disable-ADAccount -Identity $user }
  "ResetPassword" { Set-ADAccountPassword -Identity $user -Reset -NewPassword $Password }
}`
  },
  {
    id: "invoke-gpo-baseline-report",
    title: "Rapport baseline GPO",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "gpo", "audit", "report", "ad"],
    summary: "Inventorie les GPO, leurs liens, leur etat et peut sauvegarder les politiques dans un dossier de baseline.",
    useCase: "Audit AD, hygiene de domaine, dossier BTS oriente gouvernance",
    prereq: "Module GroupPolicy, droits de lecture GPO, module ActiveDirectory",
    path: "automation-scripts/invoke-gpo-baseline-report.ps1",
    sources: [
      { label: "Get-GPO", url: "https://learn.microsoft.com/en-us/powershell/module/grouppolicy/get-gpo" },
      { label: "Get-GPInheritance", url: "https://learn.microsoft.com/en-us/powershell/module/grouppolicy/get-gpinheritance" },
      { label: "Backup-GPO", url: "https://learn.microsoft.com/en-us/powershell/module/grouppolicy/backup-gpo" }
    ],
    preview: `$gpos = Get-GPO -All | Sort-Object DisplayName | ForEach-Object {
    $linkedTargets = @($gpoLinks[$_.DisplayName])
    if ($BackupPolicies) { Backup-GPO -Guid $_.Id -Path $BackupDirectory | Out-Null }
}`
  },
  {
    id: "invoke-dhcp-dns-health-report",
    title: "Rapport sante DHCP + DNS",
    section: "windows",
    runtime: "PowerShell",
    tags: ["windows", "powershell", "dhcp", "dns", "audit", "report", "network"],
    summary: "Produit un recap exploitable des services, zones DNS, forwarders, scopes DHCP et occupation des plages.",
    useCase: "Controle infra, verification avant oral, audit de maquette serveur",
    prereq: "Modules DnsServer et DhcpServer, droits de lecture suffisants",
    path: "automation-scripts/invoke-dhcp-dns-health-report.ps1",
    sources: [
      { label: "Get-DnsServerZone", url: "https://learn.microsoft.com/en-us/powershell/module/dnsserver/get-dnsserverzone" },
      { label: "Get-DhcpServerv4Scope", url: "https://learn.microsoft.com/en-us/powershell/module/dhcpserver/get-dhcpserverv4scope" },
      { label: "Get-DhcpServerv4ScopeStatistics", url: "https://learn.microsoft.com/en-us/powershell/module/dhcpserver/get-dhcpserverv4scopestatistics" }
    ],
    preview: `$summary = [ordered]@{
    Services = $services
    DnsZones = $zones
    DnsForwarders = $forwarders
    DhcpScopes = $scopes
}`
  },
  {
    id: "deploy-zabbix-grafana",
    title: "Deployer Zabbix + Grafana via Docker",
    section: "linux",
    runtime: "Bash",
    tags: ["linux", "bash", "docker", "monitoring", "zabbix", "grafana"],
    summary: "Lance une stack Zabbix Docker puis ajoute Grafana avec volume persistant.",
    useCase: "Supervision de lab, maquette SOC, demo monitoring",
    prereq: "Docker et Docker Compose",
    path: "automation-scripts/deploy-zabbix-grafana.sh",
    sources: [
      { label: "Zabbix containers", url: "https://www.zabbix.com/documentation/current/en/manual/installation/containers" },
      { label: "Grafana Docker", url: "https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/" }
    ],
    preview: `git clone https://github.com/zabbix/zabbix-docker.git "\${ZABBIX_REPO}"
docker compose -f docker-compose_v3_alpine_mysql_latest.yaml up -d
docker run -d --name grafana --restart unless-stopped -p 3000:3000 ...`
  },
  {
    id: "deploy-observability-platform",
    title: "Deployer une plateforme d'observabilite",
    section: "linux",
    runtime: "Bash",
    tags: ["linux", "bash", "docker", "monitoring", "prometheus", "grafana", "loki"],
    summary: "Monte une stack plus pro avec Prometheus, Grafana, Loki et Node Exporter dans un dossier autonome.",
    useCase: "Labo complet de supervision, demo pro, preuve monitoring BTS",
    prereq: "Docker et Docker Compose",
    path: "automation-scripts/deploy-observability-platform.sh",
    sources: [
      { label: "Prometheus installation", url: "https://prometheus.io/docs/prometheus/latest/installation/" },
      { label: "Grafana Docker", url: "https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/" },
      { label: "Loki Docker", url: "https://grafana.com/docs/loki/latest/setup/install/docker/" }
    ],
    preview: `services:
  prometheus:
  grafana:
  loki:
  node-exporter:`
  },
  {
    id: "deploy-reverse-proxy-lab",
    title: "Deployer un reverse proxy de lab",
    section: "linux",
    runtime: "Bash",
    tags: ["linux", "bash", "docker", "proxy", "nginx", "web"],
    summary: "Monte Nginx Proxy Manager en conteneur pour gerer des hôtes web et certificats dans un lab.",
    useCase: "Lab web, reverse proxy, centralisation d'acces",
    prereq: "Docker et Docker Compose",
    path: "automation-scripts/deploy-reverse-proxy-lab.sh",
    sources: [
      { label: "Nginx Proxy Manager setup", url: "https://nginxproxymanager.com/setup/" }
    ],
    preview: `services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    ports:
      - "\${HTTP_PORT}:80"`
  },
  {
    id: "deploy-portainer",
    title: "Deployer Portainer CE",
    section: "linux",
    runtime: "Bash",
    tags: ["linux", "bash", "docker", "portainer", "ops"],
    summary: "Prepare le volume Portainer et deploie l'interface d'administration Docker.",
    useCase: "Gestion conteneurs, lab Docker, visualisation simple",
    prereq: "Docker deja installe",
    path: "automation-scripts/deploy-portainer.sh",
    sources: [
      { label: "Portainer Docker install", url: "https://docs.portainer.io/start/install-ce/server/docker/linux" }
    ],
    preview: `docker volume create portainer_data
docker run -d --name portainer --restart unless-stopped \\
  -p 8000:8000 -p 9443:9443 \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v portainer_data:/data portainer/portainer-ce:lts`
  },
  {
    id: "deploy-prometheus-grafana",
    title: "Deployer Prometheus + Grafana",
    section: "linux",
    runtime: "Bash",
    tags: ["linux", "bash", "docker", "monitoring", "prometheus", "grafana"],
    summary: "Ecrit une stack compose avec Prometheus et Grafana, puis la demarre dans un dossier dedie.",
    useCase: "Observabilite de lab, demo BTS, stack de supervision basique",
    prereq: "Docker et Docker Compose",
    path: "automation-scripts/deploy-prometheus-grafana.sh",
    sources: [
      { label: "Prometheus installation", url: "https://prometheus.io/docs/prometheus/latest/installation/" },
      { label: "Grafana Docker", url: "https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/" }
    ],
    preview: `cat > "\${STACK_DIR}/compose.yaml" <<'YAML'
services:
  prometheus:
    image: prom/prometheus:latest
  grafana:
    image: grafana/grafana:latest`
  },
  {
    id: "deploy-gitea",
    title: "Deployer Gitea en conteneurs",
    section: "linux",
    runtime: "Bash",
    tags: ["linux", "bash", "docker", "gitea", "git", "devops"],
    summary: "Monte une forge Git legere avec volume persistant et ports exposes pour le web et SSH.",
    useCase: "Forge interne de lab, depot infra, demonstration DevOps",
    prereq: "Docker et Docker Compose",
    path: "automation-scripts/deploy-gitea.sh",
    sources: [
      { label: "Gitea Docker", url: "https://docs.gitea.com/installation/install-with-docker" }
    ],
    preview: `cat > "\${STACK_DIR}/compose.yaml" <<'YAML'
services:
  server:
    image: gitea/gitea:latest
    ports:
      - "\${HTTP_PORT}:3000"`
  },
  {
    id: "deploy-wazuh-single-node",
    title: "Deployer Wazuh single-node",
    section: "linux",
    runtime: "Bash",
    tags: ["linux", "bash", "docker", "wazuh", "security", "siem"],
    summary: "Clone la base officielle Wazuh Docker et lance le mode single-node pour un lab securite.",
    useCase: "SOC de demo, SIEM de lab, preuve cyber BTS",
    prereq: "Docker, Docker Compose, hote Linux confortable",
    path: "automation-scripts/deploy-wazuh-single-node.sh",
    sources: [
      { label: "Wazuh Docker", url: "https://documentation.wazuh.com/current/deployment-options/docker/wazuh-container.html" }
    ],
    preview: `git clone https://github.com/wazuh/wazuh-docker.git "\${WAZUH_DIR}"
cd "\${WAZUH_DIR}/single-node"
docker compose up -d`
  },
  {
    id: "deploy-node-exporter",
    title: "Deployer Node Exporter",
    section: "linux",
    runtime: "Bash",
    tags: ["linux", "bash", "monitoring", "prometheus", "node-exporter"],
    summary: "Lance Node Exporter en conteneur pour remonter les metriques d'un hote Linux vers Prometheus.",
    useCase: "Base monitoring, maquette metrics, labo observabilite",
    prereq: "Docker deja installe",
    path: "automation-scripts/deploy-node-exporter.sh",
    sources: [
      { label: "Node exporter guide", url: "https://prometheus.io/docs/guides/node-exporter/" }
    ],
    preview: `docker run -d \\
  --name node-exporter \\
  --restart unless-stopped \\
  --net host \\
  prom/node-exporter:latest`
  },
  {
    id: "deploy-glpi-stack",
    title: "Deployer une stack GLPI",
    section: "linux",
    runtime: "Bash",
    tags: ["linux", "bash", "docker", "glpi", "helpdesk", "support"],
    summary: "Monte une base GLPI + MariaDB pour un lab helpdesk ou un environnement de gestion de parc simple.",
    useCase: "Support, ticketing, gestion de parc et demonstration BTS orientee service",
    prereq: "Docker et Docker Compose, hote Linux ou VM de lab",
    path: "automation-scripts/deploy-glpi-stack.sh",
    sources: [
      { label: "GLPI installation", url: "https://glpi-install.readthedocs.io/" },
      { label: "MariaDB Docker", url: "https://hub.docker.com/_/mariadb" }
    ],
    preview: `cat > "\${STACK_DIR}/compose.yaml" <<YAML
services:
  mariadb:
    image: mariadb:11
  glpi:
    image: diouxx/glpi:latest`
  }
];

const SCRIPT_SPOTLIGHTS = [
  {
    id: "deploy-ad-lab-core",
    title: "Lab Microsoft orchestre",
    text: "Une seule base pour AD, DNS, DHCP, OU, groupes et partages. Tres forte pour parler industrialisation, structuration et logique d'infra."
  },
  {
    id: "invoke-windows-health-audit",
    title: "Audit exploitable tout de suite",
    text: "Rapport HTML + JSON, controles de services, reseau, partages et journaux. C'est le genre de sortie qui fait tres pro au BTS."
  },
  {
    id: "portable-maintenance-bundle",
    title: "Maintenance portable",
    text: "Le meme script tourne sur Windows ou Linux, detecte l'OS et te donne un bundle d'etat tres reutilisable."
  },
  {
    id: "deploy-observability-platform",
    title: "Supervision visible",
    text: "Prometheus, Grafana, Loki et Node Exporter offrent des preuves visuelles tres fortes pour l'oral et les demos."
  }
];

const SCRIPT_PLAYBOOKS = [
  {
    title: "Playbook lab Microsoft",
    text: "Pour monter une maquette Windows Server defendable au BTS avec AD, comptes, GPO et sante reseau.",
    ids: ["deploy-ad-lab-core", "invoke-ad-user-lifecycle", "invoke-gpo-baseline-report", "invoke-dhcp-dns-health-report"]
  },
  {
    title: "Playbook audit & remediation",
    text: "Pour partir d'un etat des lieux, qualifier le probleme puis garder une trace exploitable avant correction.",
    ids: ["invoke-windows-health-audit", "portable-maintenance-bundle", "export-event-logs", "portable-certificate-audit"]
  },
  {
    title: "Playbook reseau & decouverte",
    text: "Pour scanner, tester, diagnostiquer puis argumenter un probleme reseau avec des preuves plus solides.",
    ids: ["portable-network-diagnostic", "portable-host-discovery", "portable-port-check", "portable-http-smoke"]
  },
  {
    title: "Playbook supervision & services",
    text: "Pour deployer un environnement visuel et montrable avec monitoring, reverse proxy, helpdesk et stacks Docker.",
    ids: ["deploy-observability-platform", "deploy-zabbix-grafana", "deploy-reverse-proxy-lab", "deploy-glpi-stack"]
  }
];

const SCRIPT_COVERAGE_AREAS = [
  { title: "Microsoft / AD", match: (item) => item.tags.includes("ad") || item.tags.includes("gpo") || item.tags.includes("dhcp") || item.tags.includes("dns") },
  { title: "Support / audit", match: (item) => item.tags.includes("audit") || item.tags.includes("support") || item.tags.includes("logs") || item.tags.includes("maintenance") },
  { title: "Cross-platform", match: (item) => item.tags.includes("cross") },
  { title: "Docker / self-hosted", match: (item) => item.tags.includes("docker") || item.tags.includes("helpdesk") },
  { title: "Monitoring", match: (item) => item.tags.includes("monitoring") || item.tags.includes("prometheus") || item.tags.includes("grafana") || item.tags.includes("zabbix") },
  { title: "Securite", match: (item) => item.tags.includes("security") || item.tags.includes("tls") || item.tags.includes("firewall") || item.tags.includes("wazuh") }
];

const SCRIPT_GOALS = {
  lab: {
    label: "Monter un lab BTS",
    match(item, platform) {
      const tags = item.tags;
      return (
        tags.includes("lab") ||
        tags.includes("ad") ||
        tags.includes("dhcp") ||
        tags.includes("dns") ||
        (platform === "linux" && tags.includes("docker"))
      );
    }
  },
  audit: {
    label: "Auditer ou diagnostiquer",
    match(item) {
      const tags = item.tags;
      return tags.includes("audit") || tags.includes("inventory") || tags.includes("maintenance") || tags.includes("logs");
    }
  },
  monitoring: {
    label: "Superviser et monitorer",
    match(item) {
      const tags = item.tags;
      return tags.includes("monitoring") || tags.includes("prometheus") || tags.includes("grafana") || tags.includes("zabbix") || tags.includes("loki");
    }
  },
  support: {
    label: "Support et administration",
    match(item) {
      const tags = item.tags;
      return tags.includes("support") || tags.includes("share") || tags.includes("remote") || tags.includes("service");
    }
  }
};

function getScriptById(id) {
  return SCRIPT_LIBRARY.find((item) => item.id === id);
}

function renderScriptSummary() {
  const total = SCRIPT_LIBRARY.length;
  const runtimes = new Set(SCRIPT_LIBRARY.map((item) => item.runtime));
  const sections = new Set(SCRIPT_LIBRARY.map((item) => item.section));
  const crossCount = SCRIPT_LIBRARY.filter((item) => item.tags.includes("cross")).length;

  const totalNode = document.getElementById("scripts-total-count");
  const sectionNode = document.getElementById("scripts-section-count");
  const runtimeNode = document.getElementById("scripts-runtime-count");
  const crossNode = document.getElementById("scripts-cross-count");

  if (totalNode) totalNode.textContent = String(total);
  if (sectionNode) sectionNode.textContent = String(sections.size);
  if (runtimeNode) runtimeNode.textContent = Array.from(runtimes).join(" · ");
  if (crossNode) crossNode.textContent = String(crossCount);
}

function renderScriptCollections(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = SCRIPT_SECTIONS.map((section) => {
    const items = SCRIPT_LIBRARY.filter((item) => item.section === section.id);
    const runtimes = Array.from(new Set(items.map((item) => item.runtime))).join(" · ");
    return `
      <article class="card card--compact">
        <h3>${section.title}</h3>
        <p>${section.description}</p>
        <div class="script-meta">
          <span class="pill">${items.length} scripts</span>
          <span class="pill">${runtimes}</span>
        </div>
      </article>
    `;
  }).join("");
}

function renderScriptSpotlights(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = SCRIPT_SPOTLIGHTS.map((spotlight) => {
    const item = getScriptById(spotlight.id);
    if (!item) return "";
    return `
      <article class="card card--compact scenario-card">
        <div class="script-meta">
          <span class="pill">${item.runtime}</span>
          <span class="pill">${item.section}</span>
        </div>
        <h3>${spotlight.title}</h3>
        <p>${spotlight.text}</p>
        <p class="notice">Script: ${item.title}</p>
        <div class="inline-actions">
          <a class="btn btn--secondary btn--small" href="${item.path}" download>Telecharger</a>
          <button class="btn btn--secondary btn--small" type="button" data-copy-script-path="${item.path}">Copier le chemin</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderScriptPlaybooks(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = SCRIPT_PLAYBOOKS.map((playbook) => {
    const items = playbook.ids.map((id) => getScriptById(id)).filter(Boolean);
    return `
      <article class="card card--compact">
        <h3>${playbook.title}</h3>
        <p>${playbook.text}</p>
        <div class="script-meta">
          ${items.map((item) => `<span class="pill">${item.runtime}</span>`).join("")}
        </div>
        <div class="stack-list">
          ${items.map((item) => `<div class="stack-list__item"><strong>${item.title}</strong><span>${item.useCase}</span></div>`).join("")}
        </div>
      </article>
    `;
  }).join("");
}

function renderScriptCoverage(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = SCRIPT_COVERAGE_AREAS.map((area) => {
    const count = SCRIPT_LIBRARY.filter((item) => area.match(item)).length;
    return `
      <article class="card card--compact">
        <div class="label">Couverture</div>
        <div class="kpi">${count}</div>
        <h3>${area.title}</h3>
        <p>Ce bloc montre que la base ne se limite pas a un type de techno et peut servir autant a la demo qu'a des taches concretes.</p>
      </article>
    `;
  }).join("");
}

function renderScriptLibrary(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = SCRIPT_SECTIONS.map((section) => {
    const items = SCRIPT_LIBRARY.filter((item) => item.section === section.id);
    return `
      <section class="section reveal library-section" id="section-${section.id}">
        <div class="section__head">
          <div>
            <h2>${section.title}</h2>
            <p>${section.description}</p>
          </div>
        </div>
        <div class="script-shell">
          ${items.map((item) => `
            <article class="script-card" data-script-item data-tags="${item.tags.join(" ")} ${item.runtime.toLowerCase()} ${section.id}">
              <div class="card__top">
                <div>
                  <h3>${item.title}</h3>
                  <p>${item.summary}</p>
                </div>
                <span class="badge">${item.runtime}</span>
              </div>
              <div class="script-meta">
                <span class="pill">${item.useCase}</span>
                ${item.tags.slice(0, 4).map((tag) => `<span class="pill">${tag}</span>`).join("")}
              </div>
              <p class="notice">Prerequis: ${item.prereq}</p>
              <div class="inline-actions">
                <a class="btn btn--secondary btn--small" href="${item.path}" download>Telecharger</a>
                <button class="btn btn--secondary btn--small" type="button" data-copy-script-path="${item.path}">Copier le chemin</button>
                ${item.sources.map((source) => `<a class="btn btn--secondary btn--small" href="${source.url}" target="_blank" rel="noopener">${source.label}</a>`).join("")}
              </div>
              <details class="faq-item script-preview">
                <summary>Voir l'extrait</summary>
                <pre class="script-code"><code>${escapeHtml(item.preview)}</code></pre>
              </details>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function initScriptsLibraryPage() {
  renderScriptSummary();
  renderScriptCollections("script-collections");
  renderScriptSpotlights("script-spotlights");
  renderScriptPlaybooks("script-playbooks");
  renderScriptCoverage("script-coverage");
  renderScriptLibrary("script-library");
  applyReveal();

  const scriptCards = Array.from(document.querySelectorAll("[data-script-item]"));
  const scriptSearch = document.getElementById("scripts-search");
  const scriptFilters = document.getElementById("scripts-filters");
  const scriptCount = document.getElementById("scripts-count");
  let activeScriptFilter = "all";

  function renderScriptFilters() {
    const query = (scriptSearch?.value || "").trim().toLowerCase();
    let visible = 0;

    scriptCards.forEach((card) => {
      const tags = (card.dataset.tags || "").toLowerCase();
      const text = card.textContent.toLowerCase();
      const filterMatch = activeScriptFilter === "all" || tags.includes(activeScriptFilter);
      const queryMatch = !query || text.includes(query) || tags.includes(query);
      const show = filterMatch && queryMatch;
      card.style.display = show ? "" : "none";
      if (show) visible += 1;
    });

    if (scriptCount) {
      scriptCount.textContent = `${visible} script${visible > 1 ? "s" : ""} affiche${visible > 1 ? "s" : ""}`;
    }
  }

  scriptFilters?.querySelectorAll("[data-script-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      scriptFilters.querySelectorAll("[data-script-filter]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      activeScriptFilter = button.dataset.scriptFilter;
      renderScriptFilters();
    });
  });

  scriptSearch?.addEventListener("input", renderScriptFilters);

  document.querySelectorAll("[data-copy-script-path]").forEach((button) => {
    button.addEventListener("click", async () => {
      await copyText(button.dataset.copyScriptPath, "Chemin du script copie.");
    });
  });

  renderScriptFilters();
}

function initScriptAdvisor() {
  const goal = document.getElementById("script-advisor-goal");
  const platform = document.getElementById("script-advisor-platform");
  const output = document.getElementById("script-advisor-output");
  if (!goal || !platform || !output) return;

  const render = () => {
    const goalValue = goal.value;
    const platformValue = platform.value;

    const items = SCRIPT_LIBRARY.filter((item) => {
      const platformMatch = platformValue === "all"
        || (platformValue === "windows" && item.section === "windows")
        || (platformValue === "linux" && item.section === "linux")
        || (platformValue === "portable" && item.section === "portable");

      const goalMatch = goalValue === "all" || SCRIPT_GOALS[goalValue]?.match(item, platformValue);
      return platformMatch && goalMatch;
    }).slice(0, 6);

    output.innerHTML = items.length
      ? items.map((item) => `
          <article class="card card--compact">
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <div class="script-meta">
              <span class="pill">${item.runtime}</span>
              <span class="pill">${item.useCase}</span>
            </div>
            <div class="inline-actions">
              <a class="btn btn--secondary btn--small" href="${item.path}" download>Telecharger</a>
              <button class="btn btn--secondary btn--small" type="button" data-copy-script-path="${item.path}">Copier le chemin</button>
            </div>
          </article>
        `).join("")
      : `<article class="card card--compact"><h3>Aucun script recommande</h3><p>Essaie un autre couple objectif / plateforme pour afficher une selection utile.</p></article>`;

    output.querySelectorAll("[data-copy-script-path]").forEach((button) => {
      button.addEventListener("click", async () => {
        await copyText(button.dataset.copyScriptPath, "Chemin du script copie.");
      });
    });
  };

  goal.addEventListener("change", render);
  platform.addEventListener("change", render);
  render();
}
