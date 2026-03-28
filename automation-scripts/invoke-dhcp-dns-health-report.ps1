param(
    [string]$ReportDirectory = "C:\Reports\dhcp-dns-health",
    [string[]]$FocusZones = @(),
    [switch]$IncludeDnsRecords
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Ensure-Directory {
    param([Parameter(Mandatory = $true)][string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Get-ServiceStateSafe {
    param([Parameter(Mandatory = $true)][string]$Name)
    $service = Get-Service -Name $Name -ErrorAction SilentlyContinue
    if (-not $service) {
        return [pscustomobject]@{ Name = $Name; Status = "NotFound"; StartType = "" }
    }
    return [pscustomobject]@{
        Name = $service.Name
        Status = $service.Status
        StartType = (Get-CimInstance Win32_Service -Filter "Name='$Name'").StartMode
    }
}

Ensure-Directory -Path $ReportDirectory
Import-Module DnsServer -ErrorAction Stop
Import-Module DhcpServer -ErrorAction Stop

$dnsServer = $env:COMPUTERNAME
$services = @(
    Get-ServiceStateSafe -Name "DNS",
    Get-ServiceStateSafe -Name "DHCPServer"
)

$zones = Get-DnsServerZone -ComputerName $dnsServer | Sort-Object ZoneName | ForEach-Object {
    $recordCount = $null
    if ($IncludeDnsRecords -and (($FocusZones.Count -eq 0) -or ($FocusZones -contains $_.ZoneName))) {
        try {
            $recordCount = @(Get-DnsServerResourceRecord -ZoneName $_.ZoneName -ComputerName $dnsServer -ErrorAction Stop).Count
        } catch {
            $recordCount = -1
        }
    }

    [pscustomobject]@{
        ZoneName = $_.ZoneName
        ZoneType = $_.ZoneType
        IsDsIntegrated = $_.IsDsIntegrated
        IsReverseLookupZone = $_.IsReverseLookupZone
        IsPaused = $_.IsPaused
        RecordCount = $recordCount
    }
}

$forwarders = Get-DnsServerForwarder -ComputerName $dnsServer -ErrorAction SilentlyContinue | ForEach-Object {
    [pscustomobject]@{
        IPAddress = $_.IPAddress.IPAddressToString
        Timeout = $_.Timeout
        UseRootHint = $_.UseRootHint
    }
}

$scopes = Get-DhcpServerv4Scope | Sort-Object ScopeId | ForEach-Object {
    $stats = Get-DhcpServerv4ScopeStatistics -ScopeId $_.ScopeId -ErrorAction SilentlyContinue
    $options = Get-DhcpServerv4OptionValue -ScopeId $_.ScopeId -ErrorAction SilentlyContinue
    [pscustomobject]@{
        ScopeName = $_.Name
        ScopeId = $_.ScopeId.IPAddressToString
        StartRange = $_.StartRange.IPAddressToString
        EndRange = $_.EndRange.IPAddressToString
        State = $_.State
        InUse = if ($stats) { $stats.InUse } else { $null }
        Free = if ($stats) { $stats.Free } else { $null }
        PercentageInUse = if ($stats) { [math]::Round($stats.PercentageInUse, 2) } else { $null }
        DnsServers = if ($options) { ($options | Where-Object OptionId -eq 6 | ForEach-Object { $_.Value }) -join ", " } else { "" }
        Router = if ($options) { ($options | Where-Object OptionId -eq 3 | ForEach-Object { $_.Value }) -join ", " } else { "" }
        DnsDomain = if ($options) { ($options | Where-Object OptionId -eq 15 | ForEach-Object { $_.Value }) -join ", " } else { "" }
    }
}

$summary = [ordered]@{
    GeneratedAt = (Get-Date).ToString("s")
    Server = $dnsServer
    Services = $services
    DnsZones = $zones
    DnsForwarders = $forwarders
    DhcpScopes = $scopes
}

$jsonPath = Join-Path $ReportDirectory "dhcp-dns-health.json"
$htmlPath = Join-Path $ReportDirectory "dhcp-dns-health.html"
$csvPath = Join-Path $ReportDirectory "dhcp-scopes.csv"

$summary | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $jsonPath -Encoding UTF8
$scopes | Export-Csv -LiteralPath $csvPath -NoTypeInformation -Encoding UTF8

$serviceRows = foreach ($service in $services) {
    "<tr><td>$($service.Name)</td><td>$($service.Status)</td><td>$($service.StartType)</td></tr>"
}
$zoneRows = foreach ($zone in $zones) {
    "<tr><td>$($zone.ZoneName)</td><td>$($zone.ZoneType)</td><td>$($zone.IsDsIntegrated)</td><td>$($zone.IsReverseLookupZone)</td><td>$($zone.RecordCount)</td></tr>"
}
$scopeRows = foreach ($scope in $scopes) {
    "<tr><td>$($scope.ScopeName)</td><td>$($scope.ScopeId)</td><td>$($scope.State)</td><td>$($scope.PercentageInUse)</td><td>$($scope.DnsDomain)</td><td>$($scope.Router)</td></tr>"
}

$html = @"
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>DHCP DNS Health</title>
  <style>
    body { font-family: Segoe UI, Arial, sans-serif; margin: 24px; color: #0f172a; }
    table { width: 100%; border-collapse: collapse; margin-top: 18px; }
    th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
    th { background: #e2e8f0; }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin: 18px 0; }
    .card { border: 1px solid #cbd5e1; border-radius: 14px; padding: 16px; background: #f8fafc; }
  </style>
</head>
<body>
  <h1>DHCP / DNS Health Report - $dnsServer</h1>
  <p>Genere le $((Get-Date).ToString("dd/MM/yyyy HH:mm"))</p>
  <div class="grid">
    <div class="card"><strong>Services suivis</strong><br>$(@($services).Count)</div>
    <div class="card"><strong>Zones DNS</strong><br>$(@($zones).Count)</div>
    <div class="card"><strong>Scopes DHCP</strong><br>$(@($scopes).Count)</div>
  </div>
  <h2>Services</h2>
  <table><thead><tr><th>Service</th><th>Etat</th><th>Demarrage</th></tr></thead><tbody>$($serviceRows -join "")</tbody></table>
  <h2>Zones DNS</h2>
  <table><thead><tr><th>Zone</th><th>Type</th><th>AD</th><th>Reverse</th><th>Records</th></tr></thead><tbody>$($zoneRows -join "")</tbody></table>
  <h2>Scopes DHCP</h2>
  <table><thead><tr><th>Scope</th><th>ID</th><th>Etat</th><th>% utilise</th><th>Domaine DNS</th><th>Routeur</th></tr></thead><tbody>$($scopeRows -join "")</tbody></table>
</body>
</html>
"@

$html | Set-Content -LiteralPath $htmlPath -Encoding UTF8

[pscustomobject]@{
    Status = "OK"
    JsonReport = $jsonPath
    CsvReport = $csvPath
    HtmlReport = $htmlPath
}
