param(
    [Parameter(Mandatory = $true)]
    [string]$SiteName,

    [Parameter(Mandatory = $true)]
    [string]$PhysicalPath,

    [int]$Port = 80,
    [string]$HostHeader = "",
    [string]$AppPoolName = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not $AppPoolName) {
    $AppPoolName = $SiteName
}

Install-WindowsFeature -Name Web-Server -IncludeManagementTools
Import-Module WebAdministration

if (-not (Test-Path -LiteralPath $PhysicalPath)) {
    New-Item -ItemType Directory -Path $PhysicalPath -Force | Out-Null
}

if (-not (Test-Path -LiteralPath "IIS:\\AppPools\\$AppPoolName")) {
    New-WebAppPool -Name $AppPoolName | Out-Null
}

if (-not (Test-Path -LiteralPath "IIS:\\Sites\\$SiteName")) {
    New-Website `
        -Name $SiteName `
        -Port $Port `
        -HostHeader $HostHeader `
        -PhysicalPath $PhysicalPath `
        -ApplicationPool $AppPoolName | Out-Null
}

Start-Website -Name $SiteName
