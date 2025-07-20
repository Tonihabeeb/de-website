# Frontend–Backend Integration Plan

## Overview
This document outlines the step-by-step process to fully integrate the Next.js frontend with the custom Node/Express backend, replacing all legacy Sanity code. It covers code cleanup, API utilities, authentication, data fetching, file uploads, error handling, SSR, and testing. The goal is a robust, maintainable, and scalable architecture.

---

## 1. Remove All Sanity References
- **Delete** all imports/usages of Sanity utilities (e.g., `@/lib/sanity`, `utils/sanity-data.ts`).
- **Refactor** components/pages that use Sanity to fetch data from the backend API instead.
- **Checklist:**
  - [x] Remove `sanity` imports from all files
  - [x] Delete unused Sanity utility files
  - [x] Refactor data fetching to use backend endpoints
  - [x] Remove Sanity dependencies from package.json
  - [x] Clean up legacy Sanity directories and scripts

---

## 2. Set Up API Utility
- **Create** `utils/api.ts` to centralize all HTTP requests to the backend.
- **Features:**
  - Handles base URL from `.env.local`
  - Attaches JWT token if present
  - Handles errors and parses JSON
- **Example:**
  ```ts
  // utils/api.ts
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
  export async function apiFetch<T>(path: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<T>;
  }
  ```

---

## 3. Configure Environment Variables
- **Add** to `.env.local` in the frontend root:
  ```
  NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
  ```

---

## 4. Implement Authentication Flow
- **Create** login and registration forms that POST to `/api/auth/login` and `/api/auth/register`.
- **On success:**
  - Store JWT token in `localStorage` (or cookies for extra security)
  - Use token for all authenticated requests
- **Protect** routes and show/hide UI based on authentication state and user role.

---

## 5. Refactor Data Fetching
- **For each page/component previously using Sanity:**
  - Replace with API calls to backend endpoints (e.g., `/api/documents`, `/api/dashboards/:type`)
  - Use `apiFetch` utility for all requests
- **Example:**
  ```ts
  // app/projects/page.tsx
  import { apiFetch } from '@/utils/api';
  export default async function ProjectsPage() {
    const { documents } = await apiFetch<{ documents: any[] }>('/api/documents?type=project');
    return <div>{documents.map(doc => <div key={doc._id}>{doc.title}</div>)}</div>;
  }
  ```

---

## 6. Implement File Uploads
- **Use** a form with `enctype="multipart/form-data"` and `fetch` or `axios` to POST files to `/api/documents`.
- **Attach** JWT token in the `Authorization` header.
- **Handle** upload progress and errors in the UI.

---

## 7. Error Handling & User Feedback
- **Show** clear error messages for failed requests (401, 403, 500, etc.)
- **Redirect** unauthenticated users to login
- **Handle** loading and empty states

---

## 8. Server-Side Rendering (SSR) & Static Generation (SSG)
- **For SSR/SSG pages:**
  - Use backend API in `getServerSideProps` or `getStaticProps`
  - Pass tokens via cookies if needed
- **Ensure** sensitive data is not exposed to the client

---

## 9. Testing the Integration
- **Test** all flows: login, registration, data fetching, file upload/download, dashboards, and role-based access
- **Use** browser dev tools to verify requests and responses
- **Write** frontend tests for API utilities and auth flows

---

## 10. Best Practices
- **Centralize** all API logic in one utility
- **Never** commit tokens or secrets to the repo
- **Use** environment variables for all URLs and secrets
- **Handle** all error cases gracefully in the UI
- **Document** all endpoints and flows for future devs

---

## Migration Checklist
- [x] Remove all Sanity code and imports
- [x] Set up API utility and environment variable
- [x] Refactor all data fetching to use backend API
- [x] Implement authentication and token storage
- [x] Implement file upload and download
- [x] Protect routes and handle roles
- [x] Add error handling and user feedback
- [x] Test all features end-to-end
- [x] Document integration for future maintenance

## Integration Verification
- [x] **Stage 1**: Sanity CMS completely removed
- [x] **Stage 2**: API utility with enhanced error handling
- [x] **Stage 3**: Authentication system with role-based access
- [x] **Stage 4**: Data fetching from backend API
- [x] **Stage 5**: Document management with upload/download
- [x] **Stage 6**: Comprehensive error handling and user feedback
- [x] **Stage 7**: Server-Side Rendering (SSR) & Static Generation (SSG)
- [x] **Stage 8**: Comprehensive testing suite with integration and E2E tests
- [x] **Stage 9**: Best practices and comprehensive documentation
- [x] **Integration Test Page**: `/integration-test` - Complete verification of all features

## Documentation Created
- [x] **API Documentation** (`docs/API_DOCUMENTATION.md`) - Complete API reference
- [x] **Development Guidelines** (`docs/DEVELOPMENT_GUIDELINES.md`) - Coding standards and best practices
- [x] **Integration Summary** (`docs/INTEGRATION_SUMMARY.md`) - Complete project overview
- [x] **Documentation README** (`docs/README.md`) - Documentation navigation and quick start

---

## References
- [Next.js Data Fetching](https://nextjs.org/docs/pages/building-your-application/data-fetching)
- [Express.js Backend Docs](https://expressjs.com/)
- [JWT Auth Best Practices](https://jwt.io/introduction/)

---

**This plan ensures a clean, maintainable, and scalable integration between your Next.js frontend and custom backend.** 