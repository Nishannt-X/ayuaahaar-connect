-- Fix infinite recursion in profiles RLS by creating a security definer function
CREATE OR REPLACE FUNCTION public.is_practitioner(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role = 'practitioner'::user_role
  );
$$;

-- Drop the problematic policy
DROP POLICY IF EXISTS "Practitioners can view all profiles" ON public.profiles;

-- Create new policy using the security definer function
CREATE POLICY "Practitioners can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.is_practitioner(auth.uid()));

-- Add some sample patient data for testing
-- First, we need a sample patient profile (this will be linked to the practitioner)
INSERT INTO public.patients (
  profile_id,
  practitioner_id,
  age,
  gender,
  height_cm,
  weight_kg,
  dominant_dosha,
  vata_percentage,
  pitta_percentage,
  kapha_percentage,
  chief_complaints,
  medical_history
)
SELECT 
  auth.uid(),
  auth.uid(),
  35,
  'Female',
  165,
  58,
  'pitta'::dosha_type,
  20,
  50,
  30,
  'Acid reflux, skin rashes, frequent headaches',
  'No major medical conditions. Occasional digestive issues.'
WHERE EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() LIMIT 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.patients (
  profile_id,
  practitioner_id,
  age,
  gender,
  height_cm,
  weight_kg,
  dominant_dosha,
  vata_percentage,
  pitta_percentage,
  kapha_percentage,
  chief_complaints,
  medical_history
)
SELECT 
  auth.uid(),
  auth.uid(),
  42,
  'Male',
  178,
  82,
  'kapha'::dosha_type,
  15,
  25,
  60,
  'Weight gain, lethargy, congestion',
  'Type 2 diabetes managed with diet'
WHERE EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() LIMIT 1)
ON CONFLICT DO NOTHING;