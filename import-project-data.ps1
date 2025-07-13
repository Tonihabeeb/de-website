# Import Project Data to Sanity CMS
# This script helps import sample project data into Sanity CMS

Write-Host "Deep Engineering - Project Data Import Tool" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""

# Check if sample data file exists
$sampleDataFile = "sample-project-data.json"
if (-not (Test-Path $sampleDataFile)) {
    Write-Host "Error: $sampleDataFile not found!" -ForegroundColor Red
    Write-Host "Please ensure the sample data file exists in the current directory." -ForegroundColor Yellow
    exit 1
}

Write-Host "Found sample project data file: $sampleDataFile" -ForegroundColor Green
Write-Host ""

# Read the sample data
try {
    $projectData = Get-Content $sampleDataFile | ConvertFrom-Json
    Write-Host "Successfully loaded project data with $($projectData.projects.Count) projects" -ForegroundColor Green
} catch {
    Write-Host "Error reading JSON file: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Projects to be imported:" -ForegroundColor Yellow
foreach ($project in $projectData.projects) {
    Write-Host "  • $($project.name) ($($project.capacityMW)MW) - $($project.status)" -ForegroundColor White
}

Write-Host ""
Write-Host "Sanity Studio Import Instructions:" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Open Sanity Studio in your browser" -ForegroundColor White
Write-Host "2. Navigate to the 'Project' content type" -ForegroundColor White
Write-Host "3. Create new project entries using the data below" -ForegroundColor White
Write-Host ""

# Display formatted data for manual import
foreach ($project in $projectData.projects) {
    Write-Host "Project: $($project.name)" -ForegroundColor Green
    Write-Host "----------------------------------------" -ForegroundColor Green
    
    Write-Host "Basic Information:" -ForegroundColor Yellow
    Write-Host "  Name: $($project.name)" -ForegroundColor White
    Write-Host "  Slug: $($project.slug)" -ForegroundColor White
    Write-Host "  Status: $($project.status)" -ForegroundColor White
    Write-Host "  Capacity: $($project.capacityMW) MW" -ForegroundColor White
    Write-Host "  Location: $($project.location)" -ForegroundColor White
    Write-Host "  Type: $($project.type)" -ForegroundColor White
    Write-Host "  Timeline: $($project.timeline)" -ForegroundColor White
    
    Write-Host ""
    Write-Host "Description:" -ForegroundColor Yellow
    Write-Host "  $($project.description)" -ForegroundColor White
    
    Write-Host ""
    Write-Host "Partners:" -ForegroundColor Yellow
    foreach ($partner in $project.partners) {
        Write-Host "  • $partner" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "Construction Timeline:" -ForegroundColor Yellow
    Write-Host "  Start Date: $($project.constructionTimeline.startDate)" -ForegroundColor White
    Write-Host "  Expected Completion: $($project.constructionTimeline.expectedCompletion)" -ForegroundColor White
    Write-Host "  Current Phase: $($project.constructionTimeline.currentPhase)" -ForegroundColor White
    Write-Host "  Progress: $($project.constructionTimeline.progressPercentage)%" -ForegroundColor White
    
    Write-Host ""
    Write-Host "Site Details:" -ForegroundColor Yellow
    Write-Host "  Coordinates: $($project.siteDetails.coordinates)" -ForegroundColor White
    Write-Host "  Land Area: $($project.siteDetails.landArea) hectares" -ForegroundColor White
    Write-Host "  Grid Connection: $($project.siteDetails.gridConnection)" -ForegroundColor White
    Write-Host "  Accessibility: $($project.siteDetails.accessibility)" -ForegroundColor White
    
    Write-Host ""
    Write-Host "PPA Information:" -ForegroundColor Yellow
    Write-Host "  Status: $($project.ppaInformation.status)" -ForegroundColor White
    Write-Host "  Counterparty: $($project.ppaInformation.counterparty)" -ForegroundColor White
    Write-Host "  Duration: $($project.ppaInformation.duration) years" -ForegroundColor White
    Write-Host "  Tariff: $($project.ppaInformation.tariff) $/MWh" -ForegroundColor White
    
    Write-Host ""
    Write-Host "Government Endorsements:" -ForegroundColor Yellow
    foreach ($endorsement in $project.governmentEndorsements) {
        Write-Host "  • $($endorsement.ministry) - $($endorsement.endorsementType)" -ForegroundColor White
        Write-Host "    Date: $($endorsement.date)" -ForegroundColor Gray
        Write-Host "    Description: $($endorsement.description)" -ForegroundColor Gray
    }
    
    Write-Host ""
    Write-Host "Local Impact:" -ForegroundColor Yellow
    Write-Host "  Jobs Created: $($project.localImpact.jobsCreated)" -ForegroundColor White
    Write-Host "  Local Procurement: $($project.localImpact.localProcurement)%" -ForegroundColor White
    Write-Host "  Community Benefits:" -ForegroundColor White
    foreach ($benefit in $project.localImpact.communityBenefits) {
        Write-Host "    • $benefit" -ForegroundColor White
    }
    Write-Host "  Environmental Impact: $($project.localImpact.environmentalImpact)" -ForegroundColor White
    
    Write-Host ""
    Write-Host "Progress Updates:" -ForegroundColor Yellow
    foreach ($update in $project.progressUpdates) {
        Write-Host "  • $($update.title) ($($update.date))" -ForegroundColor White
        Write-Host "    $($update.description)" -ForegroundColor Gray
    }
    
    Write-Host ""
    Write-Host "=============================================" -ForegroundColor Green
    Write-Host ""
}

Write-Host "Import Process:" -ForegroundColor Cyan
Write-Host "===============" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Copy the data above for each project" -ForegroundColor White
Write-Host "2. In Sanity Studio, create a new 'Project' document" -ForegroundColor White
Write-Host "3. Fill in all the fields with the corresponding data" -ForegroundColor White
Write-Host "4. Save each project" -ForegroundColor White
Write-Host "5. Repeat for all 4 projects" -ForegroundColor White
Write-Host ""
Write-Host "Note: You may need to add images separately for the project image and gallery" -ForegroundColor Yellow
Write-Host ""

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 