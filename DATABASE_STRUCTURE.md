# Database Structure & Data Skeleton

## Overview
This document outlines the complete database structure for the DE Engineering website backend, including all tables, relationships, and sample data.

## Database Schema

### 1. Users Table
**Purpose**: Store user accounts and authentication data
```sql
CREATE TABLE users (
    id            TEXT PRIMARY KEY,
    name          TEXT NOT NULL,
    email         TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role          TEXT NOT NULL DEFAULT 'user',
    is_active     INTEGER NOT NULL DEFAULT 1,
    last_login    DATETIME,
    created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Roles**:
- `superadmin`: Full system access
- `admin`: Administrative access
- `editor`: Content editing capabilities
- `author`: Content creation capabilities
- `user`: Basic user access

### 2. Projects Table
**Purpose**: Store project information and metadata
```sql
CREATE TABLE projects (
    id            TEXT PRIMARY KEY,
    name          TEXT NOT NULL,
    description   TEXT,
    status        TEXT NOT NULL DEFAULT 'active',
    owner_id      TEXT NOT NULL,
    created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);
```

**Status Values**:
- `active`: Currently active project
- `completed`: Finished project
- `on_hold`: Temporarily paused
- `cancelled`: Cancelled project

### 3. Pages Table
**Purpose**: Store website pages and content
```sql
CREATE TABLE pages (
    id            TEXT PRIMARY KEY,
    title         TEXT NOT NULL,
    slug          TEXT NOT NULL UNIQUE,
    content       TEXT,
    author_id     TEXT NOT NULL,
    published     INTEGER NOT NULL DEFAULT 0,
    published_at  DATETIME,
    created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
);
```

### 4. Media Table
**Purpose**: Store file uploads and media assets
```sql
CREATE TABLE media (
    id            TEXT PRIMARY KEY,
    filename      TEXT NOT NULL,
    url           TEXT NOT NULL,
    mime_type     TEXT NOT NULL,
    uploaded_by   TEXT NOT NULL,
    uploaded_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    project_id    TEXT,
    page_id       TEXT,
    FOREIGN KEY (uploaded_by) REFERENCES users(id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (page_id) REFERENCES pages(id)
);
```

### 5. Audit Logs Table
**Purpose**: Track system activities and changes
```sql
CREATE TABLE audit_logs (
    id            TEXT PRIMARY KEY,
    user_id       TEXT,
    action        TEXT NOT NULL,
    target_type   TEXT,
    target_id     TEXT,
    details       TEXT,
    created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 6. Navigation Menus Table
**Purpose**: Store website navigation structure
```sql
CREATE TABLE navigation_menus (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    items_json  TEXT NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 7. Site Settings Table
**Purpose**: Store application configuration
```sql
CREATE TABLE site_settings (
    id         TEXT PRIMARY KEY,
    key        TEXT NOT NULL UNIQUE,
    value      TEXT NOT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 8. Analytics Events Table
**Purpose**: Track user interactions and analytics
```sql
CREATE TABLE analytics_events (
    id         TEXT PRIMARY KEY,
    user_id    TEXT,
    event_type TEXT NOT NULL,
    event_data TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 9. Analytics Data Table
**Purpose**: Store aggregated analytics data
```sql
CREATE TABLE analytics_data (
    id INTEGER PRIMARY KEY,
    data TEXT NOT NULL
);
```

## Data Skeleton

### Sample Users
```javascript
const sampleUsers = [
  {
    id: 'superadmin-001',
    name: 'System Administrator',
    email: 'admin@deepengineering.co',
    role: 'superadmin',
    is_active: true
  },
  {
    id: 'admin-001',
    name: 'Project Manager',
    email: 'manager@deepengineering.co',
    role: 'admin',
    is_active: true
  },
  {
    id: 'editor-001',
    name: 'Content Editor',
    email: 'editor@deepengineering.co',
    role: 'editor',
    is_active: true
  },
  {
    id: 'author-001',
    name: 'Technical Writer',
    email: 'writer@deepengineering.co',
    role: 'author',
    is_active: true
  }
];
```

### Sample Projects
```javascript
const sampleProjects = [
  {
    id: 'project-001',
    name: 'KPP Technology Development',
    description: 'Advanced kinetic power plant technology research and development',
    status: 'active',
    owner_id: 'admin-001'
  },
  {
    id: 'project-002',
    name: 'Energy Efficiency Study',
    description: 'Comprehensive study on renewable energy efficiency improvements',
    status: 'completed',
    owner_id: 'admin-001'
  },
  {
    id: 'project-003',
    name: 'Infrastructure Upgrade',
    description: 'Modernization of existing power generation infrastructure',
    status: 'on_hold',
    owner_id: 'superadmin-001'
  }
];
```

### Sample Pages
```javascript
const samplePages = [
  {
    id: 'page-001',
    title: 'About Deep Engineering',
    slug: 'about',
    content: 'Deep Engineering is a leading technology company...',
    author_id: 'editor-001',
    published: true
  },
  {
    id: 'page-002',
    title: 'Our Technology',
    slug: 'technology',
    content: 'Our cutting-edge KPP technology...',
    author_id: 'author-001',
    published: true
  },
  {
    id: 'page-003',
    title: 'Contact Us',
    slug: 'contact',
    content: 'Get in touch with our team...',
    author_id: 'editor-001',
    published: true
  }
];
```

### Sample Site Settings
```javascript
const sampleSettings = [
  {
    key: 'site_name',
    value: 'Deep Engineering'
  },
  {
    key: 'site_description',
    value: 'Leading technology solutions for sustainable energy'
  },
  {
    key: 'contact_email',
    value: 'info@deepengineering.co'
  },
  {
    key: 'maintenance_mode',
    value: 'false'
  }
];
```

## Backend Models Structure

### Available Models
1. **UserModel** - Complete user management with authentication
2. **ProjectModel** - Project CRUD operations
3. **PageModel** - Page content management
4. **MediaModel** - File upload and media management
5. **AuditLogModel** - Activity tracking
6. **NavigationMenuModel** - Menu management
7. **SiteSettingModel** - Configuration management
8. **AnalyticsEventModel** - Event tracking
9. **AnalyticsDataModel** - Data aggregation

### Model Features
- **Type Safety**: Full TypeScript support with interfaces
- **Validation**: Zod schema validation
- **Security**: Password hashing, role-based permissions
- **Audit Trail**: Automatic logging of changes
- **Relationships**: Proper foreign key constraints
- **Performance**: Indexed queries and optimized operations

## API Endpoints Structure

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Users Management
- `GET /api/admin/users` - List users
- `POST /api/admin/users` - Create user
- `GET /api/admin/users/:id` - Get user details
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/users/activity` - User activity logs

### Projects Management
- `GET /api/admin/projects` - List projects
- `POST /api/admin/projects` - Create project
- `GET /api/admin/projects/:id` - Get project details
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

### Pages Management
- `GET /api/admin/pages` - List pages
- `POST /api/admin/pages` - Create page
- `GET /api/admin/pages/:id` - Get page details
- `PUT /api/admin/pages/:id` - Update page
- `DELETE /api/admin/pages/:id` - Delete page
- `POST /api/admin/pages/:id/publish` - Publish page
- `POST /api/admin/pages/:id/unpublish` - Unpublish page

### Analytics
- `GET /api/admin/analytics/dashboard` - Dashboard data
- `GET /api/admin/analytics/events` - Event logs
- `GET /api/admin/analytics/reports` - Analytics reports

### Navigation
- `GET /api/navigation` - Get navigation menus
- `POST /api/admin/navigation` - Update navigation

## Security & Permissions

### Role-Based Access Control
- **Super Admin**: Full system access
- **Admin**: Administrative functions
- **Editor**: Content editing and publishing
- **Author**: Content creation
- **User**: Basic access

### Permission Matrix
| Permission | Super Admin | Admin | Editor | Author | User |
|------------|-------------|-------|--------|--------|------|
| User Management | ✅ | ✅ | ❌ | ❌ | ❌ |
| Project Management | ✅ | ✅ | ✅ | ❌ | ❌ |
| Content Management | ✅ | ✅ | ✅ | ✅ | ❌ |
| System Settings | ✅ | ❌ | ❌ | ❌ | ❌ |
| Analytics | ✅ | ✅ | ❌ | ❌ | ❌ |

## Database Initialization

The database is automatically initialized with:
1. **Schema Creation**: All tables and indexes
2. **Sample Data**: Initial users, projects, and settings
3. **Super Admin**: Default system administrator account
4. **Basic Navigation**: Default menu structure

## Migration Strategy

- **Version Control**: Each schema change is a numbered migration
- **Rollback Support**: Migrations can be reversed
- **Data Preservation**: Existing data is preserved during updates
- **Testing**: Migrations are tested before deployment 