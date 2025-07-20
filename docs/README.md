# Documentation

Welcome to the Deep Engineering project documentation. This directory contains comprehensive documentation for the frontend-backend integration project.

---

## 📚 Documentation Overview

### Core Documentation
- **[API Documentation](./API_DOCUMENTATION.md)** - Complete API reference with endpoints, authentication, and examples
- **[Development Guidelines](./DEVELOPMENT_GUIDELINES.md)** - Coding standards, best practices, and development workflow
- **[Integration Summary](./INTEGRATION_SUMMARY.md)** - Comprehensive overview of the complete integration

### Project Documentation
- **[Frontend-Backend Integration Plan](../FRONTEND_BACKEND_INTEGRATION_PLAN.md)** - Step-by-step integration plan with all stages
- **[README](../README.md)** - Main project README with setup instructions

---

## 🚀 Quick Start

### For Developers
1. **Setup**: Follow the [Development Guidelines](./DEVELOPMENT_GUIDELINES.md#environment-setup)
2. **API Reference**: Check [API Documentation](./API_DOCUMENTATION.md) for endpoints
3. **Integration**: Review [Integration Summary](./INTEGRATION_SUMMARY.md) for architecture

### For API Users
1. **Authentication**: See [API Documentation](./API_DOCUMENTATION.md#authentication)
2. **Endpoints**: Browse available [API endpoints](./API_DOCUMENTATION.md#document-management-endpoints)
3. **Examples**: Use provided [code examples](./API_DOCUMENTATION.md#sdk-and-client-libraries)

---

## 📖 Documentation Structure

```
docs/
├── README.md                    # This file - Documentation overview
├── API_DOCUMENTATION.md         # Complete API reference
├── DEVELOPMENT_GUIDELINES.md    # Development standards & best practices
└── INTEGRATION_SUMMARY.md       # Complete integration overview
```

---

## 🔍 Finding Information

### I want to...
- **Understand the API**: Start with [API Documentation](./API_DOCUMENTATION.md)
- **Set up development**: Follow [Development Guidelines](./DEVELOPMENT_GUIDELINES.md)
- **Learn about the integration**: Read [Integration Summary](./INTEGRATION_SUMMARY.md)
- **See the project plan**: Check [Integration Plan](../FRONTEND_BACKEND_INTEGRATION_PLAN.md)

### Common Topics
- **Authentication**: [API Documentation > Authentication](./API_DOCUMENTATION.md#authentication)
- **Document Management**: [API Documentation > Document Management](./API_DOCUMENTATION.md#document-management-endpoints)
- **Error Handling**: [Development Guidelines > Error Handling](./DEVELOPMENT_GUIDELINES.md#error-handling)
- **Security**: [Development Guidelines > Security](./DEVELOPMENT_GUIDELINES.md#security-best-practices)
- **Testing**: [Development Guidelines > Testing](./DEVELOPMENT_GUIDELINES.md#testing-standards)

---

## 🛠 Development Workflow

### 1. Environment Setup
```bash
# Clone repository
git clone <repository-url>
cd DE-website

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Configure environment variables

# Start development servers
npm run dev          # Frontend
cd backend && npm start  # Backend
```

### 2. Development Process
1. **Create feature branch**: `git checkout -b feature/your-feature`
2. **Follow coding standards**: See [Development Guidelines](./DEVELOPMENT_GUIDELINES.md)
3. **Write tests**: Follow [Testing Standards](./DEVELOPMENT_GUIDELINES.md#testing-standards)
4. **Update documentation**: Keep docs in sync with code changes
5. **Submit PR**: Follow [Git Workflow](./DEVELOPMENT_GUIDELINES.md#git-workflow)

### 3. Testing
```bash
# Run all tests
npm run test:all

# Run specific test types
npm run test              # Unit tests
npm run test:integration  # Integration tests
npm run test:e2e         # End-to-end tests
```

---

## 📋 API Quick Reference

### Authentication
```bash
# Register
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "user"
}

# Login
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Documents
```bash
# List documents
GET /api/documents?type=project&page=1&limit=10

# Upload document
POST /api/documents
Content-Type: multipart/form-data
Authorization: Bearer <token>

# Download document
GET /api/documents/:id/download
Authorization: Bearer <token>
```

### JavaScript Usage
```javascript
import { apiFetch } from '@/utils/api';

// Get documents
const documents = await apiFetch('/api/documents?type=project');

// Upload document
const formData = new FormData();
formData.append('file', file);
formData.append('title', 'Project Report');

const response = await apiFetch('/api/documents', {
  method: 'POST',
  body: formData
});
```

---

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

#### Backend (.env)
```bash
PORT=4000
MONGODB_URI=mongodb://localhost:27017/deep-engineering
JWT_SECRET=your-secure-secret-key
NODE_ENV=development
```

### Database Setup
```bash
# Install MongoDB
# Create database
mongosh
use deep-engineering
```

---

## 🧪 Testing

### Test Structure
```
__tests__/
├── integration/
│   ├── api.test.ts        # API integration tests
│   ├── auth.test.tsx      # Authentication tests
│   └── documents.test.tsx # Document management tests
└── components/            # Component unit tests
```

### Running Tests
```bash
# All tests
npm run test:all

# Specific test types
npm run test              # Unit tests
npm run test:integration  # Integration tests
npm run test:e2e         # End-to-end tests
npm run test:coverage    # Coverage report
```

---

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Backend Deployment
```bash
# Build Docker image
docker build -t deep-engineering-backend .

# Run container
docker run -p 4000:4000 deep-engineering-backend
```

---

## 📞 Support

### Getting Help
- **Documentation Issues**: Create an issue in the repository
- **API Questions**: Check [API Documentation](./API_DOCUMENTATION.md)
- **Development Issues**: Review [Development Guidelines](./DEVELOPMENT_GUIDELINES.md)

### Contributing to Documentation
1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Update relevant documentation**
5. **Submit a pull request**

### Documentation Standards
- Use clear, concise language
- Include code examples
- Keep information up to date
- Follow markdown formatting standards
- Add links between related documents

---

## 📈 Project Status

### Integration Status
- ✅ **Stage 1**: Sanity CMS Removal
- ✅ **Stage 2**: API Utility Development
- ✅ **Stage 3**: Authentication System
- ✅ **Stage 4**: Data Fetching Integration
- ✅ **Stage 5**: Document Management
- ✅ **Stage 6**: Error Handling & User Feedback
- ✅ **Stage 7**: Server-Side Rendering (SSR) & Static Generation (SSG)
- ✅ **Stage 8**: Testing Integration
- ✅ **Stage 9**: Best Practices & Documentation

### Current Version
- **Version**: 1.0.0
- **Status**: Production Ready
- **Last Updated**: January 2024

---

## 🔗 Related Links

- **[Main Project README](../README.md)**
- **[Integration Plan](../FRONTEND_BACKEND_INTEGRATION_PLAN.md)**
- **[Package.json](../package.json)** - Dependencies and scripts
- **[Backend Repository](../backend/)** - Backend code and documentation

---

**Need help?** Check the [Development Guidelines](./DEVELOPMENT_GUIDELINES.md#troubleshooting) for common issues and solutions. 