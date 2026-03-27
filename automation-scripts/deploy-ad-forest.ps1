param(
    [Parameter(Mandatory = $true)]
    [string]$DomainName,

    [Parameter(Mandatory = $true)]
    [securestring]$SafeModeAdministratorPassword,

    [string]$DomainNetbiosName = "",
    [string]$DatabasePath = "C:\\Windows\\NTDS",
    [string]$LogPath = "C:\\Windows\\NTDS",
    [string]$SysvolPath = "C:\\Windows\\SYSVOL",
    [switch]$NoRebootOnCompletion
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
    [Security.Principal.WindowsBuiltInRole]::Administrator
)) {
    throw "Ce script doit etre lance dans une console PowerShell ouverte en administrateur."
}

if (-not $DomainNetbiosName) {
    $firstLabel = ($DomainName -split "\.")[0]
    $DomainNetbiosName = $firstLabel.Substring(0, [Math]::Min(15, $firstLabel.Length)).ToUpperInvariant()
}

Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
Import-Module ADDSDeployment

$commonParams = @{
    DomainName                     = $DomainName
    DomainNetbiosName              = $DomainNetbiosName
    SafeModeAdministratorPassword  = $SafeModeAdministratorPassword
    InstallDns                     = $true
    CreateDnsDelegation            = $false
    DatabasePath                   = $DatabasePath
    LogPath                        = $LogPath
    SysvolPath                     = $SysvolPath
}

if ($NoRebootOnCompletion) {
    $commonParams["NoRebootOnCompletion"] = $true
}

Write-Host "Validation des prerequis AD DS pour $DomainName..." -ForegroundColor Cyan
Test-ADDSForestInstallation @commonParams

Write-Host "Creation de la foret Active Directory..." -ForegroundColor Cyan
Install-ADDSForest @commonParams -Force:$true -Confirm:$false
