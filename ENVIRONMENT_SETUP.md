# Environment Setup Guide

## Overview
This project uses environment variables for configuration, particularly for Sanity CMS integration. The development server will run with mock data if environment variables are not set, but for full functionality, you'll need to configure them.

## Required Environment Variables

### For Development (Optional)
The development server will run with mock data if these are not set:

```bash
# Sanity CMS Configuration
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### For Production (Required)
```bash
# Sanity CMS Configuration
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Analytics (Optional but recommended)
NEXT_PUBLIC_GA_ID=your_google_analytics_id_here

# Error Tracking (Optional but recommended)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
```

## Setting Up Environment Variables

### 1. Create Environment File
Copy the example file and rename it:
```bash
cp env.example .env.local
```

### 2. Configure Sanity CMS
1. Go to [sanity.io](https://sanity.io) and create a new project
2. Get your project ID from the project settings
3. Create an API token with read permissions
4. Update your `.env.local` file with the real values

### 3. Configure Analytics (Optional)
1. Set up Google Analytics 4
2. Get your measurement ID (format: G-XXXXXXXXXX)
3. Add it to `NEXT_PUBLIC_GA_ID`

### 4. Configure Error Tracking (Optional)
1. Set up Sentry for error tracking
2. Get your DSN from Sentry project settings
3. Add it to `NEXT_PUBLIC_SENTRY_DSN`

## Development vs Production

### Development Mode
- Server runs with mock data if Sanity is not configured
- No errors are thrown for missing environment variables
- Perfect for frontend development and testing

### Production Mode
- All required environment variables must be set
- Sanity CMS integration is fully functional
- Analytics and error tracking are active

## Troubleshooting

### Server Won't Start
- Check that all required environment variables are set
- Ensure `.env.local` file exists in the project root
- Verify Sanity project ID and API token are correct

### No Data Loading
- Verify Sanity project ID and dataset name
- Check API token permissions
- Ensure content exists in your Sanity studio

### Analytics Not Working
- Verify `NEXT_PUBLIC_GA_ID` is set correctly
- Check browser console for any errors
- Ensure the measurement ID starts with "G-"

## Security Notes
- Never commit `.env.local` to version control
- Use different API tokens for development and production
- Regularly rotate your API tokens
- Use environment-specific datasets in Sanity 