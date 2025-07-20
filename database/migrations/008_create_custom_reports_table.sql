-- Migration: Create custom reports table for storing user-defined analytics reports
-- Date: 2024-12-19

-- Create custom_reports table
CREATE TABLE IF NOT EXISTS custom_reports (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  report_type VARCHAR(30) NOT NULL CHECK (report_type IN ('user_activity', 'content_performance', 'system_usage', 'project_analytics', 'custom')),
  config TEXT NOT NULL, -- Report configuration (metrics, filters, etc.) as JSON
  schedule TEXT, -- Schedule configuration (frequency, recipients, etc.) as JSON
  created_by VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_run TIMESTAMP NULL, -- Last time the report was executed
  is_active INTEGER DEFAULT 1, -- SQLite boolean as integer
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_custom_reports_type ON custom_reports(report_type);
CREATE INDEX IF NOT EXISTS idx_custom_reports_created_by ON custom_reports(created_by);
CREATE INDEX IF NOT EXISTS idx_custom_reports_active ON custom_reports(is_active);
CREATE INDEX IF NOT EXISTS idx_custom_reports_created_at ON custom_reports(created_at);
CREATE INDEX IF NOT EXISTS idx_custom_reports_last_run ON custom_reports(last_run);

-- Create composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_custom_reports_user_active ON custom_reports(created_by, is_active);
CREATE INDEX IF NOT EXISTS idx_custom_reports_type_active ON custom_reports(report_type, is_active);

-- Insert sample data for testing
INSERT OR IGNORE INTO custom_reports (id, name, description, report_type, config, schedule, created_by, created_at, updated_at, is_active) VALUES
('cr-001', 'Weekly User Activity Report', 'Track user engagement and activity patterns', 'user_activity', 
 '{"metrics": ["login_count", "page_views", "content_created"], "filters": {"role": "all"}, "date_range": {"relative": "last_7_days"}, "group_by": ["user_id"], "sort_by": "activity_count", "limit": 50}',
 '{"frequency": "weekly", "day_of_week": 1, "time": "09:00", "recipients": ["admin@example.com"]}',
 (SELECT id FROM users LIMIT 1), '2024-12-19 10:00:00', '2024-12-19 10:00:00', 1),

('cr-002', 'Monthly Content Performance', 'Analyze content engagement and performance metrics', 'content_performance',
 '{"metrics": ["page_views", "time_on_page", "bounce_rate"], "filters": {"status": "published"}, "date_range": {"relative": "last_30_days"}, "group_by": ["content_type"], "sort_by": "page_views", "limit": 100}',
 '{"frequency": "monthly", "day_of_month": 1, "time": "08:00", "recipients": ["editor@example.com", "admin@example.com"]}',
 (SELECT id FROM users LIMIT 1), '2024-12-19 11:00:00', '2024-12-19 11:00:00', 1),

('cr-003', 'Daily System Health Check', 'Monitor system performance and health metrics', 'system_usage',
 '{"metrics": ["cpu_usage", "memory_usage", "error_rate", "response_time"], "filters": {}, "date_range": {"relative": "last_24_hours"}, "group_by": ["hour"], "sort_by": "timestamp", "limit": 24}',
 '{"frequency": "daily", "time": "06:00", "recipients": ["admin@example.com"]}',
 (SELECT id FROM users LIMIT 1), '2024-12-19 12:00:00', '2024-12-19 12:00:00', 1),

('cr-004', 'Project Progress Report', 'Track project milestones and completion rates', 'project_analytics',
 '{"metrics": ["completion_rate", "milestone_count", "team_members"], "filters": {"status": "active"}, "date_range": {"relative": "last_90_days"}, "group_by": ["project_id"], "sort_by": "completion_rate", "limit": 20}',
 '{"frequency": "weekly", "day_of_week": 5, "time": "17:00", "recipients": ["manager@example.com", "admin@example.com"]}',
 (SELECT id FROM users LIMIT 1), '2024-12-19 13:00:00', '2024-12-19 13:00:00', 1),

('cr-005', 'Custom API Performance Report', 'Monitor specific API endpoint performance', 'custom',
 '{"metrics": ["response_time", "error_count", "request_count"], "filters": {"endpoint": "/api/admin/pages"}, "date_range": {"relative": "last_7_days"}, "group_by": ["endpoint"], "sort_by": "response_time", "limit": 10}',
 NULL,
 (SELECT id FROM users LIMIT 1), '2024-12-19 14:00:00', '2024-12-19 14:00:00', 1); 