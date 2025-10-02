-- Add some sample patients with proper data
INSERT INTO public.patients (
  practitioner_id,
  full_name,
  email,
  phone,
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
  id,
  'Priya Sharma',
  'priya.sharma@example.com',
  '+91-9876543210',
  35,
  'Female',
  165,
  58,
  'pitta',
  20,
  50,
  30,
  'Acid reflux, skin rashes, frequent headaches',
  'No major medical conditions. Occasional digestive issues.'
FROM public.profiles 
WHERE role = 'practitioner'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.patients (
  practitioner_id,
  full_name,
  email,
  phone,
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
  id,
  'Rajesh Kumar',
  'rajesh.kumar@example.com',
  '+91-9876543211',
  42,
  'Male',
  178,
  82,
  'kapha',
  15,
  25,
  60,
  'Weight gain, lethargy, congestion',
  'Type 2 diabetes managed with diet'
FROM public.profiles 
WHERE role = 'practitioner'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Add sample appointments
INSERT INTO public.appointments (
  practitioner_id,
  patient_id,
  title,
  scheduled_at,
  duration_minutes,
  status,
  notes
)
SELECT 
  p.id,
  pt.id,
  'Initial Consultation',
  NOW() + INTERVAL '2 days',
  60,
  'scheduled',
  'First visit for dosha assessment'
FROM public.profiles p
CROSS JOIN public.patients pt
WHERE p.role = 'practitioner' AND pt.full_name = 'Priya Sharma'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO public.appointments (
  practitioner_id,
  patient_id,
  title,
  scheduled_at,
  duration_minutes,
  status,
  notes
)
SELECT 
  p.id,
  pt.id,
  'Follow-up Consultation',
  NOW() - INTERVAL '3 days',
  45,
  'completed',
  'Reviewed diet plan progress'
FROM public.profiles p
CROSS JOIN public.patients pt
WHERE p.role = 'practitioner' AND pt.full_name = 'Rajesh Kumar'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Add sample diet plan
INSERT INTO public.diet_plans (
  practitioner_id,
  patient_id,
  plan_name,
  duration_days,
  goals,
  notes
)
SELECT 
  p.id,
  pt.id,
  'Pitta Balancing Diet',
  30,
  'Reduce inflammation, improve digestion, cool body heat',
  'Focus on cooling foods, avoid spicy and fried items'
FROM public.profiles p
CROSS JOIN public.patients pt
WHERE p.role = 'practitioner' AND pt.full_name = 'Priya Sharma'
LIMIT 1
ON CONFLICT DO NOTHING
RETURNING id;