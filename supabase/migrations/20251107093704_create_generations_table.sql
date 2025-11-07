/*
  # Create generations table for music generation tracking

  1. New Tables
    - `generations`
      - `id` (uuid, primary key) - Unique identifier for each generation
      - `prompt` (text) - Description of the music to generate
      - `tags` (text) - Music genre tags
      - `title` (text) - Title of the song
      - `status` (text) - Generation status (pending, completed, failed)
      - `created_at` (timestamptz) - When the generation was requested
  
  2. Security
    - Enable RLS on `generations` table
    - Add policy for public read access (since no auth is implemented)
    - Add policy for public insert access
*/

CREATE TABLE IF NOT EXISTS generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt text NOT NULL,
  tags text NOT NULL,
  title text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view generations"
  ON generations
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can create generations"
  ON generations
  FOR INSERT
  TO anon
  WITH CHECK (true);
