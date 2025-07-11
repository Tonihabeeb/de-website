# Deep Engineering Web - Push to GitHub
Write-Host "Pushing code to GitHub repository..." -ForegroundColor Green

# Get the GitHub username
$githubUser = Read-Host "Enter your GitHub username"

if (-not $githubUser) {
    Write-Host "❌ GitHub username is required" -ForegroundColor Red
    exit 1
}

# Add remote origin
Write-Host "`n1. Adding remote origin..." -ForegroundColor Yellow
$remoteUrl = "git@github.com:$githubUser/deep-engineering-web.git"
git remote add origin $remoteUrl

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote origin added" -ForegroundColor Green
} else {
    Write-Host "⚠️  Remote may already exist, continuing..." -ForegroundColor Yellow
}

# Push to GitHub
Write-Host "`n2. Pushing code to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Code pushed successfully!" -ForegroundColor Green
    Write-Host "`n🎉 Repository setup complete!" -ForegroundColor Green
    Write-Host "   View your repository at: https://github.com/$githubUser/deep-engineering-web" -ForegroundColor Cyan
} else {
    Write-Host "❌ Push failed. Check your SSH key and repository setup." -ForegroundColor Red
} 