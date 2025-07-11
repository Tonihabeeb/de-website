# PowerShell script to install Node.js, Yarn, and Framer Motion on Windows
# Run this script in PowerShell as Administrator

Write-Host "Setting up development environment..." -ForegroundColor Green

# Function to download and install Node.js
function Install-NodeJS {
    Write-Host "Node.js is not installed. Downloading and installing Node.js..." -ForegroundColor Yellow
    
    # Create temp directory
    $tempDir = "$env:TEMP\nodejs-install"
    if (!(Test-Path $tempDir)) {
        New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
    }
    
    # Download Node.js installer
    $nodeVersion = "20.11.1"  # LTS version
    $nodeUrl = "https://nodejs.org/dist/v$nodeVersion/node-v$nodeVersion-x64.msi"
    $nodeInstaller = "$tempDir\node-installer.msi"
    
    Write-Host "Downloading Node.js v$nodeVersion..." -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstaller -UseBasicParsing
        Write-Host "Download completed!" -ForegroundColor Green
    } catch {
        Write-Host "Failed to download Node.js. Please check your internet connection." -ForegroundColor Red
        exit 1
    }
    
    # Install Node.js silently
    Write-Host "Installing Node.js..." -ForegroundColor Yellow
    try {
        Start-Process msiexec.exe -Wait -ArgumentList "/i `"$nodeInstaller`" /quiet /norestart"
        Write-Host "Node.js installed successfully!" -ForegroundColor Green
    } catch {
        Write-Host "Failed to install Node.js." -ForegroundColor Red
        exit 1
    }
    
    # Clean up installer
    Remove-Item $nodeInstaller -Force -ErrorAction SilentlyContinue
    
    # Refresh environment variables
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    # Wait a moment for installation to complete
    Start-Sleep -Seconds 5
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Install-NodeJS
    
    # Verify installation
    try {
        $nodeVersion = node --version
        Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
    } catch {
        Write-Host "Node.js installation failed. Please install manually from https://nodejs.org/" -ForegroundColor Red
        exit 1
    }
}

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "npm is not available. Please restart your terminal and run this script again." -ForegroundColor Red
    exit 1
}

# Check if Yarn is installed
try {
    $yarnVersion = yarn --version
    Write-Host "Yarn version: $yarnVersion" -ForegroundColor Green
} catch {
    Write-Host "Yarn is not installed. Installing Yarn..." -ForegroundColor Yellow
    try {
        npm install -g yarn
        Write-Host "Yarn installed successfully!" -ForegroundColor Green
    } catch {
        Write-Host "Failed to install Yarn. Please install it manually: npm install -g yarn" -ForegroundColor Red
        exit 1
    }
}

# Install project dependencies
Write-Host "Installing project dependencies..." -ForegroundColor Yellow
try {
    yarn install
    Write-Host "Project dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "Failed to install project dependencies." -ForegroundColor Red
    exit 1
}

# Install Framer Motion
Write-Host "Installing Framer Motion..." -ForegroundColor Yellow
try {
    yarn add framer-motion
    Write-Host "Framer Motion installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "Failed to install Framer Motion." -ForegroundColor Red
    exit 1
}

Write-Host "Installation completed successfully!" -ForegroundColor Green
Write-Host "You can now run: yarn dev" -ForegroundColor Cyan
Write-Host "Note: You may need to restart your terminal for all changes to take effect." -ForegroundColor Yellow 