-- Migration: Create analytics_data table for dashboard mock data

CREATE TABLE IF NOT EXISTS analytics_data (
    id INTEGER PRIMARY KEY,
    data TEXT NOT NULL
); 