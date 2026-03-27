param(
  [string]$OutputDir = "dist"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

$publicFiles = @(
  "index.html",
  "entreprise.html",
  "devis_njr.html",
  "demande-informatique.html",
  "demande-nettoyage.html",
  "contact.html",
  "veille.html",
  "cv_naim.pdf"
)

$publicDirectories = @(
  "assets"
)

$distPath = Join-Path $PSScriptRoot $OutputDir
if (Test-Path $distPath) {
  Remove-Item -LiteralPath $distPath -Recurse -Force
}
New-Item -ItemType Directory -Path $distPath | Out-Null

foreach ($file in $publicFiles) {
  $sourcePath = Join-Path $PSScriptRoot $file
  if (Test-Path $sourcePath) {
    Copy-Item -LiteralPath $sourcePath -Destination (Join-Path $distPath $file) -Force
  }
}

foreach ($directory in $publicDirectories) {
  $sourcePath = Join-Path $PSScriptRoot $directory
  if (Test-Path $sourcePath) {
    Copy-Item -LiteralPath $sourcePath -Destination (Join-Path $distPath $directory) -Recurse -Force
  }
}

$htmlFiles = Get-ChildItem -LiteralPath $distPath -Filter *.html -File
foreach ($file in $htmlFiles) {
  $content = Get-Content -LiteralPath $file.FullName -Raw
  if ($content -notmatch 'data-access-mode="public"') {
    $content = [regex]::Replace($content, '<html([^>]*)>', '<html$1 data-access-mode="public">', 1)
  }
  Set-Content -LiteralPath $file.FullName -Value $content -Encoding UTF8
}

Copy-Item -LiteralPath (Join-Path $distPath "index.html") -Destination (Join-Path $distPath "404.html") -Force

Write-Host "Build public termine dans $distPath"
