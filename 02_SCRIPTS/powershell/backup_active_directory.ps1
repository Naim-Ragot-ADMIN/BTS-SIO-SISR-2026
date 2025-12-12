<#
.SYNOPSIS
  Sauvegarde Active Directory + État du système

.DESCRIPTION
  Script de sauvegarde pour contrôleur de domaine :
  - Sauvegarde de létat du système (AD, SYSVOL, registre)
  - Dossier horodaté
  - Nettoyage automatique des anciennes sauvegardes
  - Journalisation complète

.CONTEXT
  Projet BTS SIO SISR  Continuité de service

.WARNING
  À exécuter sur un contrôleur de domaine.
#>

$ErrorActionPreference = "Stop"

# ===============================
# VARIABLES
# ===============================
$BackupRoot = "C:\AD_Backups"
$RetentionDays = 14
$Date = Get-Date -Format "yyyy-MM-dd_HH-mm"
$BackupPath = "$BackupRoot\$Date"
$LogFile = "$BackupRoot\backup_ad.log"

function Log($Level, $Msg) {
  $line = "[$Level] $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $Msg"
  Write-Host $line
  Add-Content -Path $LogFile -Value $line
}

# ===============================
# VÉRIFICATION ADMIN
# ===============================
if (-not ([Security.Principal.WindowsPrincipal] `
  [Security.Principal.WindowsIdentity]::GetCurrent()
 ).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  Write-Host "[ERROR] Lancer PowerShell en administrateur"
  exit 1
}

Log "INFO" "Début sauvegarde Active Directory"

# ===============================
# CRÉATION DOSSIER BACKUP
# ===============================
New-Item -ItemType Directory -Force -Path $BackupPath | Out-Null
Log "OK" "Dossier de sauvegarde créé : $BackupPath"

# ===============================
# INSTALLATION WINDOWS BACKUP SI NÉCESSAIRE
# ===============================
if (-not (Get-WindowsFeature Windows-Server-Backup).Installed) {
  Install-WindowsFeature Windows-Server-Backup | Out-Null
  Log "OK" "Fonction Windows Server Backup installée"
}

# ===============================
# SAUVEGARDE ÉTAT DU SYSTÈME
# ===============================
Log "INFO" "Lancement sauvegarde état du système"
wbadmin start systemstatebackup `
  -backupTarget:$BackupPath `
  -quiet

Log "OK" "Sauvegarde état du système terminée"

# ===============================
# RÉTENTION DES SAUVEGARDES
# ===============================
Log "INFO" "Nettoyage des sauvegardes > $RetentionDays jours"

Get-ChildItem $BackupRoot -Directory |
  Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-$RetentionDays) } |
  ForEach-Object {
    Remove-Item $_.FullName -Recurse -Force
    Log "OK" "Ancienne sauvegarde supprimée : $($_.Name)"
  }

# ===============================
# FIN
# ===============================
Log "INFO" "Sauvegarde Active Directory terminée"
