<#
.SYNOPSIS
  Création et configuration dune GPO de sécurité (hardening).

.DESCRIPTION
  Automatise :
  - Création dune GPO
  - Paramètres de sécurité de base
  - Liaison à une OU
  - Génération dun rapport HTML

.CONTEXT
  Projet BTS SIO SISR  Sécurité & GPO

.REQUIREMENTS
  - Domaine Active Directory
  - Module GroupPolicy
  - Droits administrateur du domaine
#>

$ErrorActionPreference = "Stop"

# ===============================
# VARIABLES
# ===============================
$GpoName = "GPO_Securite_BTS"
$TargetOU = "OU=Users,OU=BTS,DC=bts,DC=local"   # À adapter plus tard
$ReportPath = ".\GPO_Report.html"

function Log($Msg) {
  Write-Host "[INFO] $Msg"
}

# ===============================
# VÉRIFICATIONS
# ===============================
Import-Module GroupPolicy

try {
  Get-ADDomain | Out-Null
} catch {
  Write-Host "[ERROR] Aucun domaine Active Directory détecté."
  exit 1
}

# ===============================
# CRÉATION GPO
# ===============================
$gpo = Get-GPO -Name $GpoName -ErrorAction SilentlyContinue

if (-not $gpo) {
  $gpo = New-GPO -Name $GpoName
  Log "GPO créée : $GpoName"
} else {
  Log "GPO déjà existante : $GpoName"
}

# ===============================
# PARAMÈTRES DE SÉCURITÉ
# ===============================

# Mot de passe : longueur minimale 12
Set-GPRegistryValue `
  -Name $GpoName `
  -Key "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon" `
  -ValueName "MinimumPasswordLength" `
  -Type DWord `
  -Value 12

# Verrouillage de compte
Set-GPRegistryValue `
  -Name $GpoName `
  -Key "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon" `
  -ValueName "LockoutBadCount" `
  -Type DWord `
  -Value 5

Log "Paramètres de sécurité appliqués"

# ===============================
# LIEN GPO -> OU
# ===============================
New-GPLink -Name $GpoName -Target $TargetOU -Enforced Yes
Log "GPO liée à lOU : $TargetOU"

# ===============================
# RAPPORT HTML
# ===============================
Get-GPOReport -Name $GpoName -ReportType Html -Path $ReportPath
Log "Rapport GPO généré : $ReportPath"

Log "Script GPO terminé"
