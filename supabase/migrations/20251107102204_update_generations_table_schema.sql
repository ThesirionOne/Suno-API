/*
  # Update generations table schema for music generation

  1. Changes
    - Add `style` column for music style/genre
    - Add `tempo` column for beats per minute
    - Add `duration` column for song length in seconds
    - Update existing columns to match new schema
  
  2. Security
    - RLS policies remain unchanged (already configured)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'generations' AND column_name = 'style'
  ) THEN
    ALTER TABLE generations ADD COLUMN style text DEFAULT 'pop';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'generations' AND column_name = 'tempo'
  ) THEN
    ALTER TABLE generations ADD COLUMN tempo integer DEFAULT 120;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'generations' AND column_name = 'duration'
  ) THEN
    ALTER TABLE generations ADD COLUMN duration integer DEFAULT 30;
  END IF;
END $$;

ALTER TABLE generations ALTER COLUMN tags DROP NOT NULL;
ALTER TABLE generations ALTER COLUMN title DROP NOT NULL;
