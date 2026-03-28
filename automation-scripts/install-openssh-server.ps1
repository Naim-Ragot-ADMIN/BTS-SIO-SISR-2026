param(
    [int]$Port = 22
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$capability = Get-WindowsCapability -Online | Where-Object { $_.Name -like "OpenSSH.Server*" }
if (-not $capability) {
    throw "Capacite OpenSSH.Server introuvable."
}

if ($capability.State -ne "Installed") {
    Add-WindowsCapability -Online -Name $capability.Name | Out-Null
}

Start-Service sshd
Set-Service -Name sshd -StartupType Automatic

$configPath = Join-Path $env:ProgramData "ssh\sshd_config"
if (Test-Path -LiteralPath $configPath) {
    $content = Get-Content -LiteralPath $configPath
    if ($content -match '^\s*#?\s*Port\s+') {
        $content = $content -replace '^\s*#?\s*Port\s+\d+', "Port $Port"
    } else {
        $content += "Port $Port"
    }
    Set-Content -LiteralPath $configPath -Value $content -Encoding ascii
    Restart-Service sshd
}

$ruleName = "OpenSSH Server (NJR)"
if (-not (Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue)) {
    New-NetFirewallRule -DisplayName $ruleName -Direction Inbound -Action Allow -Protocol TCP -LocalPort $Port | Out-Null
}

Write-Host "OpenSSH Server installe et ecoute sur le port $Port." -ForegroundColor Green
