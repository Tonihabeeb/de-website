-- Migration: Create real-time metrics table for live analytics data
-- Date: 2024-12-19

-- Create realtime_metrics table
CREATE TABLE IF NOT EXISTS realtime_metrics (
  id VARCHAR(36) PRIMARY KEY,
  metric_type VARCHAR(50) NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_realtime_metrics_type ON realtime_metrics(metric_type);
CREATE INDEX IF NOT EXISTS idx_realtime_metrics_timestamp ON realtime_metrics(timestamp);
CREATE INDEX IF NOT EXISTS idx_realtime_metrics_created_at ON realtime_metrics(created_at);

-- Create composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_realtime_metrics_type_time ON realtime_metrics(metric_type, timestamp);
CREATE INDEX IF NOT EXISTS idx_realtime_metrics_type_created ON realtime_metrics(metric_type, created_at);

-- Insert sample real-time metrics data
INSERT OR IGNORE INTO realtime_metrics (id, metric_type, value, timestamp, created_at) VALUES
('rtm-001', 'active_users', 15.0, datetime('now', '-5 minutes'), datetime('now', '-5 minutes')),
('rtm-002', 'requests_per_minute', 45.0, datetime('now', '-4 minutes'), datetime('now', '-4 minutes')),
('rtm-003', 'average_response_time', 125.5, datetime('now', '-3 minutes'), datetime('now', '-3 minutes')),
('rtm-004', 'error_rate', 0.8, datetime('now', '-2 minutes'), datetime('now', '-2 minutes')),
('rtm-005', 'cpu_usage', 18.2, datetime('now', '-1 minute'), datetime('now', '-1 minute')),
('rtm-006', 'memory_usage', 47.8, datetime('now'), datetime('now')); 