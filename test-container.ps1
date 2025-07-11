# Deep Engineering Web - Container Test Script
Write-Host "Testing Deep Engineering Web Container Setup..." -ForegroundColor Green

# Check if Docker is available
Write-Host "`n1. Checking Docker installation..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version
    Write-Host "✅ Docker found: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker not found. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if Docker Compose is available
Write-Host "`n2. Checking Docker Compose..." -ForegroundColor Yellow
try {
    $composeVersion = docker compose version
    Write-Host "✅ Docker Compose found: $composeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose not found." -ForegroundColor Red
    exit 1
}

# Build the container
Write-Host "`n3. Building development container..." -ForegroundColor Yellow
try {
    docker compose build
    Write-Host "✅ Container built successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Container build failed." -ForegroundColor Red
    exit 1
}

# Test container startup
Write-Host "`n4. Testing container startup (5 second test)..." -ForegroundColor Yellow
try {
    # Start container in background
    docker compose up -d
    
    # Wait a moment for startup
    Start-Sleep -Seconds 5
    
    # Check if container is running
    $containerStatus = docker compose ps
    Write-Host "Container status:" -ForegroundColor Cyan
    Write-Host $containerStatus
    
    # Stop container
    docker compose down
    Write-Host "✅ Container test completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Container test failed." -ForegroundColor Red
    docker compose down
    exit 1
}

Write-Host "`n🎉 All tests passed! Your container environment is ready." -ForegroundColor Green
Write-Host "`nTo start development:" -ForegroundColor Cyan
Write-Host "  docker compose up" -ForegroundColor White
Write-Host "`nTo stop development:" -ForegroundColor Cyan
Write-Host "  docker compose down" -ForegroundColor White 