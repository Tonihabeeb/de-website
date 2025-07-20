-- Migration: Create content contributions table for tracking user content creation
-- Date: 2024-12-19

-- Create content_contributions table
CREATE TABLE IF NOT EXISTS content_contributions (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('page', 'project', 'media', 'comment')),
  content_id VARCHAR(36) NOT NULL,
  action VARCHAR(20) NOT NULL CHECK (action IN ('created', 'updated', 'deleted', 'published')),
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_content_contributions_user_id ON content_contributions(user_id);
CREATE INDEX IF NOT EXISTS idx_content_contributions_content_type ON content_contributions(content_type);
CREATE INDEX IF NOT EXISTS idx_content_contributions_action ON content_contributions(action);
CREATE INDEX IF NOT EXISTS idx_content_contributions_created_at ON content_contributions(created_at);
CREATE INDEX IF NOT EXISTS idx_content_contributions_content_id ON content_contributions(content_id);

-- Create composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_content_contributions_user_type ON content_contributions(user_id, content_type);
CREATE INDEX IF NOT EXISTS idx_content_contributions_type_action ON content_contributions(content_type, action);
CREATE INDEX IF NOT EXISTS idx_content_contributions_user_date ON content_contributions(user_id, created_at);

-- Insert sample data for testing (only if table is empty)
INSERT OR IGNORE INTO content_contributions (id, user_id, content_type, content_id, action, title, created_at) VALUES
('cc-001', (SELECT id FROM users LIMIT 1), 'page', 'page-001', 'created', 'Sample Page', '2024-12-19 10:00:00'),
('cc-002', (SELECT id FROM users LIMIT 1), 'project', 'proj-001', 'created', 'Sample Project', '2024-12-19 11:00:00'),
('cc-003', (SELECT id FROM users LIMIT 1), 'media', 'media-001', 'created', 'Sample Image', '2024-12-19 12:00:00'),
('cc-004', (SELECT id FROM users LIMIT 1), 'page', 'page-001', 'published', 'Sample Page', '2024-12-19 13:00:00'),
('cc-005', (SELECT id FROM users LIMIT 1), 'project', 'proj-001', 'updated', 'Sample Project Updated', '2024-12-19 14:00:00'); 