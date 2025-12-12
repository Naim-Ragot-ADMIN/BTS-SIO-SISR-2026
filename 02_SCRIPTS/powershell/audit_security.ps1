<#
.SYNOPSIS
  Audit de sécurité Windows / Active Directory

.DESCRIPTION
  Script daudit automatisé :
  - Comptes utilisateurs à risque
  - Groupes administrateurs
  - Ports ouverts
  - Services sensibles
  - Politique de mots de passe
  - Événements de sécurité
  Génère un rapport horodaté.

.CONTEXT
  Projet BTS SIO SISR  Audit & Sécurité
#>

$ErrorActionPreference = "Stop"

$ReportDir = ".\AUDIT_REPORTS"
$Date = Get-Date -Format "yyyy-MM-dd_HH-mm"
$ReportFile = "$ReportDir\audit_security_$Date.txt"

New-Item -ItemType Directory -Force -Path $ReportDir | Out-Null

function Write-Report($Title) {
  Add-Content $ReportFile "`n=============================="
  Add-Content $ReportFile $Title
  Add-Content $ReportFile "=============================="
}

Add-Content $ReportFile "AUDIT SÉCURITÉ - $(Get-Date)"
Add-Content $ReportFile "Machine : $env:COMPUTERNAME"
Add-Content $ReportFile "Utilisateur : $env:USERNAME"
Add-Content $ReportFile "--------------------------------"

# =========================================
# 1. COMPTES UTILISATEURS
# =========================================
Write-Report "COMPTES UTILISATEURS"

Get-LocalUser | ForEach-Object {
  Add-Content $ReportFile ("{0} | Enabled={1} | PasswordNeverExpires={2}" -f `
    $_.Name, $_.Enabled, $_.PasswordNeverExpires)
}

# =========================================
# 2. GROUPES ADMINISTRATEURS
# =========================================
Write-Report "GROUPES ADMINISTRATEURS LOCAUX"

Get-LocalGroupMember -Group "Administrators" |
  ForEach-Object { Add-Content $ReportFile $_.Name }

# =========================================
# 3. PORTS OUVERTS
# =========================================
Write-Report "PORTS RÉSEAU OUVERTS"

netstat -ano | Select-String "LISTENING" |
  ForEach-Object { Add-Content $ReportFile $_ }

# =========================================
# 4. SERVICES SENSIBLES
# =========================================
Write-Report "SERVICES SENSIBLES ACTIFS"

$SensitiveServices = @("RemoteRegistry","Spooler","WinRM","TermService")

foreach ($svc in $SensitiveServices) {
  $s = Get-Service -Name $svc -ErrorAction SilentlyContinue
  if ($s) {
    Add-Content $ReportFile ("{0} | Status={1} | StartType={2}" -f `
      $s.Name, $s.Status, $s.StartType)
  }
}

# =========================================
# 5. POLITIQUE MOT DE PASSE
# =========================================
Write-Report "POLITIQUE MOT DE PASSE"

net accounts | ForEach-Object { Add-Content $ReportFile $_ }

# =========================================
# 6. ÉVÉNEMENTS DE SÉCURITÉ
# =========================================
Write-Report "DERNIERS ÉVÉNEMENTS DE SÉCURITÉ"

Get-EventLog -LogName Security -Newest 20 |
  ForEach-Object {
    Add-Content $ReportFile ("{0} | {1} | {2}" -f `
      $_.TimeGenerated, $_.EventID, $_.Message.Substring(0, [Math]::Min(100, $_.Message.Length)))
  }

Add-Content $ReportFile "`nAUDIT TERMINÉ"
