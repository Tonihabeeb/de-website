-- Migration: Add SEO fields to pages and projects tables

ALTER TABLE pages
  ADD COLUMN og_title TEXT,
  ADD COLUMN og_description TEXT,
  ADD COLUMN og_image TEXT,
  ADD COLUMN twitter_title TEXT,
  ADD COLUMN twitter_description TEXT,
  ADD COLUMN twitter_image TEXT;

ALTER TABLE projects
  ADD COLUMN meta_title TEXT,
  ADD COLUMN meta_description TEXT,
  ADD COLUMN meta_keywords TEXT,
  ADD COLUMN og_title TEXT,
  ADD COLUMN og_description TEXT,
  ADD COLUMN og_image TEXT,
  ADD COLUMN twitter_title TEXT,
  ADD COLUMN twitter_description TEXT,
  ADD COLUMN twitter_image TEXT; 