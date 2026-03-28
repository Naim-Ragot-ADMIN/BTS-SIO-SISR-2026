param(
    [ValidateSet("Application", "System", "Security")]
    [string]$LogName = "System",
    [string]$OutputDirectory = ".\\exports-logs",
    [int]$MaxEvents = 500
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $OutputDirectory)) {
    New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$csvPath = Join-Path $OutputDirectory "$LogName-$timestamp.csv"

Get-WinEvent -LogName $LogName -MaxEvents $MaxEvents |
    Select-Object TimeCreated, Id, LevelDisplayName, ProviderName, Message |
    Export-Csv -LiteralPath $csvPath -NoTypeInformation -Encoding UTF8

Write-Host "Journal exporte vers $csvPath" -ForegroundColor Green
