param(
    [string]$ReportDirectory = "C:\Reports\gpo-baseline",
    [switch]$BackupPolicies,
    [string]$BackupDirectory = "C:\Reports\gpo-baseline\backups"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Ensure-Directory {
    param([Parameter(Mandatory = $true)][string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Get-DomainTargets {
    Import-Module ActiveDirectory -ErrorAction Stop
    $domain = Get-ADDomain
    $targets = @(
        [pscustomobject]@{
            Name = $domain.DNSRoot
            DistinguishedName = $domain.DistinguishedName
            Type = "Domain"
        }
    )

    $targets += Get-ADOrganizationalUnit -Filter * |
        Sort-Object DistinguishedName |
        ForEach-Object {
            [pscustomobject]@{
                Name = $_.Name
                DistinguishedName = $_.DistinguishedName
                Type = "OU"
            }
        }

    return $targets
}

function Get-GpoLinksIndex {
    Import-Module GroupPolicy -ErrorAction Stop
    $links = @{}

    foreach ($target in Get-DomainTargets) {
        try {
            $inheritance = Get-GPInheritance -Target $target.DistinguishedName
            foreach ($gpoLink in $inheritance.GpoLinks) {
                if (-not $links.ContainsKey($gpoLink.DisplayName)) {
                    $links[$gpoLink.DisplayName] = @()
                }

                $links[$gpoLink.DisplayName] += [pscustomobject]@{
                    TargetName = $target.Name
                    TargetType = $target.Type
                    DistinguishedName = $target.DistinguishedName
                    Enabled = $gpoLink.Enabled
                    Enforced = $gpoLink.Enforced
                    Order = $gpoLink.Order
                }
            }
        } catch {
            Write-Warning "Impossible de lire l'heritage GPO pour $($target.DistinguishedName): $($_.Exception.Message)"
        }
    }

    return $links
}

Ensure-Directory -Path $ReportDirectory
if ($BackupPolicies) {
    Ensure-Directory -Path $BackupDirectory
}

Import-Module GroupPolicy -ErrorAction Stop
$domainName = (Get-ADDomain).DNSRoot
$gpoLinks = Get-GpoLinksIndex

$gpos = Get-GPO -All | Sort-Object DisplayName | ForEach-Object {
    $linkedTargets = @($gpoLinks[$_.DisplayName])
    if ($BackupPolicies) {
        Backup-GPO -Guid $_.Id -Path $BackupDirectory | Out-Null
    }

    [pscustomobject]@{
        DisplayName = $_.DisplayName
        Id = $_.Id
        DomainName = $_.DomainName
        Owner = $_.Owner
        CreationTime = $_.CreationTime
        ModificationTime = $_.ModificationTime
        GpoStatus = $_.GpoStatus
        ComputerEnabled = $_.GpoStatus -ne "UserSettingsDisabled"
        UserEnabled = $_.GpoStatus -ne "ComputerSettingsDisabled"
        WmiFilter = if ($_.WmiFilter) { $_.WmiFilter.Name } else { "" }
        LinkCount = $linkedTargets.Count
        Links = $linkedTargets
    }
}

$summary = [ordered]@{
    GeneratedAt = (Get-Date).ToString("s")
    DomainName = $domainName
    GpoCount = @($gpos).Count
    LinkedPolicies = (@($gpos | Where-Object { $_.LinkCount -gt 0 })).Count
    UnlinkedPolicies = (@($gpos | Where-Object { $_.LinkCount -eq 0 })).Count
    Policies = $gpos
}

$jsonPath = Join-Path $ReportDirectory "gpo-baseline.json"
$csvPath = Join-Path $ReportDirectory "gpo-baseline.csv"
$htmlPath = Join-Path $ReportDirectory "gpo-baseline.html"

$summary | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $jsonPath -Encoding UTF8
$gpos | Select-Object DisplayName, GpoStatus, Owner, CreationTime, ModificationTime, LinkCount, WmiFilter |
    Export-Csv -LiteralPath $csvPath -NoTypeInformation -Encoding UTF8

$rows = foreach ($gpo in $gpos) {
    $links = if ($gpo.Links.Count) {
        ($gpo.Links | ForEach-Object { "$($_.TargetType): $($_.TargetName) (ordre $($_.Order))" }) -join "<br>"
    } else {
        "Aucun lien"
    }

    @"
<tr>
  <td>$($gpo.DisplayName)</td>
  <td>$($gpo.GpoStatus)</td>
  <td>$($gpo.Owner)</td>
  <td>$($gpo.LinkCount)</td>
  <td>$links</td>
  <td>$($gpo.ModificationTime)</td>
</tr>
"@
}

$html = @"
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Rapport GPO</title>
  <style>
    body { font-family: Segoe UI, Arial, sans-serif; margin: 24px; color: #0f172a; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    th, td { border: 1px solid #cbd5e1; padding: 10px; vertical-align: top; text-align: left; }
    th { background: #e2e8f0; }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 18px; }
    .card { border: 1px solid #cbd5e1; border-radius: 14px; padding: 16px; background: #f8fafc; }
  </style>
</head>
<body>
  <h1>Rapport GPO - $domainName</h1>
  <p>Genere le $((Get-Date).ToString("dd/MM/yyyy HH:mm"))</p>
  <div class="grid">
    <div class="card"><strong>Nombre de GPO</strong><br>$(@($gpos).Count)</div>
    <div class="card"><strong>GPO liees</strong><br>$((@($gpos | Where-Object { $_.LinkCount -gt 0 })).Count)</div>
    <div class="card"><strong>GPO sans lien</strong><br>$((@($gpos | Where-Object { $_.LinkCount -eq 0 })).Count)</div>
  </div>
  <table>
    <thead>
      <tr>
        <th>GPO</th>
        <th>Etat</th>
        <th>Owner</th>
        <th>Liens</th>
        <th>Cibles</th>
        <th>Derniere modification</th>
      </tr>
    </thead>
    <tbody>
      $($rows -join "`n")
    </tbody>
  </table>
</body>
</html>
"@

$html | Set-Content -LiteralPath $htmlPath -Encoding UTF8

[pscustomobject]@{
    Status = "OK"
    Domain = $domainName
    JsonReport = $jsonPath
    CsvReport = $csvPath
    HtmlReport = $htmlPath
    BackupDirectory = if ($BackupPolicies) { $BackupDirectory } else { "" }
}
