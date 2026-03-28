param(
    [string]$OutputDirectory = ".\\audit-windows",
    [string[]]$CriticalServices = @("LanmanServer", "Dnscache", "WinDefend", "wuauserv"),
    [int]$TopEvents = 50,
    [switch]$IncludeSecurityLog
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Ensure-Directory {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Get-DiskSnapshot {
    Get-CimInstance -ClassName Win32_LogicalDisk -Filter "DriveType=3" |
        Select-Object DeviceID, VolumeName,
            @{Name="SizeGB";Expression={ [math]::Round($_.Size / 1GB, 2) }},
            @{Name="FreeGB";Expression={ [math]::Round($_.FreeSpace / 1GB, 2) }},
            @{Name="FreePercent";Expression={
                if ($_.Size -gt 0) { [math]::Round(($_.FreeSpace / $_.Size) * 100, 2) } else { 0 }
            }}
}

function Get-ServiceSnapshot {
    param([string[]]$Names)
    foreach ($name in $Names) {
        $service = Get-Service -Name $name -ErrorAction SilentlyContinue
        if ($service) {
            [pscustomobject]@{
                Name        = $service.Name
                DisplayName = $service.DisplayName
                Status      = $service.Status
                StartType   = (Get-CimInstance Win32_Service -Filter "Name='$($service.Name)'" | Select-Object -ExpandProperty StartMode)
            }
        } else {
            [pscustomobject]@{
                Name        = $name
                DisplayName = $name
                Status      = "Missing"
                StartType   = "Unknown"
            }
        }
    }
}

function Get-NetworkSnapshot {
    Get-NetIPAddress -AddressFamily IPv4 |
        Where-Object { $_.IPAddress -notlike "169.254*" -and $_.IPAddress -ne "127.0.0.1" } |
        Select-Object InterfaceAlias, IPAddress, PrefixLength, AddressState
}

function Get-FirewallSnapshot {
    Get-NetFirewallProfile |
        Select-Object Name, Enabled, DefaultInboundAction, DefaultOutboundAction, LogBlocked, LogAllowed
}

function Get-ShareSnapshot {
    Get-SmbShare -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -notlike "*$" } |
        Select-Object Name, Path, Description, CurrentUsers
}

function Get-UpdateSnapshot {
    Get-HotFix |
        Sort-Object InstalledOn -Descending |
        Select-Object -First 15 HotFixID, InstalledOn, Description
}

function Get-EventSnapshot {
    param(
        [string]$LogName,
        [int]$MaxEvents = 20
    )

    Get-WinEvent -LogName $LogName -MaxEvents $MaxEvents |
        Select-Object TimeCreated, Id, LevelDisplayName, ProviderName, Message
}

function ConvertTo-HtmlSection {
    param(
        [string]$Title,
        [object]$Data
    )

    $html = $Data | ConvertTo-Html -Fragment
    return "<section><h2>$Title</h2>$html</section>"
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
Ensure-Directory -Path $OutputDirectory
$jsonPath = Join-Path $OutputDirectory "audit-$timestamp.json"
$htmlPath = Join-Path $OutputDirectory "audit-$timestamp.html"

$report = [ordered]@{
    GeneratedAt      = Get-Date
    ComputerName     = $env:COMPUTERNAME
    OperatingSystem  = (Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, BuildNumber, OSArchitecture)
    Bios             = (Get-CimInstance Win32_BIOS | Select-Object Manufacturer, SMBIOSBIOSVersion, ReleaseDate)
    ComputerSystem   = (Get-CimInstance Win32_ComputerSystem | Select-Object Manufacturer, Model, Domain, TotalPhysicalMemory)
    Disks            = Get-DiskSnapshot
    Network          = Get-NetworkSnapshot
    CriticalServices = Get-ServiceSnapshot -Names $CriticalServices
    FirewallProfiles = Get-FirewallSnapshot
    Shares           = Get-ShareSnapshot
    RecentUpdates    = Get-UpdateSnapshot
    SystemEvents     = Get-EventSnapshot -LogName "System" -MaxEvents $TopEvents
    ApplicationEvents= Get-EventSnapshot -LogName "Application" -MaxEvents $TopEvents
}

if ($IncludeSecurityLog) {
    $report.SecurityEvents = Get-EventSnapshot -LogName "Security" -MaxEvents $TopEvents
}

$report | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $jsonPath -Encoding UTF8

$sections = @(
    ConvertTo-HtmlSection -Title "Systeme" -Data @($report.OperatingSystem)
    ConvertTo-HtmlSection -Title "Machine" -Data @($report.ComputerSystem)
    ConvertTo-HtmlSection -Title "BIOS" -Data @($report.Bios)
    ConvertTo-HtmlSection -Title "Disques" -Data $report.Disks
    ConvertTo-HtmlSection -Title "Reseau" -Data $report.Network
    ConvertTo-HtmlSection -Title "Services critiques" -Data $report.CriticalServices
    ConvertTo-HtmlSection -Title "Pare-feu" -Data $report.FirewallProfiles
    ConvertTo-HtmlSection -Title "Partages" -Data $report.Shares
    ConvertTo-HtmlSection -Title "Mises a jour recentes" -Data $report.RecentUpdates
)

$htmlDocument = @"
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Audit Windows $($env:COMPUTERNAME)</title>
  <style>
    body { font-family: Segoe UI, Arial, sans-serif; margin: 32px; color: #0f172a; }
    h1, h2 { color: #0f172a; }
    table { border-collapse: collapse; width: 100%; margin: 14px 0 28px; }
    th, td { border: 1px solid #d6dbe3; padding: 8px 10px; vertical-align: top; }
    th { background: #f8fafc; text-align: left; }
    section { margin-bottom: 18px; }
    .notice { color: #475569; }
  </style>
</head>
<body>
  <h1>Audit Windows - $($env:COMPUTERNAME)</h1>
  <p class="notice">Genere le $(Get-Date -Format "dd/MM/yyyy HH:mm:ss")</p>
  $($sections -join "`n")
</body>
</html>
"@

Set-Content -LiteralPath $htmlPath -Value $htmlDocument -Encoding UTF8

Write-Host "Audit termine." -ForegroundColor Green
Write-Host "JSON : $jsonPath"
Write-Host "HTML : $htmlPath"
