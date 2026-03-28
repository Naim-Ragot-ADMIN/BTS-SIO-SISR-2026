param(
    [Parameter(Mandatory = $true)]
    [string]$DomainName,

    [Parameter(Mandatory = $true)]
    [securestring]$SafeModeAdministratorPassword,

    [Parameter(Mandatory = $true)]
    [ipaddress]$ScopeStart,

    [Parameter(Mandatory = $true)]
    [ipaddress]$ScopeEnd,

    [Parameter(Mandatory = $true)]
    [ipaddress]$SubnetMask,

    [Parameter(Mandatory = $true)]
    [ipaddress]$Router,

    [Parameter(Mandatory = $true)]
    [string]$DnsDomain,

    [string]$DomainNetbiosName = "",
    [string]$ScopeName = "LAN-SISR",
    [string]$ScopeDescription = "Scope cree automatiquement pour le lab BTS",
    [ipaddress[]]$DnsServers = @(),
    [string]$RootOU = "Lab",
    [string[]]$BaseOUs = @("Utilisateurs", "Serveurs", "Postes", "Groupes", "Admins"),
    [string]$ShareRoot = "C:\\Partages",
    [string]$LogPath = "C:\\Logs\\deploy-ad-lab-core.log",
    [switch]$SkipDhcp,
    [switch]$SkipShares,
    [switch]$NoRebootOnCompletion
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Log {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Message,
        [ValidateSet("INFO", "WARN", "ERROR")]
        [string]$Level = "INFO"
    )

    $line = "[{0}] [{1}] {2}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Level, $Message
    $directory = Split-Path -Path $LogPath -Parent
    if ($directory -and -not (Test-Path -LiteralPath $directory)) {
        New-Item -ItemType Directory -Path $directory -Force | Out-Null
    }
    Add-Content -LiteralPath $LogPath -Value $line
    switch ($Level) {
        "WARN" { Write-Host $line -ForegroundColor Yellow }
        "ERROR" { Write-Host $line -ForegroundColor Red }
        default { Write-Host $line -ForegroundColor Cyan }
    }
}

function Ensure-Feature {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$Name
    )

    $result = Install-WindowsFeature -Name $Name -IncludeManagementTools
    foreach ($item in $result.FeatureResult) {
        Write-Log "Role ou fonctionnalite verifie: $($item.Name) ($($item.Success))"
    }
}

function Ensure-DomainForest {
    $computer = Get-CimInstance -ClassName Win32_ComputerSystem
    if ($computer.PartOfDomain -and $computer.Domain -eq $DomainName) {
        Write-Log "La machine est deja membre du domaine $DomainName."
        return
    }

    Ensure-Feature -Name @("AD-Domain-Services", "DNS")
    Import-Module ADDSDeployment

    $forestParams = @{
        DomainName                    = $DomainName
        DomainNetbiosName             = $DomainNetbiosName
        SafeModeAdministratorPassword = $SafeModeAdministratorPassword
        InstallDns                    = $true
        CreateDnsDelegation           = $false
        NoRebootOnCompletion          = [bool]$NoRebootOnCompletion
        Force                         = $true
        Confirm                       = $false
    }

    Write-Log "Validation de la future foret AD DS."
    Test-ADDSForestInstallation @forestParams
    Write-Log "Creation de la foret Active Directory."
    Install-ADDSForest @forestParams
}

function Ensure-OrganizationalUnits {
    Import-Module ActiveDirectory
    $domainDn = (Get-ADDomain).DistinguishedName
    $rootDn = "OU=$RootOU,$domainDn"

    if (-not (Get-ADOrganizationalUnit -LDAPFilter "(distinguishedName=$rootDn)" -ErrorAction SilentlyContinue)) {
        Write-Log "Creation de l'OU racine $RootOU."
        New-ADOrganizationalUnit -Name $RootOU -Path $domainDn -ProtectedFromAccidentalDeletion $true | Out-Null
    }

    foreach ($ou in $BaseOUs) {
        $ouDn = "OU=$ou,$rootDn"
        if (-not (Get-ADOrganizationalUnit -LDAPFilter "(distinguishedName=$ouDn)" -ErrorAction SilentlyContinue)) {
            Write-Log "Creation de l'OU $ou."
            New-ADOrganizationalUnit -Name $ou -Path $rootDn -ProtectedFromAccidentalDeletion $true | Out-Null
        }
    }

    $groupsPath = "OU=Groupes,$rootDn"
    $groups = @(
        @{ Name = "GRP-Admins-Infra"; Scope = "Global"; Category = "Security" },
        @{ Name = "GRP-Utilisateurs-Lab"; Scope = "Global"; Category = "Security" },
        @{ Name = "GRP-Serveurs-Lecture"; Scope = "Global"; Category = "Security" }
    )

    foreach ($group in $groups) {
        if (-not (Get-ADGroup -Filter "Name -eq '$($group.Name)'" -ErrorAction SilentlyContinue)) {
            Write-Log "Creation du groupe AD $($group.Name)."
            New-ADGroup -Name $group.Name -GroupScope $group.Scope -GroupCategory $group.Category -Path $groupsPath | Out-Null
        }
    }
}

function Get-NetworkAddressString {
    param(
        [Parameter(Mandatory = $true)]
        [ipaddress]$Address,
        [Parameter(Mandatory = $true)]
        [ipaddress]$Mask
    )

    $addressBytes = $Address.GetAddressBytes()
    $maskBytes = $Mask.GetAddressBytes()
    $networkBytes = New-Object byte[] ($addressBytes.Length)

    for ($index = 0; $index -lt $addressBytes.Length; $index += 1) {
        $networkBytes[$index] = $addressBytes[$index] -band $maskBytes[$index]
    }

    return ([ipaddress]::new($networkBytes)).IPAddressToString
}

function Ensure-DhcpScope {
    if ($SkipDhcp) {
        Write-Log "Bloc DHCP ignore a la demande." "WARN"
        return
    }

    Ensure-Feature -Name @("DHCP")
    Import-Module DhcpServer

    netsh dhcp add securitygroups | Out-Null
    Restart-Service -Name DHCPServer -Force

    $scopeId = Get-NetworkAddressString -Address $ScopeStart -Mask $SubnetMask
    $scopeExisting = Get-DhcpServerv4Scope -ErrorAction SilentlyContinue | Where-Object { $_.Name -eq $ScopeName -or $_.ScopeId -eq $scopeId }

    if (-not $scopeExisting) {
        Write-Log "Creation du scope DHCP $ScopeName."
        Add-DhcpServerv4Scope -Name $ScopeName `
            -Description $ScopeDescription `
            -StartRange $ScopeStart.IPAddressToString `
            -EndRange $ScopeEnd.IPAddressToString `
            -SubnetMask $SubnetMask.IPAddressToString `
            -State Active | Out-Null
    } else {
        Write-Log "Le scope DHCP $ScopeName existe deja."
    }

    $dnsList = if ($DnsServers.Count) { $DnsServers } else { @([ipaddress](Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.PrefixOrigin -ne 'WellKnown'} | Select-Object -First 1 -ExpandProperty IPAddress)) }

    Set-DhcpServerv4OptionValue -ScopeId $scopeId `
        -DnsDomain $DnsDomain `
        -DnsServer ($dnsList | ForEach-Object { $_.IPAddressToString }) `
        -Router $Router.IPAddressToString

    Write-Log "Options DHCP configurees pour $ScopeName."
}

function Ensure-LabShares {
    if ($SkipShares) {
        Write-Log "Bloc partages ignore a la demande." "WARN"
        return
    }

    Import-Module SmbShare
    $folders = @(
        @{ Name = "Docs-Tech"; Share = "LAB-DOCS"; Full = @("Administrators", "GRP-Admins-Infra"); Read = @("GRP-Utilisateurs-Lab") },
        @{ Name = "Depot-Scripts"; Share = "LAB-SCRIPTS"; Full = @("Administrators", "GRP-Admins-Infra"); Read = @("GRP-Utilisateurs-Lab") }
    )

    foreach ($item in $folders) {
        $path = Join-Path $ShareRoot $item.Name
        if (-not (Test-Path -LiteralPath $path)) {
            New-Item -ItemType Directory -Path $path -Force | Out-Null
            Write-Log "Dossier cree: $path"
        }

        if (-not (Get-SmbShare -Name $item.Share -ErrorAction SilentlyContinue)) {
            New-SmbShare -Name $item.Share -Path $path -FullAccess $item.Full -ReadAccess $item.Read | Out-Null
            Write-Log "Partage SMB cree: $($item.Share)"
        }
    }
}

function Ensure-DnsForwarders {
    Import-Module DnsServer -ErrorAction Stop
    $existing = Get-DnsServerForwarder -ErrorAction SilentlyContinue
    if (-not $existing) {
        Write-Log "Ajout de forwarders DNS publics de base."
        Add-DnsServerForwarder -IPAddress 1.1.1.1,8.8.8.8 | Out-Null
    } else {
        Write-Log "Forwarders DNS deja presents."
    }
}

Write-Log "Demarrage de deploy-ad-lab-core."
Ensure-DomainForest
Import-Module ActiveDirectory
Ensure-OrganizationalUnits
Ensure-DnsForwarders
Ensure-DhcpScope
Ensure-LabShares
Write-Log "Le script deploy-ad-lab-core a termine son execution."
