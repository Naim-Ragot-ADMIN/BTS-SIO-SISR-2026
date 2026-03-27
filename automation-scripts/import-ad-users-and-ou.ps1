param(
    [Parameter(Mandatory = $true)]
    [string]$CsvPath,

    [Parameter(Mandatory = $true)]
    [string]$RootDN,

    [Parameter(Mandatory = $true)]
    [securestring]$DefaultPassword
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Import-Module ActiveDirectory

if (-not (Test-Path -LiteralPath $CsvPath)) {
    throw "Fichier CSV introuvable: $CsvPath"
}

$users = Import-Csv -LiteralPath $CsvPath

foreach ($user in $users) {
    $ouName = if ($user.OU) { $user.OU.Trim() } else { "Utilisateurs" }
    $ouDn = "OU=$ouName,$RootDN"
    $displayName = if ($user.DisplayName) { $user.DisplayName } else { "$($user.GivenName) $($user.Surname)" }

    if (-not (Get-ADOrganizationalUnit -LDAPFilter "(distinguishedName=$ouDn)" -ErrorAction SilentlyContinue)) {
        New-ADOrganizationalUnit -Name $ouName -Path $RootDN -ProtectedFromAccidentalDeletion $true | Out-Null
    }

    if (-not (Get-ADUser -Filter "SamAccountName -eq '$($user.SamAccountName)'" -ErrorAction SilentlyContinue)) {
        New-ADUser `
            -Name $displayName `
            -GivenName $user.GivenName `
            -Surname $user.Surname `
            -DisplayName $displayName `
            -SamAccountName $user.SamAccountName `
            -UserPrincipalName $user.UserPrincipalName `
            -Department $user.Department `
            -Title $user.Title `
            -Path $ouDn `
            -AccountPassword $DefaultPassword `
            -ChangePasswordAtLogon $true `
            -Enabled $true
    }

    if ($user.Group) {
        $groupName = $user.Group.Trim()
        $group = Get-ADGroup -Filter "Name -eq '$groupName'" -ErrorAction SilentlyContinue

        if (-not $group) {
            $group = New-ADGroup `
                -Name $groupName `
                -SamAccountName $groupName.Replace(" ", "") `
                -GroupScope Global `
                -GroupCategory Security `
                -Path $ouDn `
                -PassThru
        }

        Add-ADGroupMember -Identity $group.DistinguishedName -Members $user.SamAccountName -ErrorAction SilentlyContinue
    }
}
