# Massachusetts Mini Golf - Quick Start Script

Write-Host "🎯 Starting Massachusetts Mini Golf Application..." -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB URI is set
if (-not $env:MONGODB_URI) {
    Write-Host "⚠️  Setting MongoDB URI from .env file..." -ForegroundColor Yellow
    $envContent = Get-Content "backend\.env" -Raw
    if ($envContent -match 'MONGODB_URI=(.+)') {
        $env:MONGODB_URI = $matches[1].Trim()
        Write-Host "✅ MongoDB URI configured" -ForegroundColor Green
    }
}

# Start Backend
Write-Host ""
Write-Host "🚀 Starting Backend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; `$env:MONGODB_URI='$env:MONGODB_URI'; npm start"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; `$env:NODE_OPTIONS='--openssl-legacy-provider'; `$env:SKIP_PREFLIGHT_CHECK='true'; npm start"

Write-Host ""
Write-Host "✅ Application starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "📍 Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "🔐 Admin:    http://localhost:3000/admin (admin:admin)" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to open the application in your browser..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Start-Process "http://localhost:3000"
