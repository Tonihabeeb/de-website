# PowerShell script to automate Sanity CMS setup for Next.js

# 1. Install Sanity client in the Next.js project
Write-Host "Installing @sanity/client in your Next.js project..."
npm install @sanity/client

# 2. Initialize Sanity Studio in a 'studio' subfolder
Write-Host "Initializing Sanity Studio in the 'studio' folder..."
npx sanity@latest init --project cgt1kxzl --dataset production --output-path studio --yes

# 3. Create/update .env.local with Sanity variables
$envFile = ".env.local"
if (-Not (Test-Path $envFile)) {
    Write-Host "Creating .env.local file..."
    New-Item -Path $envFile -ItemType File -Force
}
Write-Host "Adding Sanity environment variables to .env.local..."
Add-Content $envFile "SANITY_PROJECT_ID=cgt1kxzl"
Add-Content $envFile "SANITY_DATASET=production"
Add-Content $envFile "SANITY_API_TOKEN=your_token_with_read_rights"
Add-Content $envFile "NEXT_PUBLIC_VERCEL_ENV=development"

Write-Host "`nSanity CMS setup complete!"
Write-Host "Next steps:"
Write-Host "1. Open the 'studio' folder and run 'npm run dev' or 'sanity dev' to launch Sanity Studio."
Write-Host "2. Replace 'your_token_with_read_rights' in .env.local with your actual Sanity API token."
Write-Host "3. Customize your schemas in 'studio/schemas/'."
Write-Host "4. Connect your Next.js frontend to Sanity using the @sanity/client."