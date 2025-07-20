# API Documentation

## Overview
This document provides comprehensive documentation for the Deep Engineering backend API, including authentication, endpoints, error handling, and usage examples.

## Base URL
```
http://localhost:4000 (Development)
https://api.deepengineering.co (Production)
```

## Authentication
The API uses JWT (JSON Web Token) authentication. Include the token in the Authorization header for protected endpoints.

```http
Authorization: Bearer <your-jwt-token>
```

### Getting a Token
1. Register a new user: `POST /api/auth/register`
2. Login: `POST /api/auth/login`
3. Use the returned token in subsequent requests

---

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "user"
}
```

**Response (201):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - Invalid input data
- `409` - Email already exists

### Login User
**POST** `/api/auth/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` - Invalid credentials
- `401` - Authentication failed

### Get Current User
**GET** `/api/auth/me`

Get the current authenticated user's information.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- `401` - Invalid or missing token

---

## Document Management Endpoints

### List Documents
**GET** `/api/documents`

Get a list of documents with optional filtering.

**Query Parameters:**
- `type` (optional) - Filter by document type (project, team, technical, etc.)
- `category` (optional) - Filter by category
- `search` (optional) - Search in title and description
- `page` (optional) - Page number for pagination (default: 1)
- `limit` (optional) - Items per page (default: 10, max: 100)

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "documents": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Project Report",
      "description": "Detailed project analysis",
      "filename": "project-report.pdf",
      "size": 1048576,
      "type": "application/pdf",
      "category": "project",
      "location": "Iraq",
      "status": "completed",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### Get Single Document
**GET** `/api/documents/:id`

Get a specific document by ID.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "document": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Project Report",
    "description": "Detailed project analysis",
    "filename": "project-report.pdf",
    "size": 1048576,
    "type": "application/pdf",
    "category": "project",
    "location": "Iraq",
    "status": "completed",
    "capacityMW": 50,
    "partners": ["Partner A", "Partner B"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `404` - Document not found
- `401` - Unauthorized

### Upload Document
**POST** `/api/documents`

Upload a new document.

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `file` - The file to upload
- `title` - Document title
- `description` - Document description
- `category` - Document category
- `location` - Project location (optional)
- `status` - Project status (optional)
- `capacityMW` - Capacity in MW (optional)
- `partners` - Comma-separated list of partners (optional)

**Response (201):**
```json
{
  "document": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "New Project Report",
    "filename": "new-project-report.pdf",
    "size": 1048576,
    "type": "application/pdf",
    "category": "project",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid file or missing required fields
- `401` - Unauthorized
- `413` - File too large

### Download Document
**GET** `/api/documents/:id/download`

Download a document file.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```
Binary file content with appropriate Content-Type header
```

**Error Responses:**
- `404` - Document not found
- `401` - Unauthorized

### Update Document
**PUT** `/api/documents/:id`

Update document metadata (admin/editor only).

**Headers:**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Project Report",
  "description": "Updated description",
  "category": "project",
  "status": "in-progress"
}
```

**Response (200):**
```json
{
  "document": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Project Report",
    "description": "Updated description",
    "category": "project",
    "status": "in-progress",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Delete Document
**DELETE** `/api/documents/:id`

Delete a document (admin only).

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Document deleted successfully"
}
```

**Error Responses:**
- `404` - Document not found
- `401` - Unauthorized
- `403` - Insufficient permissions

---

## Dashboard Endpoints

### Get Financial Dashboard
**GET** `/api/dashboards/financial`

Get financial dashboard data (admin only).

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "revenue": 1500000,
  "expenses": 800000,
  "profit": 700000,
  "projects": [
    {
      "name": "Project A",
      "revenue": 500000,
      "expenses": 300000
    }
  ],
  "monthlyData": [
    {
      "month": "2024-01",
      "revenue": 100000,
      "expenses": 80000
    }
  ]
}
```

### Get Project Progress Dashboard
**GET** `/api/dashboards/project-progress`

Get project progress dashboard data.

**Headers:**
```http
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "totalProjects": 15,
  "completedProjects": 8,
  "inProgressProjects": 5,
  "plannedProjects": 2,
  "projects": [
    {
      "name": "Project A",
      "status": "completed",
      "progress": 100,
      "startDate": "2024-01-01",
      "endDate": "2024-06-01"
    }
  ]
}
```

---

## Error Handling

### Error Response Format
All error responses follow this format:

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": "Additional error details"
  }
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `413` - Payload Too Large
- `500` - Internal Server Error

### Error Codes
- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_FAILED` - Invalid credentials
- `UNAUTHORIZED` - Missing or invalid token
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `DUPLICATE_EMAIL` - Email already exists
- `FILE_TOO_LARGE` - Uploaded file exceeds size limit
- `INVALID_FILE_TYPE` - File type not allowed

---

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Authentication endpoints**: 5 requests per minute
- **Document endpoints**: 100 requests per minute
- **Dashboard endpoints**: 30 requests per minute

Rate limit headers are included in responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## File Upload Guidelines

### Supported File Types
- **Documents**: PDF, DOC, DOCX, TXT
- **Images**: JPG, JPEG, PNG, GIF
- **Spreadsheets**: XLS, XLSX, CSV
- **Presentations**: PPT, PPTX

### File Size Limits
- **Maximum file size**: 10MB
- **Recommended size**: Under 5MB for better performance

### Upload Best Practices
1. Compress large files before upload
2. Use appropriate file formats
3. Include descriptive filenames
4. Add relevant metadata (title, description, category)

---

## Pagination

List endpoints support pagination with the following parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

Response includes pagination metadata:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "pages": 15,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## Search and Filtering

### Text Search
Use the `search` parameter to search in document titles and descriptions:
```
GET /api/documents?search=project
```

### Category Filtering
Filter documents by category:
```
GET /api/documents?category=project
```

### Type Filtering
Filter documents by type:
```
GET /api/documents?type=project
```

### Combined Filters
Combine multiple filters:
```
GET /api/documents?category=project&search=renewable&page=1&limit=20
```

---

## SDK and Client Libraries

### JavaScript/TypeScript
```javascript
import { apiFetch } from '@/utils/api';

// Example usage
const documents = await apiFetch('/api/documents?type=project');
const user = await apiFetch('/api/auth/me');
```

### cURL Examples
```bash
# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Get documents
curl -X GET http://localhost:4000/api/documents \
  -H "Authorization: Bearer <token>"

# Upload document
curl -X POST http://localhost:4000/api/documents \
  -H "Authorization: Bearer <token>" \
  -F "file=@document.pdf" \
  -F "title=Project Report" \
  -F "category=project"
```

---

## Support

For API support and questions:
- **Email**: api-support@deepengineering.co
- **Documentation**: https://docs.deepengineering.co/api
- **Status Page**: https://status.deepengineering.co

---

**Last Updated**: January 2024
**Version**: 1.0.0 