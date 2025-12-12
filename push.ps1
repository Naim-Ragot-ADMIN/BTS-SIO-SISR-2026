param([string]$Message='Update')
Set-Location $PSScriptRoot
git add .
git commit -m $Message
git push

