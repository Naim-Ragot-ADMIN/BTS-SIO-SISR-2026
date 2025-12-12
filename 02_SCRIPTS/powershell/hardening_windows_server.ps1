<#
.SYNOPSIS
  Script de durcissement (hardening) Windows Server / Active Directory.

.DESCRIPTION
  Applique des mesures de sécurité de base :
  - Pare-feu activé
  - Services inutiles emphasizing disabled
  - Sécurisation RDP
  - Audit de sécurité activé
  - Journalisation complète

.CONTEXT
  Projet BTS SIO SISR  Sécurité système

.WARNING
  Script à tester en environnement de LAB uniquement.
#>

$ErrorActionPreference = "Stop"
$LogFile = ".\hardening_server.log"

function Log($Level, $Msg) {
  $line = "[$Level] $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $Msg"
  Write-Host $line
  Add-Content -Path $LogFile -Value $line
 emphasized
}

# Vérification admin
if (-not ([Security.Principal.WindowsPrincipal] `
  [Security.Principal.WindowsIdentity]::GetCurrent() `
  ).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  Write-Host "[ERROR] Lancer PowerShell en administrateur"
  exit 1
}

Log "INFO" "Début du hardening Windows Server"

# ===============================
# 1. PARE-FEU WINDOWS
# ===============================
Log "INFO" "Activation du pare-feu Windows"
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True
Log "OK" "Pare-feu activé sur tous les profils"

# ===============================
# 2. SERVICES INUTILES
# ===============================
$servicesToDisable = @(
  "Fax",
  "XblGameSave",
  "XboxNetApiSvc",
  "Spooler"
)

foreach ($svc in $servicesToDisable) {
  $service = Get-Service -Name $svc -ErrorAction SilentlyContinue
  if ($service) {
    Stop-Service -Name $svc -Force -ErrorAction SilentlyContinue
    Set-Service -Name $svc -StartupType Disabled
    Log "OK" "Service désactivé : $svc"
  }
}

# ===============================
# 3. SÉCURISATION RDP
# ===============================
Log "INFO" "Sécurisation RDP"
Set-ItemProperty `
  -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server" `
  -Name "fDenyTSConnections" -Value 0

Set-ItemProperty `
  -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" `
  -Name "UserAuthentication" -Value 1

Log "OK" "RDP sécurisé (NLA activé)"

# ===============================
# 4. AUDIT DE SÉCURITÉ
# ===============================
Log "INFO" "Activation de laudit de sécurité"
auditpol /set /subcategory:"Logon" /success:enable /failure:enable | Out-Null
auditpol /set /subcategory:"Account Lockout" /success:enable /failure:enable | Out-Null
Log "OK" "Audit activé (logon / verrouillage)"

# ===============================
# 5. POLITIQUE MOT DE PASSE (LOCAL)
# ===============================
secedit /export /cfg C:\Windows\Temp\secpol.cfg | Out-Null
(Get-Content C:\Windows\Temp\secpol.cfg) `
  -replace "MinimumPasswordLength = \d+", "MinimumPasswordLength = 12" `
  -replace "PasswordComplexity = \d+", "PasswordComplexity = 1" |
  Set-Content C:\Windows\Temp\secpol.cfg

secedit /configure /db secedit.sdb /cfg C:\Windows\Temp\secpol.cfg /areas SECURITYPOLICY | Out-Null
Log "OK" "Politique mot de passe renforcée"

# ===============================
# FIN
# ===============================
Log "INFO" "Hardening terminé"
