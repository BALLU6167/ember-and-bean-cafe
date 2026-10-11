@echo off
title Ember & Bean - Launch Website
echo ========================================================
echo   Starting Ember and Bean Roastery Website...
echo ========================================================
echo.

REM 1. If Python is available, start local HTTP server
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
  echo [Mode] Starting high-speed local web server...
  echo Opening browser at http://localhost:3000/dist/index.html
  start http://localhost:3000/dist/index.html
  python -m http.server 3000
  goto end
)

REM 2. Fallback: Launch standalone HTML directly
echo [Mode] Opening Ember & Bean directly in your browser...
start "" "Ember_and_Bean_Cafe.html"

:end
pause
