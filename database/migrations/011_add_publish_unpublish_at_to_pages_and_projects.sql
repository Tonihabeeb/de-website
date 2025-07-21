-- Migration: Add publish_at and unpublish_at columns for content scheduling

ALTER TABLE pages
  ADD COLUMN publish_at TEXT,
  ADD COLUMN unpublish_at TEXT;

ALTER TABLE projects
  ADD COLUMN publish_at TEXT,
  ADD COLUMN unpublish_at TEXT;

-- Add indexes for scheduling fields
CREATE INDEX idx_pages_publish_at ON pages(publish_at);
CREATE INDEX idx_pages_unpublish_at ON pages(unpublish_at);
CREATE INDEX idx_projects_publish_at ON projects(publish_at);
CREATE INDEX idx_projects_unpublish_at ON projects(unpublish_at); 