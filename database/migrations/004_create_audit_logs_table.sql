-- CMS Database Migration Script
-- Migration: 004_create_audit_logs_table.sql
-- Description: Create audit logs table for activity tracking and compliance

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Audit logs table for tracking all system activities
CREATE TABLE IF NOT EXISTS audit_logs (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id VARCHAR(36),
  resource_name VARCHAR(255),
  details JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  status VARCHAR(20) DEFAULT 'success' CHECK (status IN ('success', 'failure', 'error')),
  severity VARCHAR(20) DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- System logs table for system events
CREATE TABLE IF NOT EXISTS system_logs (
  id VARCHAR(36) PRIMARY KEY,
  level VARCHAR(20) NOT NULL CHECK (level IN ('debug', 'info', 'warning', 'error', 'critical')),
  category VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  details JSON,
  stack_trace TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Backup logs table for backup operations
CREATE TABLE IF NOT EXISTS backup_logs (
  id VARCHAR(36) PRIMARY KEY,
  backup_id VARCHAR(36) NOT NULL,
  operation VARCHAR(50) NOT NULL CHECK (operation IN ('create', 'restore', 'delete', 'download')),
  status VARCHAR(20) NOT NULL CHECK (status IN ('started', 'completed', 'failed')),
  file_path VARCHAR(500),
  file_size BIGINT,
  duration_ms INTEGER,
  error_message TEXT,
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Analytics events table for user behavior tracking
CREATE TABLE IF NOT EXISTS analytics_events (
  id VARCHAR(36) PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  user_id VARCHAR(36),
  session_id VARCHAR(100),
  page_url VARCHAR(500),
  referrer_url VARCHAR(500),
  user_agent TEXT,
  ip_address VARCHAR(45),
  event_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_severity ON audit_logs(severity);

CREATE INDEX IF NOT EXISTS idx_system_logs_level ON system_logs(level);
CREATE INDEX IF NOT EXISTS idx_system_logs_category ON system_logs(category);
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at);

CREATE INDEX IF NOT EXISTS idx_backup_logs_backup_id ON backup_logs(backup_id);
CREATE INDEX IF NOT EXISTS idx_backup_logs_operation ON backup_logs(operation);
CREATE INDEX IF NOT EXISTS idx_backup_logs_status ON backup_logs(status);
CREATE INDEX IF NOT EXISTS idx_backup_logs_created_at ON backup_logs(created_at);

CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);

-- Insert some initial audit log entries for demonstration
INSERT OR IGNORE INTO audit_logs (id, user_id, action, resource_type, resource_id, resource_name, details, status, severity, created_at) VALUES
('audit-001', 'admin-001', 'login', 'auth', NULL, 'User Login', '{"method": "email", "success": true}', 'success', 'info', datetime('now', '-1 hour')),
('audit-002', 'admin-001', 'create', 'page', 'page-001', 'About Us Page', '{"title": "About Us", "slug": "about"}', 'success', 'info', datetime('now', '-30 minutes')),
('audit-003', 'admin-001', 'update', 'project', 'project-001', 'KPP Technology Project', '{"status": "in-progress", "budget": 500000}', 'success', 'info', datetime('now', '-15 minutes')),
('audit-004', NULL, 'system', 'backup', 'backup-001', 'Daily Backup', '{"type": "scheduled", "size": 1048576}', 'success', 'info', datetime('now', '-1 day'));

-- Insert some initial system log entries
INSERT OR IGNORE INTO system_logs (id, level, category, message, details, created_at) VALUES
('sys-001', 'info', 'startup', 'Application started successfully', '{"version": "1.0.0", "environment": "development"}', datetime('now', '-2 hours')),
('sys-002', 'info', 'database', 'Database connection established', '{"tables": 7, "size": "2.5MB"}', datetime('now', '-2 hours')),
('sys-003', 'warning', 'performance', 'High memory usage detected', '{"memory_usage": 75, "threshold": 70}', datetime('now', '-1 hour'));

-- Insert some initial backup log entries
INSERT OR IGNORE INTO backup_logs (id, backup_id, operation, status, file_path, file_size, duration_ms, created_by, created_at) VALUES
('backup-log-001', 'backup-001', 'create', 'completed', '/backups/backup-2024-12-19-manual-daily.db', 1048576, 5000, 'admin-001', datetime('now', '-1 day')),
('backup-log-002', 'backup-002', 'create', 'completed', '/backups/backup-2024-12-20-manual-weekly.db', 2097152, 8000, 'admin-001', datetime('now', '-12 hours'));

-- Insert some initial analytics events
INSERT OR IGNORE INTO analytics_events (id, event_type, user_id, session_id, page_url, event_data, created_at) VALUES
('analytics-001', 'page_view', 'admin-001', 'session-001', '/admin/dashboard', '{"duration": 120, "scroll_depth": 80}', datetime('now', '-1 hour')),
('analytics-002', 'button_click', 'admin-001', 'session-001', '/admin/pages', '{"button": "create_page", "location": "header"}', datetime('now', '-45 minutes')),
('analytics-003', 'form_submit', 'admin-001', 'session-001', '/admin/pages/new', '{"form": "page_creation", "fields": 8}', datetime('now', '-30 minutes')); 