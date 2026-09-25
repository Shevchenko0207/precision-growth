$ErrorActionPreference = "Stop"
Set-Location "C:\Users\Игорь\.gemini\antigravity\scratch\precision-growth"
Start-Process -FilePath "npm.cmd" -ArgumentList "install", "--no-fund", "--no-audit" -NoNewWindow -Wait
