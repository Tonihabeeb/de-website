-- Migration: Add publish_at and unpublish_at columns for content scheduling

ALTER TABLE pages
  ADD COLUMN publish_at TEXT,
  ADD COLUMN unpublish_at TEXT;

ALTER TABLE projects
  ADD COLUMN publish_at TEXT,
  ADD COLUMN unpublish_at TEXT; 