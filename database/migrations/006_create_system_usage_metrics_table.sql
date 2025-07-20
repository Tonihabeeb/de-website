-- Migration: Create system usage metrics table for tracking system performance
-- Date: 2024-12-19

-- Create system_usage_metrics table
CREATE TABLE IF NOT EXISTS system_usage_metrics (
  id VARCHAR(36) PRIMARY KEY,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cpu_usage DECIMAL(5,2) NOT NULL, -- CPU usage percentage
  memory_usage DECIMAL(5,2) NOT NULL, -- Memory usage percentage
  disk_usage DECIMAL(10,2), -- Disk usage in MB
  active_users INTEGER DEFAULT 0, -- Number of active users
  database_connections INTEGER DEFAULT 0, -- Number of database connections
  api_requests_per_minute INTEGER DEFAULT 0, -- API requests per minute
  error_rate DECIMAL(5,2) DEFAULT 0, -- Error rate percentage
  response_time_avg DECIMAL(8,2) DEFAULT 0 -- Average response time in ms
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_system_usage_timestamp ON system_usage_metrics(timestamp);
CREATE INDEX IF NOT EXISTS idx_system_usage_cpu ON system_usage_metrics(cpu_usage);
CREATE INDEX IF NOT EXISTS idx_system_usage_memory ON system_usage_metrics(memory_usage);
CREATE INDEX IF NOT EXISTS idx_system_usage_error_rate ON system_usage_metrics(error_rate);

-- Create composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_system_usage_date_range ON system_usage_metrics(timestamp, cpu_usage, memory_usage);
CREATE INDEX IF NOT EXISTS idx_system_usage_performance ON system_usage_metrics(timestamp, response_time_avg, error_rate);

-- Insert sample data for testing (last 24 hours of metrics)
INSERT OR IGNORE INTO system_usage_metrics (id, timestamp, cpu_usage, memory_usage, disk_usage, active_users, database_connections, api_requests_per_minute, error_rate, response_time_avg) VALUES
('sum-001', datetime('now', '-23 hours'), 15.5, 45.2, 1250.5, 5, 3, 12, 0.5, 125.3),
('sum-002', datetime('now', '-22 hours'), 18.2, 48.7, 1251.2, 8, 4, 15, 0.8, 118.7),
('sum-003', datetime('now', '-21 hours'), 22.1, 52.3, 1252.8, 12, 5, 18, 1.2, 135.9),
('sum-004', datetime('now', '-20 hours'), 19.8, 49.1, 1253.1, 10, 4, 16, 0.9, 122.4),
('sum-005', datetime('now', '-19 hours'), 16.4, 46.8, 1253.5, 7, 3, 13, 0.6, 119.8),
('sum-006', datetime('now', '-18 hours'), 14.7, 44.2, 1254.0, 6, 3, 11, 0.4, 116.2),
('sum-007', datetime('now', '-17 hours'), 17.3, 47.5, 1254.3, 9, 4, 14, 0.7, 121.5),
('sum-008', datetime('now', '-16 hours'), 20.5, 50.8, 1254.7, 11, 5, 17, 1.0, 128.3),
('sum-009', datetime('now', '-15 hours'), 18.9, 48.3, 1255.1, 8, 4, 15, 0.8, 124.7),
('sum-010', datetime('now', '-14 hours'), 16.2, 45.9, 1255.4, 7, 3, 12, 0.5, 120.1),
('sum-011', datetime('now', '-13 hours'), 13.8, 43.1, 1255.8, 5, 3, 10, 0.3, 115.6),
('sum-012', datetime('now', '-12 hours'), 15.6, 46.2, 1256.2, 6, 3, 11, 0.4, 118.9),
('sum-013', datetime('now', '-11 hours'), 19.2, 49.7, 1256.5, 9, 4, 14, 0.7, 123.4),
('sum-014', datetime('now', '-10 hours'), 21.8, 51.4, 1256.9, 12, 5, 18, 1.1, 131.7),
('sum-015', datetime('now', '-9 hours'), 18.4, 47.8, 1257.2, 8, 4, 15, 0.8, 125.2),
('sum-016', datetime('now', '-8 hours'), 16.7, 45.3, 1257.6, 7, 3, 12, 0.5, 119.6),
('sum-017', datetime('now', '-7 hours'), 14.3, 42.8, 1257.9, 5, 3, 10, 0.3, 114.8),
('sum-018', datetime('now', '-6 hours'), 17.1, 46.9, 1258.3, 8, 4, 13, 0.6, 121.3),
('sum-019', datetime('now', '-5 hours'), 20.3, 50.1, 1258.6, 11, 5, 16, 0.9, 127.5),
('sum-020', datetime('now', '-4 hours'), 18.7, 48.5, 1259.0, 9, 4, 14, 0.7, 123.8),
('sum-021', datetime('now', '-3 hours'), 16.5, 45.7, 1259.3, 7, 3, 12, 0.5, 120.4),
('sum-022', datetime('now', '-2 hours'), 14.1, 43.2, 1259.7, 6, 3, 11, 0.4, 117.1),
('sum-023', datetime('now', '-1 hour'), 17.8, 47.1, 1260.0, 8, 4, 13, 0.6, 122.7),
('sum-024', datetime('now'), 19.6, 49.3, 1260.4, 10, 4, 15, 0.8, 126.2); 