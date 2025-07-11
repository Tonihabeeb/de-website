# Deep Engineering Web - GitHub Repository Setup
Write-Host "Setting up GitHub repository for Deep Engineering Web..." -ForegroundColor Green

# Check if git is configured
Write-Host "`n1. Checking Git configuration..." -ForegroundColor Yellow
$userName = git config --global user.name
$userEmail = git config --global user.email

if (-not $userName -or -not $userEmail) {
    Write-Host "❌ Git not configured. Please set up your identity:" -ForegroundColor Red
    Write-Host "   git config --global user.name 'Your Name'" -ForegroundColor Cyan
    Write-Host "   git config --global user.email 'your.email@example.com'" -ForegroundColor Cyan
    exit 1
} else {
    Write-Host "✅ Git configured: $userName <$userEmail>" -ForegroundColor Green
}

# Check SSH key
Write-Host "`n2. Checking SSH key..." -ForegroundColor Yellow
$sshKey = ssh-keygen -l -f ~/.ssh/id_ed25519 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ SSH key found" -ForegroundColor Green
} else {
    Write-Host "⚠️  SSH key not found. You may need to:" -ForegroundColor Yellow
    Write-Host "   ssh-keygen -t ed25519 -C '$userEmail'" -ForegroundColor Cyan
    Write-Host "   Then add the public key to GitHub: Settings > SSH and GPG keys" -ForegroundColor Cyan
}

# Instructions for GitHub repository creation
Write-Host "`n3. GitHub Repository Setup Instructions:" -ForegroundColor Yellow
Write-Host "   a) Go to https://github.com/new" -ForegroundColor Cyan
Write-Host "   b) Repository name: deep-engineering-web" -ForegroundColor Cyan
Write-Host "   c) Description: Deep Engineering marketing website built with Next.js" -ForegroundColor Cyan
Write-Host "   d) Make it Private" -ForegroundColor Cyan
Write-Host "   e) Don't initialize with README (we already have one)" -ForegroundColor Cyan
Write-Host "   f) Click 'Create repository'" -ForegroundColor Cyan

Write-Host "`n4. After creating the repository, run:" -ForegroundColor Yellow
Write-Host "   git remote add origin git@github.com:<your-username>/deep-engineering-web.git" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan

Write-Host "`n5. Optional: Set up branch protection rules:" -ForegroundColor Yellow
Write-Host "   - Go to Settings > Branches" -ForegroundColor Cyan
Write-Host "   - Add rule for 'main' branch" -ForegroundColor Cyan
Write-Host "   - Require pull request reviews" -ForegroundColor Cyan
Write-Host "   - Require status checks to pass" -ForegroundColor Cyan 