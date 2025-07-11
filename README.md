# Deep Engineering Web

This repository contains the marketing website for **Deep Engineering** built with Next.js, Tailwind CSS and Sanity CMS.

## Quick Start (Dev Container)

```bash
# Build container once
docker compose build

# Start development server (hot-reload)
docker compose up
```

The app will be available at http://localhost:3000.

### Prerequisites
* Node.js ≥ 20 (if running outside the container)
* Docker Desktop or compatible runtime
* Git + SSH configured to access this repo

### Dev Container / Codespaces
If you use VS Code with the *Dev Containers* extension (or GitHub Codespaces), simply open the folder and VS Code will prompt to reopen in the container defined in `.devcontainer/devcontainer.json`.

### Environment Variables
Create `.env.local` at project root:

```
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_TOKEN=
```

Add additional variables as the project grows. 