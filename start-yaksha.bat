@echo off
setlocal
cd /d "%~dp0"
echo =============================================
echo       YAKSHA - Sri Lankan Heritage Archive
echo =============================================
where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed.
  echo Install Node.js 18 or newer from https://nodejs.org/
  pause
  exit /b 1
)
if not exist ".env" (
  copy ".env.example" ".env" >nul
  echo Created .env from .env.example.
  echo IMPORTANT: Open .env and add your OpenAI API key, then run this file again.
  notepad .env
  pause
  exit /b 0
)
if not exist "node_modules" (
  echo Installing required packages...
  call npm install
  if errorlevel 1 (
    echo Package installation failed. Check your internet connection.
    pause
    exit /b 1
  )
)
start "YAKSHA Website" cmd /c "timeout /t 2 >nul & start http://localhost:3000"
call npm start
pause
