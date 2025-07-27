-- Migration: Update project status to include more status values

-- First, update existing projects to use 'active' instead of any invalid statuses
UPDATE projects SET status = 'active' WHERE status NOT IN ('active', 'archived', 'completed', 'on_hold', 'cancelled');

-- Add new status values to the schema (SQLite doesn't have ENUM, so we rely on application-level validation)
-- The application will now accept: 'active', 'archived', 'completed', 'on_hold', 'cancelled' 