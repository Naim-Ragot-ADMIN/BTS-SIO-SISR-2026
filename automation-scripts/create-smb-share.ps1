param(
    [Parameter(Mandatory = $true)]
    [string]$ShareName,

    [Parameter(Mandatory = $true)]
    [string]$Path,

    [string[]]$FullAccess = @(),
    [string[]]$ChangeAccess = @(),
    [string[]]$ReadAccess = @(),
    [string]$Description = "Partage cree par NJR Solutions"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
}

if (Get-SmbShare -Name $ShareName -ErrorAction SilentlyContinue) {
    Write-Host "Le partage $ShareName existe deja." -ForegroundColor Yellow
    exit 0
}

$params = @{
    Name        = $ShareName
    Path        = $Path
    Description = $Description
}

if ($FullAccess.Count) { $params.FullAccess = $FullAccess }
if ($ChangeAccess.Count) { $params.ChangeAccess = $ChangeAccess }
if ($ReadAccess.Count) { $params.ReadAccess = $ReadAccess }

New-SmbShare @params | Out-Null

$acl = Get-Acl -LiteralPath $Path
foreach ($identity in $FullAccess) {
    $rule = New-Object System.Security.AccessControl.FileSystemAccessRule($identity, "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
    $acl.SetAccessRule($rule)
}
foreach ($identity in $ChangeAccess) {
    $rule = New-Object System.Security.AccessControl.FileSystemAccessRule($identity, "Modify", "ContainerInherit,ObjectInherit", "None", "Allow")
    $acl.SetAccessRule($rule)
}
foreach ($identity in $ReadAccess) {
    $rule = New-Object System.Security.AccessControl.FileSystemAccessRule($identity, "ReadAndExecute", "ContainerInherit,ObjectInherit", "None", "Allow")
    $acl.SetAccessRule($rule)
}
Set-Acl -LiteralPath $Path -AclObject $acl

Write-Host "Partage SMB $ShareName cree sur $Path." -ForegroundColor Green
