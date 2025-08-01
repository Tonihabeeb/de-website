-- Migration: Add sample projects
-- This migration adds sample projects to the database

-- Delete existing sample projects to avoid conflicts
DELETE FROM projects WHERE id IN ('samawah-90mw', 'kurdistan-300mw', 'basra-pilot');

-- Insert sample projects
INSERT INTO projects (
  id, name, description, status, owner_id, created_at, updated_at
) VALUES
(
  'samawah-90mw',
  'Samawah 90 MW KPP Project',
  'Our flagship project in Samawah represents a major milestone in Iraq''s renewable energy development. This 90 MW installation will provide clean, continuous power to the region.',
  'active',
  'system-user',
  '2024-01-01 00:00:00',
  '2024-01-01 00:00:00'
),
(
  'kurdistan-300mw',
  'Kurdistan Region 300 MW Development',
  'We''re developing a 300 MW KPP installation in the Kurdistan Region, demonstrating the scalability and versatility of our technology.',
  'active',
  'system-user',
  '2024-01-01 00:00:00',
  '2024-01-01 00:00:00'
),
(
  'basra-pilot',
  'Basra Pilot Project',
  'A pilot KPP installation in Basra to demonstrate the technology and gather operational data.',
  'active',
  'system-user',
  '2023-06-01 00:00:00',
  '2024-05-31 00:00:00'
); 