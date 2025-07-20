-- Migration: Create performance metrics table for tracking API performance
-- Date: 2024-12-19

-- Create performance_metrics table
CREATE TABLE IF NOT EXISTS performance_metrics (
  id VARCHAR(36) PRIMARY KEY,
  endpoint VARCHAR(255) NOT NULL,
  method VARCHAR(10) NOT NULL,
  response_time INTEGER NOT NULL, -- Response time in milliseconds
  status_code INTEGER NOT NULL,
  user_id VARCHAR(36),
  ip_address VARCHAR(45) NOT NULL,
  user_agent TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  error_message TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_performance_timestamp ON performance_metrics(timestamp);
CREATE INDEX IF NOT EXISTS idx_performance_endpoint ON performance_metrics(endpoint);
CREATE INDEX IF NOT EXISTS idx_performance_method ON performance_metrics(method);
CREATE INDEX IF NOT EXISTS idx_performance_status_code ON performance_metrics(status_code);
CREATE INDEX IF NOT EXISTS idx_performance_response_time ON performance_metrics(response_time);
CREATE INDEX IF NOT EXISTS idx_performance_user_id ON performance_metrics(user_id);

-- Create composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_performance_endpoint_time ON performance_metrics(endpoint, timestamp);
CREATE INDEX IF NOT EXISTS idx_performance_status_time ON performance_metrics(status_code, timestamp);
CREATE INDEX IF NOT EXISTS idx_performance_user_time ON performance_metrics(user_id, timestamp);

-- Insert sample data for testing (last 24 hours of performance metrics)
INSERT OR IGNORE INTO performance_metrics (id, endpoint, method, response_time, status_code, user_id, ip_address, user_agent, timestamp, error_message) VALUES
('pm-001', '/api/admin/pages', 'GET', 125, 200, (SELECT id FROM users LIMIT 1), '192.168.1.100', 'Mozilla/5.0', datetime('now', '-23 hours'), NULL),
('pm-002', '/api/admin/projects', 'POST', 234, 201, (SELECT id FROM users LIMIT 1), '192.168.1.101', 'Mozilla/5.0', datetime('now', '-22 hours'), NULL),
('pm-003', '/api/admin/users', 'GET', 89, 200, (SELECT id FROM users LIMIT 1), '192.168.1.102', 'Mozilla/5.0', datetime('now', '-21 hours'), NULL),
('pm-004', '/api/admin/media', 'POST', 456, 201, (SELECT id FROM users LIMIT 1), '192.168.1.103', 'Mozilla/5.0', datetime('now', '-20 hours'), NULL),
('pm-005', '/api/admin/pages/123', 'PUT', 178, 200, (SELECT id FROM users LIMIT 1), '192.168.1.104', 'Mozilla/5.0', datetime('now', '-19 hours'), NULL),
('pm-006', '/api/admin/projects/456', 'GET', 67, 200, (SELECT id FROM users LIMIT 1), '192.168.1.105', 'Mozilla/5.0', datetime('now', '-18 hours'), NULL),
('pm-007', '/api/admin/users/789', 'DELETE', 145, 204, (SELECT id FROM users LIMIT 1), '192.168.1.106', 'Mozilla/5.0', datetime('now', '-17 hours'), NULL),
('pm-008', '/api/admin/media/upload', 'POST', 567, 201, (SELECT id FROM users LIMIT 1), '192.168.1.107', 'Mozilla/5.0', datetime('now', '-16 hours'), NULL),
('pm-009', '/api/admin/analytics', 'GET', 234, 200, (SELECT id FROM users LIMIT 1), '192.168.1.108', 'Mozilla/5.0', datetime('now', '-15 hours'), NULL),
('pm-010', '/api/admin/settings', 'PUT', 123, 200, (SELECT id FROM users LIMIT 1), '192.168.1.109', 'Mozilla/5.0', datetime('now', '-14 hours'), NULL),
('pm-011', '/api/admin/pages', 'GET', 98, 200, (SELECT id FROM users LIMIT 1), '192.168.1.110', 'Mozilla/5.0', datetime('now', '-13 hours'), NULL),
('pm-012', '/api/admin/projects', 'GET', 156, 200, (SELECT id FROM users LIMIT 1), '192.168.1.111', 'Mozilla/5.0', datetime('now', '-12 hours'), NULL),
('pm-013', '/api/admin/users', 'POST', 345, 201, (SELECT id FROM users LIMIT 1), '192.168.1.112', 'Mozilla/5.0', datetime('now', '-11 hours'), NULL),
('pm-014', '/api/admin/media', 'GET', 78, 200, (SELECT id FROM users LIMIT 1), '192.168.1.113', 'Mozilla/5.0', datetime('now', '-10 hours'), NULL),
('pm-015', '/api/admin/pages/999', 'GET', 1234, 404, (SELECT id FROM users LIMIT 1), '192.168.1.114', 'Mozilla/5.0', datetime('now', '-9 hours'), 'Page not found'),
('pm-016', '/api/admin/projects/888', 'PUT', 234, 200, (SELECT id FROM users LIMIT 1), '192.168.1.115', 'Mozilla/5.0', datetime('now', '-8 hours'), NULL),
('pm-017', '/api/admin/users/777', 'GET', 67, 200, (SELECT id FROM users LIMIT 1), '192.168.1.116', 'Mozilla/5.0', datetime('now', '-7 hours'), NULL),
('pm-018', '/api/admin/media/666', 'DELETE', 189, 204, (SELECT id FROM users LIMIT 1), '192.168.1.117', 'Mozilla/5.0', datetime('now', '-6 hours'), NULL),
('pm-019', '/api/admin/analytics/events', 'GET', 298, 200, (SELECT id FROM users LIMIT 1), '192.168.1.118', 'Mozilla/5.0', datetime('now', '-5 hours'), NULL),
('pm-020', '/api/admin/backup', 'POST', 1234, 201, (SELECT id FROM users LIMIT 1), '192.168.1.119', 'Mozilla/5.0', datetime('now', '-4 hours'), NULL),
('pm-021', '/api/admin/health', 'GET', 45, 200, (SELECT id FROM users LIMIT 1), '192.168.1.120', 'Mozilla/5.0', datetime('now', '-3 hours'), NULL),
('pm-022', '/api/admin/logs', 'GET', 167, 200, (SELECT id FROM users LIMIT 1), '192.168.1.121', 'Mozilla/5.0', datetime('now', '-2 hours'), NULL),
('pm-023', '/api/admin/audit', 'GET', 234, 200, (SELECT id FROM users LIMIT 1), '192.168.1.122', 'Mozilla/5.0', datetime('now', '-1 hour'), NULL),
('pm-024', '/api/admin/settings', 'GET', 89, 200, (SELECT id FROM users LIMIT 1), '192.168.1.123', 'Mozilla/5.0', datetime('now'), NULL); 