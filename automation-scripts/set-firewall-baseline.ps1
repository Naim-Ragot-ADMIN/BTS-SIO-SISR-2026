param(
    [ValidateSet("Domain", "Private", "Public", "AllProfiles")]
    [string]$Profile = "Domain",
    [switch]$EnableWinRM,
    [switch]$EnableRdp
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$profiles = if ($Profile -eq "AllProfiles") { @("Domain", "Private", "Public") } else { @($Profile) }

Set-NetFirewallProfile -Name $profiles `
    -Enabled True `
    -DefaultInboundAction Block `
    -DefaultOutboundAction Allow `
    -NotifyOnListen True `
    -LogBlocked True `
    -LogAllowed True

if ($EnableWinRM) {
    Enable-NetFirewallRule -DisplayGroup "Windows Remote Management"
}

if ($EnableRdp) {
    Enable-NetFirewallRule -DisplayGroup "Remote Desktop"
}

Write-Host "Baseline pare-feu appliquee pour: $($profiles -join ', ')." -ForegroundColor Green
