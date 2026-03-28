param(
    [Parameter(Mandatory = $true)]
    [string]$DomainName,

    [Parameter(Mandatory = $true)]
    [pscredential]$Credential,

    [string]$ComputerName = "",
    [string]$OUPath = "",
    [switch]$Restart
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$computer = Get-CimInstance -ClassName Win32_ComputerSystem

if ($computer.PartOfDomain) {
    Write-Host "La machine fait deja partie du domaine $($computer.Domain)." -ForegroundColor Yellow
    exit 0
}

if ($ComputerName -and $env:COMPUTERNAME -ne $ComputerName) {
    Rename-Computer -NewName $ComputerName -Force
    Write-Host "Nom de machine prepare: $ComputerName" -ForegroundColor Cyan
}

$joinParams = @{
    DomainName = $DomainName
    Credential = $Credential
    Force      = $true
}

if ($OUPath) {
    $joinParams.OUPath = $OUPath
}

Add-Computer @joinParams
Write-Host "Machine jointe au domaine $DomainName." -ForegroundColor Green

if ($Restart) {
    Restart-Computer -Force
} else {
    Write-Host "Redemarrage recommande pour finaliser l'integration." -ForegroundColor Yellow
}
