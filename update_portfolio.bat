@echo off
setlocal
cd /d "%~dp0"

git add .
set /p msg=Message de commit (laisse vide pour 'update portfolio'): 
if "%msg%"=="" set msg=update portfolio

git diff --cached --quiet
if %errorlevel%==0 (
  echo Aucun changement a valider.
) else (
  git commit -m "%msg%"
)

git pull --rebase
git push
pause
