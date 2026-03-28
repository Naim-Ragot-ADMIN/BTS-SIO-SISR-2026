param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("Create", "Disable", "Enable", "Unlock", "ResetPassword", "Export")]
    [string]$Action,

    [Parameter(Mandatory = $true)]
    [string]$CsvPath,

    [Parameter(Mandatory = $false)]
    [securestring]$Password,

    [string]$RootDN = "",
    [switch]$ForceChangePasswordAtLogon
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Import-Module ActiveDirectory
$rows = Import-Csv -LiteralPath $CsvPath

function Get-TargetUser {
    param([pscustomobject]$Row)

    if ($Row.SamAccountName) {
        return Get-ADUser -Filter "SamAccountName -eq '$($Row.SamAccountName)'" -Properties LockedOut, Enabled -ErrorAction SilentlyContinue
    }
    if ($Row.UserPrincipalName) {
        return Get-ADUser -Filter "UserPrincipalName -eq '$($Row.UserPrincipalName)'" -Properties LockedOut, Enabled -ErrorAction SilentlyContinue
    }
    return $null
}

function Ensure-Ou {
    param([string]$OuName)
    if (-not $RootDN -or -not $OuName) { return $RootDN }
    $ouDn = "OU=$OuName,$RootDN"
    if (-not (Get-ADOrganizationalUnit -LDAPFilter "(distinguishedName=$ouDn)" -ErrorAction SilentlyContinue)) {
        New-ADOrganizationalUnit -Name $OuName -Path $RootDN -ProtectedFromAccidentalDeletion $true | Out-Null
    }
    return $ouDn
}

foreach ($row in $rows) {
    $user = Get-TargetUser -Row $row

    switch ($Action) {
        "Create" {
            if ($user) {
                Write-Host "Utilisateur deja present: $($row.SamAccountName)" -ForegroundColor Yellow
                continue
            }

            if (-not $Password) {
                throw "Le parametre -Password est obligatoire pour l'action Create."
            }

            $ouPath = Ensure-Ou -OuName $row.OU
            $displayName = if ($row.DisplayName) { $row.DisplayName } else { "$($row.GivenName) $($row.Surname)" }

            $params = @{
                Name                  = $displayName
                GivenName             = $row.GivenName
                Surname               = $row.Surname
                DisplayName           = $displayName
                SamAccountName        = $row.SamAccountName
                UserPrincipalName     = $row.UserPrincipalName
                Department            = $row.Department
                Title                 = $row.Title
                Enabled               = $true
                AccountPassword       = $Password
                ChangePasswordAtLogon = [bool]$ForceChangePasswordAtLogon
            }
            if ($ouPath) { $params.Path = $ouPath }
            New-ADUser @params
            Write-Host "Utilisateur cree: $($row.SamAccountName)" -ForegroundColor Green
        }
        "Disable" {
            if ($user) {
                Disable-ADAccount -Identity $user
                Write-Host "Compte desactive: $($user.SamAccountName)" -ForegroundColor Green
            }
        }
        "Enable" {
            if ($user) {
                Enable-ADAccount -Identity $user
                Write-Host "Compte active: $($user.SamAccountName)" -ForegroundColor Green
            }
        }
        "Unlock" {
            if ($user -and $user.LockedOut) {
                Unlock-ADAccount -Identity $user
                Write-Host "Compte debloque: $($user.SamAccountName)" -ForegroundColor Green
            }
        }
        "ResetPassword" {
            if (-not $Password) {
                throw "Le parametre -Password est obligatoire pour l'action ResetPassword."
            }
            if ($user) {
                Set-ADAccountPassword -Identity $user -Reset -NewPassword $Password
                if ($ForceChangePasswordAtLogon) {
                    Set-ADUser -Identity $user -ChangePasswordAtLogon $true
                }
                Write-Host "Mot de passe reinitialise: $($user.SamAccountName)" -ForegroundColor Green
            }
        }
        "Export" {
            if ($user) {
                [pscustomobject]@{
                    SamAccountName    = $user.SamAccountName
                    UserPrincipalName = $user.UserPrincipalName
                    Enabled           = $user.Enabled
                    DistinguishedName = $user.DistinguishedName
                }
            }
        }
    }
}
