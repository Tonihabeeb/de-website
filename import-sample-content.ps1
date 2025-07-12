# Import sample content into Sanity Studio
Write-Host "📥 Importing sample content into Sanity Studio..." -ForegroundColor Green

# Create sample content JSON
$sampleProjects = @'
[
  {
    "_type": "project",
    "name": "Erbil KPP Power Plant",
    "slug": {
      "_type": "slug",
      "current": "erbil-kpp-power-plant"
    },
    "status": "in-progress",
    "capacityMW": 50,
    "location": "Erbil, Kurdistan Region",
    "description": "A 50MW KPP power plant serving the Erbil metropolitan area with clean, sustainable energy.",
    "publishedAt": "2024-01-15T00:00:00.000Z"
  },
  {
    "_type": "project",
    "name": "Basra Industrial Complex",
    "slug": {
      "_type": "slug",
      "current": "basra-industrial-complex"
    },
    "status": "planning",
    "capacityMW": 100,
    "location": "Basra, Iraq",
    "description": "Large-scale KPP installation for industrial energy needs in the Basra region.",
    "publishedAt": "2024-01-10T00:00:00.000Z"
  }
]
'@

$sampleTeamMembers = @'
[
  {
    "_type": "teamMember",
    "name": "Eng. Ranj Sherko",
    "role": "Managing Partner",
    "bio": "Leading Deep Engineering's mission to revolutionize Iraq's energy landscape with innovative KPP technology.",
    "expertise": "Renewable Energy, Project Management",
    "order": 1
  },
  {
    "_type": "teamMember",
    "name": "Dr. Ahmed Hassan",
    "role": "Technical Director",
    "bio": "Overseeing the technical implementation of KPP projects and ensuring optimal performance across all installations.",
    "expertise": "Mechanical Engineering, KPP Technology",
    "order": 2
  }
]
'@

# Save sample content to files
$sampleProjects | Out-File -FilePath "sample-projects.json" -Encoding UTF8
$sampleTeamMembers | Out-File -FilePath "sample-team-members.json" -Encoding UTF8

Write-Host "✅ Sample content files created!" -ForegroundColor Green
Write-Host "`n📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Open Sanity Studio at http://localhost:3333" -ForegroundColor White
Write-Host "2. Go to Projects and Team Members sections" -ForegroundColor White
Write-Host "3. Add the sample content manually or use the CLI:" -ForegroundColor White
Write-Host "   cd studio" -ForegroundColor White
Write-Host "   npx sanity dataset import ../sample-projects.json production" -ForegroundColor White
Write-Host "   npx sanity dataset import ../sample-team-members.json production" -ForegroundColor White
Write-Host "4. Visit http://localhost:3000/cms-test to see the content" -ForegroundColor White 