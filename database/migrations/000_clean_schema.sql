-- Clean schema migration: drops legacy tables and creates new ones for a modern web app

-- Drop legacy tables if they exist
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS pages;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS navigation_menus;
DROP TABLE IF EXISTS site_settings;
DROP TABLE IF EXISTS analytics_events;

-- USERS TABLE
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

-- PROJECTS TABLE
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

-- PAGES TABLE
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

-- MEDIA TABLE
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

-- AUDIT LOGS TABLE
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

-- NAVIGATION MENUS TABLE
CREATE TABLE navigation_menus (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    items_json  TEXT NOT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- SITE SETTINGS TABLE
CREATE TABLE site_settings (
    id         TEXT PRIMARY KEY,
    key        TEXT NOT NULL UNIQUE,
    value      TEXT NOT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ANALYTICS EVENTS TABLE
CREATE TABLE analytics_events (
    id         TEXT PRIMARY KEY,
    user_id    TEXT,
    event_type TEXT NOT NULL,
    event_data TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_pages_author ON pages(author_id);
CREATE INDEX idx_media_uploaded_by ON media(uploaded_by);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id); 