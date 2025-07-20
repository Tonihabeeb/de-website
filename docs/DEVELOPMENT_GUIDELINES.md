# Development Guidelines

## Overview
This document outlines the development standards, best practices, and guidelines for the Deep Engineering frontend-backend integration project.

---

## Table of Contents
1. [Code Standards](#code-standards)
2. [Architecture Patterns](#architecture-patterns)
3. [Security Best Practices](#security-best-practices)
4. [Performance Guidelines](#performance-guidelines)
5. [Testing Standards](#testing-standards)
6. [Git Workflow](#git-workflow)
7. [Environment Setup](#environment-setup)
8. [Deployment Guidelines](#deployment-guidelines)

---

## Code Standards

### TypeScript Guidelines

#### Type Definitions
- Always define explicit types for function parameters and return values
- Use interfaces for object shapes, types for unions/primitives
- Export types from dedicated type files

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

type UserRole = 'admin' | 'editor' | 'viewer' | 'user';

function createUser(userData: Omit<User, 'id'>): Promise<User> {
  // Implementation
}

// ❌ Bad
function createUser(userData: any): any {
  // Implementation
}
```

#### Error Handling
- Use custom error classes for different error types
- Always handle async errors with try-catch
- Provide meaningful error messages

```typescript
// ✅ Good
class ApiException extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiException';
  }
}

async function fetchData() {
  try {
    const response = await apiFetch('/data');
    return response;
  } catch (error) {
    if (error instanceof ApiException) {
      throw new Error(`API Error: ${error.message}`);
    }
    throw new Error('Network error occurred');
  }
}
```

### React/Next.js Guidelines

#### Component Structure
- Use functional components with hooks
- Keep components small and focused
- Use proper prop types and default values

```typescript
// ✅ Good
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

#### State Management
- Use React Context for global state
- Prefer local state for component-specific data
- Use custom hooks for reusable logic

```typescript
// ✅ Good - Custom Hook
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      setUser(response.user);
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading, login };
}
```

### API Integration Guidelines

#### Request Handling
- Use centralized API utility functions
- Implement proper error handling and retry logic
- Use TypeScript for API response types

```typescript
// ✅ Good - API Utility
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new ApiException(
      await response.text(),
      response.status
    );
  }

  return response.json();
}
```

---

## Architecture Patterns

### Frontend Architecture

#### Component Hierarchy
```
App/
├── Layout/
│   ├── Navbar
│   ├── Sidebar
│   └── Footer
├── Pages/
│   ├── Home
│   ├── Projects
│   ├── Team
│   └── Documents
├── Components/
│   ├── UI/ (Reusable UI components)
│   ├── Forms/ (Form components)
│   └── Sections/ (Page sections)
└── Contexts/ (Global state)
```

#### Data Flow
1. **API Layer**: Centralized API utilities
2. **Context Layer**: Global state management
3. **Component Layer**: UI components
4. **Page Layer**: Route components

### Backend Architecture

#### API Structure
```
/api/
├── auth/
│   ├── login
│   ├── register
│   └── me
├── documents/
│   ├── GET / (list)
│   ├── POST / (create)
│   ├── GET /:id (read)
│   ├── PUT /:id (update)
│   └── DELETE /:id (delete)
└── dashboards/
    ├── financial
    └── project-progress
```

#### Middleware Stack
1. **CORS**: Cross-origin resource sharing
2. **Helmet**: Security headers
3. **Rate Limiting**: Request throttling
4. **Authentication**: JWT verification
5. **Validation**: Request validation
6. **Error Handling**: Global error handler

---

## Security Best Practices

### Authentication & Authorization

#### JWT Implementation
- Use secure JWT secrets (32+ characters)
- Implement token expiration (15 minutes for access tokens)
- Use refresh tokens for session management
- Validate token signature and expiration

```typescript
// ✅ Good - JWT Verification
const verifyToken = (token: string): UserPayload => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as UserPayload;
  } catch (error) {
    throw new ApiException('Invalid token', 401);
  }
};
```

#### Role-Based Access Control
- Implement hierarchical roles (admin > editor > viewer > user)
- Check permissions at both API and UI levels
- Use middleware for route protection

```typescript
// ✅ Good - Role Middleware
const requireRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      throw new ApiException('Insufficient permissions', 403);
    }
    next();
  };
};
```

### Data Validation

#### Input Validation
- Validate all user inputs on both client and server
- Use schema validation libraries (Joi, Zod)
- Sanitize data to prevent injection attacks

```typescript
// ✅ Good - Input Validation
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  role: z.enum(['admin', 'editor', 'viewer', 'user'])
});

const validateUser = (data: unknown) => {
  return UserSchema.parse(data);
};
```

### File Upload Security

#### File Validation
- Validate file types and sizes
- Scan files for malware
- Store files outside web root
- Use secure file names

```typescript
// ✅ Good - File Validation
const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
const maxSize = 10 * 1024 * 1024; // 10MB

const validateFile = (file: Express.Multer.File) => {
  if (!allowedTypes.includes(file.mimetype)) {
    throw new ApiException('Invalid file type', 400);
  }
  if (file.size > maxSize) {
    throw new ApiException('File too large', 413);
  }
};
```

---

## Performance Guidelines

### Frontend Performance

#### Code Splitting
- Use dynamic imports for route-based splitting
- Implement lazy loading for components
- Optimize bundle size with tree shaking

```typescript
// ✅ Good - Code Splitting
const DocumentUpload = lazy(() => import('./DocumentUpload'));
const DocumentList = lazy(() => import('./DocumentList'));

function DocumentsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DocumentUpload />
      <DocumentList />
    </Suspense>
  );
}
```

#### Image Optimization
- Use Next.js Image component for automatic optimization
- Implement responsive images
- Use WebP format when possible

```typescript
// ✅ Good - Image Optimization
import Image from 'next/image';

function ProjectCard({ project }: { project: Project }) {
  return (
    <Image
      src={project.image}
      alt={project.title}
      width={400}
      height={300}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

### Backend Performance

#### Database Optimization
- Use indexes for frequently queried fields
- Implement pagination for large datasets
- Use connection pooling
- Cache frequently accessed data

```typescript
// ✅ Good - Database Query
const getDocuments = async (filters: DocumentFilters) => {
  const query = Document.find(filters)
    .select('title description category createdAt')
    .sort({ createdAt: -1 })
    .limit(20)
    .lean(); // Faster queries

  return query.exec();
};
```

#### Caching Strategy
- Implement Redis for session storage
- Cache API responses for static data
- Use CDN for static assets

---

## Testing Standards

### Unit Testing

#### Component Testing
- Test component rendering and interactions
- Mock external dependencies
- Test error states and edge cases

```typescript
// ✅ Good - Component Test
describe('Button Component', () => {
  it('should render with correct props', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### API Testing
- Test all API endpoints
- Verify error handling
- Test authentication and authorization

```typescript
// ✅ Good - API Test
describe('Document API', () => {
  it('should create document with valid data', async () => {
    const documentData = {
      title: 'Test Document',
      category: 'project'
    };

    const response = await request(app)
      .post('/api/documents')
      .set('Authorization', `Bearer ${adminToken}`)
      .attach('file', 'test.pdf')
      .field(documentData);

    expect(response.status).toBe(201);
    expect(response.body.document.title).toBe(documentData.title);
  });
});
```

### Integration Testing

#### End-to-End Testing
- Test complete user workflows
- Verify frontend-backend integration
- Test error scenarios

```typescript
// ✅ Good - E2E Test
describe('Document Upload Flow', () => {
  it('should upload document and display in list', async () => {
    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'admin@example.com');
    await page.fill('[name="password"]', 'password');
    await page.click('[type="submit"]');

    // Upload document
    await page.goto('/documents');
    await page.setInputFiles('input[type="file"]', 'test.pdf');
    await page.fill('[name="title"]', 'Test Document');
    await page.click('[data-testid="upload-button"]');

    // Verify upload
    await expect(page.locator('text=Test Document')).toBeVisible();
  });
});
```

---

## Git Workflow

### Branch Strategy

#### Main Branches
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature development branches
- `hotfix/*` - Critical bug fixes

#### Commit Standards
- Use conventional commit format
- Write descriptive commit messages
- Keep commits atomic and focused

```bash
# ✅ Good - Commit Messages
feat: add document upload functionality
fix: resolve authentication token expiration issue
docs: update API documentation
test: add integration tests for document management
```

### Pull Request Process

#### PR Requirements
- Descriptive title and description
- Link to related issues
- Include tests for new features
- Update documentation if needed
- Code review by at least one team member

#### Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass and coverage is adequate
- [ ] No security vulnerabilities
- [ ] Performance impact is acceptable
- [ ] Documentation is updated

---

## Environment Setup

### Development Environment

#### Prerequisites
- Node.js 18+ and npm
- MongoDB 6+
- Git
- Code editor (VS Code recommended)

#### Setup Steps
1. Clone repository
2. Install dependencies: `npm install`
3. Copy environment files: `cp .env.example .env.local`
4. Configure environment variables
5. Start development servers

#### Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

# Backend (.env)
PORT=4000
MONGODB_URI=mongodb://localhost:27017/deep-engineering
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Production Environment

#### Deployment Checklist
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificates installed
- [ ] Monitoring and logging setup
- [ ] Backup strategy implemented

---

## Deployment Guidelines

### Frontend Deployment

#### Build Process
```bash
# Build for production
npm run build

# Start production server
npm start
```

#### Deployment Options
- **Vercel**: Recommended for Next.js
- **Netlify**: Alternative hosting
- **AWS/GCP**: Custom infrastructure

### Backend Deployment

#### Container Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```

#### Environment Configuration
- Use environment-specific configs
- Secure sensitive data
- Implement health checks

### Monitoring and Logging

#### Application Monitoring
- Use APM tools (New Relic, DataDog)
- Monitor error rates and performance
- Set up alerts for critical issues

#### Logging Strategy
- Structured logging (JSON format)
- Log levels (error, warn, info, debug)
- Centralized log aggregation

```typescript
// ✅ Good - Logging
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

logger.info('User logged in', { userId: user.id, email: user.email });
```

---

## Code Review Guidelines

### Review Process

#### What to Review
- Code quality and readability
- Security vulnerabilities
- Performance implications
- Test coverage
- Documentation updates

#### Review Comments
- Be constructive and specific
- Suggest improvements
- Ask clarifying questions
- Approve only when satisfied

### Common Issues to Watch For

#### Security
- SQL injection vulnerabilities
- XSS prevention
- Authentication bypass
- Sensitive data exposure

#### Performance
- N+1 query problems
- Memory leaks
- Inefficient algorithms
- Large bundle sizes

#### Code Quality
- Code duplication
- Complex functions
- Missing error handling
- Inconsistent naming

---

## Troubleshooting

### Common Issues

#### Frontend Issues
- **Build errors**: Check TypeScript errors and dependencies
- **Runtime errors**: Check browser console and network tab
- **Performance issues**: Use React DevTools and Lighthouse

#### Backend Issues
- **Database connection**: Check MongoDB status and connection string
- **Authentication errors**: Verify JWT secret and token format
- **File upload issues**: Check file permissions and disk space

### Debug Tools

#### Frontend Debugging
- React DevTools
- Redux DevTools (if using Redux)
- Network tab for API calls
- Console logging

#### Backend Debugging
- Node.js debugger
- MongoDB Compass
- Postman for API testing
- Log analysis

---

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)

### Tools
- [ESLint](https://eslint.org) - Code linting
- [Prettier](https://prettier.io) - Code formatting
- [Jest](https://jestjs.io) - Testing framework
- [Playwright](https://playwright.dev) - E2E testing

---

**Last Updated**: January 2024
**Version**: 1.0.0 