Set-Location $PSScriptRoot
Write-Host "YAKSHA - Sri Lankan Heritage Archive" -ForegroundColor Cyan
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Install Node.js 18 or newer from https://nodejs.org/" -ForegroundColor Red
  Read-Host "Press Enter to exit"; exit 1
}
if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
  Write-Host "Created .env. Add your OpenAI API key, save, then run this script again." -ForegroundColor Yellow
  notepad .env
  Read-Host "Press Enter to exit"; exit 0
}
if (-not (Test-Path "node_modules")) { npm install; if ($LASTEXITCODE -ne 0) { Read-Host "Install failed. Press Enter"; exit 1 } }
Start-Process "http://localhost:3000"
npm start
