<#
.SYNOPSIS
  Automatisation Active Directory via CSV

.DESCRIPTION
  Création dOU, groupes et utilisateurs AD depuis un fichier CSV.
  Script pédagogique BTS SIO SISR.

.PREREQUIS
  - Domaine Active Directory existant
  - Module ActiveDirectory installé
  - Droits administrateur AD
#>

param(
  [Parameter(Mandatory=$true)]
  [string]$CsvPath,

  [Parameter(Mandatory=$true)]
  [string]$DomainDN,

  [string]$DefaultOU = "OU=Users,OU=BTS",
  [string]$LogFile = ".\ad_bulk_create.log"
)

$ErrorActionPreference = "Stop"

function Log($Level, $Msg) {
  $line = "[$Level] $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $Msg"
  Write-Host $line
  Add-Content -Path $LogFile -Value $line
}

Import-Module ActiveDirectory
Log "INFO" "Module ActiveDirectory chargé"

$users = Import-Csv $CsvPath

foreach ($u in $users) {
  try {
    if (-not $u.SamAccountName) { continue }

    $ouDN = "$DefaultOU,$DomainDN"

    if (-not (Get-ADOrganizationalUnit -Filter "DistinguishedName -eq '$ouDN'" -ErrorAction SilentlyContinue)) {
      $ouName = ($DefaultOU -split ",")[0] -replace "OU=", ""
      $ouParent = $DomainDN
      New-ADOrganizationalUnit -Name $ouName -Path $ouParent
      Log "OK" "OU créée : $ouDN"
    }

    $groups = $u.Groups -split ";" | Where-Object { $_ -ne "" }

    foreach ($g in $groups) {
      if (-not (Get-ADGroup -Filter "Name -eq '$g'" -ErrorAction SilentlyContinue)) {
        New-ADGroup -Name $g -GroupScope Global -GroupCategory Security -Path $ouDN
        Log "OK" "Groupe créé : $g"
      }
    }

    if (-not (Get-ADUser -Filter "SamAccountName -eq '$($u.SamAccountName)'" -ErrorAction SilentlyContinue)) {
      $pwd = ConvertTo-SecureString $u.Password -AsPlainText -Force

      New-ADUser `
        -SamAccountName $u.SamAccountName `
        -GivenName $u.GivenName `
        -Surname $u.Surname `
        -DisplayName $u.DisplayName `
        -Path $ouDN `
        -AccountPassword $pwd `
        -Enabled $true `
        -ChangePasswordAtLogon $true

      Log "OK" "Utilisateur créé : $($u.SamAccountName)"
    }

    foreach ($g in $groups) {
      Add-ADGroupMember -Identity $g -Members $u.SamAccountName
      Log "OK" "Ajout $($u.SamAccountName) -> $g"
    }

  } catch {
    Log "ERROR" $_.Exception.Message
  }
}

Log "INFO" "Script terminé"
