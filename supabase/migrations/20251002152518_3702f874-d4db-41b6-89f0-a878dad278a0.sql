-- Make profile_id nullable since we don't want to create auth accounts for every patient
ALTER TABLE public.patients ALTER COLUMN profile_id DROP NOT NULL;

-- Add name and email columns to patients table so we can store patient info without auth
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS phone TEXT;