@echo off
title AI Resume Bullet Enhancer
cd /d "%~dp0"
echo Starting AI Resume Bullet Enhancer...
echo.
echo Open http://127.0.0.1:3000 in your browser.
echo Keep this window open while using the app.
echo.
"C:\Program Files\nodejs\node.exe" "%~dp0node_modules\next\dist\bin\next" dev --hostname 127.0.0.1 --port 3000
echo.
echo The app stopped or could not start.
echo Press any key to close this window.
pause > nul
