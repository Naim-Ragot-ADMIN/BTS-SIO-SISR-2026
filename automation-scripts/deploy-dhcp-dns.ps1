param(
    [Parameter(Mandatory = $true)]
    [string]$ScopeName,

    [Parameter(Mandatory = $true)]
    [ipaddress]$StartRange,

    [Parameter(Mandatory = $true)]
    [ipaddress]$EndRange,

    [Parameter(Mandatory = $true)]
    [ipaddress]$SubnetMask,

    [Parameter(Mandatory = $true)]
    [ipaddress]$ScopeId,

    [Parameter(Mandatory = $true)]
    [ipaddress]$Router,

    [Parameter(Mandatory = $true)]
    [ipaddress[]]$DnsServers,

    [Parameter(Mandatory = $true)]
    [string]$DnsDomain,

    [string]$DnsZoneName = "",
    [switch]$CreateDnsZone
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Install-WindowsFeature -Name DHCP -IncludeManagementTools
Import-Module DhcpServer

netsh dhcp add securitygroups | Out-Null
Restart-Service -Name DHCPServer -Force

$fqdn = if ($env:USERDNSDOMAIN) { "$env:COMPUTERNAME.$env:USERDNSDOMAIN" } else { $env:COMPUTERNAME }
$serverIp = (Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object { $_.IPAddress -notlike "169.254*" -and $_.PrefixOrigin -ne "WellKnown" } |
    Select-Object -First 1 -ExpandProperty IPAddress)

if ($env:USERDNSDOMAIN -and $serverIp) {
    try {
        Add-DhcpServerInDC -DnsName $fqdn -IPAddress $serverIp | Out-Null
    } catch {
        Write-Warning "Autorisation DHCP ignoree: $($_.Exception.Message)"
    }
}

if (-not (Get-DhcpServerv4Scope -ScopeId $ScopeId.IPAddressToString -ErrorAction SilentlyContinue)) {
    Add-DhcpServerv4Scope `
        -Name $ScopeName `
        -StartRange $StartRange.IPAddressToString `
        -EndRange $EndRange.IPAddressToString `
        -SubnetMask $SubnetMask.IPAddressToString `
        -State Active | Out-Null
}

Set-DhcpServerv4OptionValue `
    -ScopeId $ScopeId.IPAddressToString `
    -DnsDomain $DnsDomain `
    -DnsServer ($DnsServers | ForEach-Object { $_.IPAddressToString }) `
    -Router $Router.IPAddressToString

if ($CreateDnsZone -and $DnsZoneName) {
    Import-Module DnsServer
    if (-not (Get-DnsServerZone -Name $DnsZoneName -ErrorAction SilentlyContinue)) {
        Add-DnsServerPrimaryZone -Name $DnsZoneName -ReplicationScope Forest | Out-Null
    }
}
