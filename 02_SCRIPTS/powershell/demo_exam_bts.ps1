<#
.SYNOPSIS
  Script de démonstration rapide  BTS SIO SISR

.DESCRIPTION
  Vérifications express :
  - Infos système
  - Réseau
  - Domaine Active Directory
  - Sécurité
  - Services critiques
  - Sauvegardes
  Génère un rapport simple pour le jury.

.CONTEXT
  Utilisation en démonstration orale E5.
#>

$ErrorActionPreference = "SilentlyContinue"

$ReportFile = ".\DEMO_EXAMEN_REPORT.txt"

function Write-Section($Title) {
  Add-Content $ReportFile "`n=============================="
  Add-Content $ReportFile $Title
  Add-Content $ReportFile "=============================="
}

Remove-Item $ReportFile -Force -ErrorAction SilentlyContinue
Add-Content $ReportFile "DÉMONSTRATION BTS SIO SISR"
Add-Content $ReportFile "Date : $(Get-Date)"
Add-Content $ReportFile "Machine : $env:COMPUTERNAME"
Add-Content $ReportFile "Utilisateur : $env:USERNAME"

# ===============================
# 1. INFOS SYSTÈME
# ===============================
Write-Section "INFOS SYSTÈME"
Get-ComputerInfo | Select-Object OsName, OsVersion, CsDomain |
  ForEach-Object { Add-Content $ReportFile $_ }

# ===============================
# 2. RÉSEAU
# ===============================
Write-Section "RÉSEAU"
Get-NetIPAddress -AddressFamily IPv4 |
  ForEach-Object {
    Add-Content $ReportFile ("{0} - {1}" -f $_.InterfaceAlias, $_.IPAddress)
  }

# ===============================
# 3. ACTIVE DIRECTORY
# ===============================
Write-Section "ACTIVE DIRECTORY"
try {
  Import-Module ActiveDirectory
  $domain = Get-ADDomain
  Add-Content $ReportFile "Domaine détecté : $($domain.DNSRoot)"
} catch {
  Add-Content $ReportFile "Aucun domaine Active Directory détecté"
}

# ===============================
# 4. SÉCURITÉ
# ===============================
Write-Section "SÉCURITÉ"
Get-NetFirewallProfile |
  ForEach-Object {
    Add-Content $ReportFile ("Pare-feu {0} : {1}" -f $_.Name, $_.Enabled)
  }

# ===============================
# 5. SERVICES CRITIQUES
# ===============================
Write-Section "SERVICES CRITIQUES"
$services = @("NTDS","DNS","LanmanServer","EventLog")

foreach ($svc in $services) {
  $s = Get-Service -Name $svc -ErrorAction SilentlyContinue
  if ($s) {
    Add-Content $ReportFile ("{0} : {1}" -f $s.Name, $s.Status)
  }
}

# ===============================
# 6. SAUVEGARDES
# ===============================
Write-Section "SAUVEGARDES"
$backupPath = "C:\AD_Backups"

if (Test-Path $backupPath) {
  Get-ChildItem $backupPath -Directory |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 3 |
    ForEach-Object {
      Add-Content $ReportFile ("Sauvegarde : {0} ({1})" -f $_.Name, $_.LastWriteTime)
    }
} else {
  Add-Content $ReportFile "Aucune sauvegarde détectée"
}

Add-Content $ReportFile "`nDÉMONSTRATION TERMINÉE"
