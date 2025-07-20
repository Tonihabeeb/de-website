-- CMS Database Migration Script
-- Migration: 001_create_cms_tables.sql
-- Description: Create core CMS tables for content management

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin', 'editor', 'viewer')),
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pages table for managing all website pages
CREATE TABLE IF NOT EXISTS pages (
  id VARCHAR(36) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content JSON NOT NULL,
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords VARCHAR(500),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP NULL,
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Projects table for project management
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  content JSON NOT NULL,
  status VARCHAR(20) DEFAULT 'planning' CHECK (status IN ('planning', 'in-progress', 'completed', 'cancelled')),
  capacity_mw DECIMAL(10,2),
  location VARCHAR(255),
  start_date DATE,
  end_date DATE,
  budget DECIMAL(15,2),
  budget_currency VARCHAR(10) DEFAULT 'USD',
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Media library for managing images, videos, documents
CREATE TABLE IF NOT EXISTS media (
  id VARCHAR(36) PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  alt_text VARCHAR(255),
  caption TEXT,
  tags JSON,
  uploaded_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Site settings for global configuration
CREATE TABLE IF NOT EXISTS site_settings (
  id VARCHAR(36) PRIMARY KEY,
  setting_key VARCHAR(255) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type VARCHAR(20) DEFAULT 'string' CHECK (setting_type IN ('string', 'number', 'boolean', 'json')),
  description TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Navigation menu management
CREATE TABLE IF NOT EXISTS navigation_menus (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(100) NOT NULL, -- 'header', 'footer', 'sidebar'
  items JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content versions for draft/publish workflow
CREATE TABLE IF NOT EXISTS content_versions (
  id VARCHAR(36) PRIMARY KEY,
  content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('page', 'project', 'post')),
  content_id VARCHAR(36) NOT NULL,
  version_number INT NOT NULL,
  content JSON NOT NULL,
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);
CREATE INDEX IF NOT EXISTS idx_pages_created_by ON pages(created_by);
CREATE INDEX IF NOT EXISTS idx_pages_created_at ON pages(created_at);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_by ON projects(created_by);
CREATE INDEX IF NOT EXISTS idx_projects_location ON projects(location);

CREATE INDEX IF NOT EXISTS idx_media_uploaded_by ON media(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_media_mime_type ON media(mime_type);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at);

CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(setting_key);

CREATE INDEX IF NOT EXISTS idx_navigation_menus_location ON navigation_menus(location);

CREATE INDEX IF NOT EXISTS idx_content_versions_content_id ON content_versions(content_id);
CREATE INDEX IF NOT EXISTS idx_content_versions_content_type ON content_versions(content_type);
CREATE INDEX IF NOT EXISTS idx_content_versions_created_by ON content_versions(created_by);

-- Insert default site settings
INSERT OR IGNORE INTO site_settings (id, setting_key, setting_value, setting_type, description) VALUES
('site-title', 'site_title', 'Deep Engineering', 'string', 'Website title'),
('site-description', 'site_description', 'Leading renewable energy solutions with KPP technology', 'string', 'Website description'),
('site-logo', 'site_logo', '/logo.svg', 'string', 'Website logo path'),
('contact-email', 'contact_email', 'info@deepengineering.co', 'string', 'Contact email address'),
('contact-phone', 'contact_phone', '+964 750 XXX XXXX', 'string', 'Contact phone number'),
('social-facebook', 'social_facebook', '', 'string', 'Facebook page URL'),
('social-linkedin', 'social_linkedin', '', 'string', 'LinkedIn page URL'),
('social-twitter', 'social_twitter', '', 'string', 'Twitter page URL'),
('analytics-enabled', 'analytics_enabled', 'false', 'boolean', 'Enable Google Analytics'),
('maintenance-mode', 'maintenance_mode', 'false', 'boolean', 'Enable maintenance mode');

-- Insert default navigation menus
INSERT OR IGNORE INTO navigation_menus (id, name, location, items) VALUES
('header-menu', 'Header Menu', 'header', '[
  {"id": "home", "title": "Home", "url": "/", "order": 1},
  {"id": "about", "title": "About", "url": "/about", "order": 2},
  {"id": "technology", "title": "Technology", "url": "/technology", "order": 3},
  {"id": "projects", "title": "Projects", "url": "/projects", "order": 4},
  {"id": "services", "title": "Services", "url": "/services", "order": 5},
  {"id": "contact", "title": "Contact", "url": "/contact", "order": 6}
]'),
('footer-menu', 'Footer Menu', 'footer', '[
  {"id": "privacy", "title": "Privacy Policy", "url": "/privacy", "order": 1},
  {"id": "terms", "title": "Terms of Service", "url": "/terms", "order": 2},
  {"id": "careers", "title": "Careers", "url": "/careers", "order": 3}
]');

-- Insert a default admin user
INSERT OR IGNORE INTO users (id, name, email, password_hash, role) VALUES
('admin-001', 'Admin User', 'admin@deepengineering.co', '$2b$10$default.hash.placeholder', 'super_admin'); 