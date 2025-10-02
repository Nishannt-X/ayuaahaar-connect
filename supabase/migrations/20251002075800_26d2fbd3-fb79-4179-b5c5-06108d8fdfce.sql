-- Create enum types
CREATE TYPE user_role AS ENUM ('practitioner', 'patient');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE dosha_type AS ENUM ('vata', 'pitta', 'kapha');
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'patient',
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create patients table (extended patient information)
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  practitioner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  age INTEGER,
  gender TEXT,
  height_cm DECIMAL,
  weight_kg DECIMAL,
  medical_history TEXT,
  chief_complaints TEXT,
  dominant_dosha dosha_type,
  vata_percentage INTEGER,
  pitta_percentage INTEGER,
  kapha_percentage INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(profile_id)
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  practitioner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  status appointment_status NOT NULL DEFAULT 'scheduled',
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create appointment_workflow table (tracks appointment progress)
CREATE TABLE public.appointment_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  step_title TEXT NOT NULL,
  step_description TEXT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create food_items table
CREATE TABLE public.food_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  vata_effect TEXT NOT NULL,
  pitta_effect TEXT NOT NULL,
  kapha_effect TEXT NOT NULL,
  taste TEXT[] NOT NULL,
  calories_per_100g INTEGER,
  protein_g DECIMAL,
  carbs_g DECIMAL,
  fat_g DECIMAL,
  fiber_g DECIMAL,
  added_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_custom BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create diet_plans table
CREATE TABLE public.diet_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  practitioner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  goals TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create diet_plan_meals table
CREATE TABLE public.diet_plan_meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diet_plan_id UUID NOT NULL REFERENCES public.diet_plans(id) ON DELETE CASCADE,
  meal_type TEXT NOT NULL,
  day_number INTEGER NOT NULL,
  time TEXT,
  food_items JSONB NOT NULL,
  instructions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointment_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet_plan_meals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Practitioners can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'practitioner'
    )
  );

-- RLS Policies for patients
CREATE POLICY "Practitioners can view their patients"
  ON public.patients FOR SELECT
  USING (practitioner_id = auth.uid());

CREATE POLICY "Practitioners can create patients"
  ON public.patients FOR INSERT
  WITH CHECK (practitioner_id = auth.uid());

CREATE POLICY "Practitioners can update their patients"
  ON public.patients FOR UPDATE
  USING (practitioner_id = auth.uid());

CREATE POLICY "Patients can view their own data"
  ON public.patients FOR SELECT
  USING (profile_id = auth.uid());

-- RLS Policies for appointments
CREATE POLICY "Practitioners can view their appointments"
  ON public.appointments FOR SELECT
  USING (practitioner_id = auth.uid());

CREATE POLICY "Practitioners can create appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (practitioner_id = auth.uid());

CREATE POLICY "Practitioners can update their appointments"
  ON public.appointments FOR UPDATE
  USING (practitioner_id = auth.uid());

CREATE POLICY "Patients can view their appointments"
  ON public.appointments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.patients
      WHERE patients.id = appointments.patient_id
      AND patients.profile_id = auth.uid()
    )
  );

-- RLS Policies for appointment_workflows
CREATE POLICY "Practitioners can manage workflows"
  ON public.appointment_workflows FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.appointments
      WHERE appointments.id = appointment_workflows.appointment_id
      AND appointments.practitioner_id = auth.uid()
    )
  );

-- RLS Policies for food_items
CREATE POLICY "Everyone can view food items"
  ON public.food_items FOR SELECT
  USING (true);

CREATE POLICY "Practitioners can add food items"
  ON public.food_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'practitioner'
    )
  );

CREATE POLICY "Users can update their own custom food items"
  ON public.food_items FOR UPDATE
  USING (added_by = auth.uid());

-- RLS Policies for diet_plans
CREATE POLICY "Practitioners can view their diet plans"
  ON public.diet_plans FOR SELECT
  USING (practitioner_id = auth.uid());

CREATE POLICY "Practitioners can create diet plans"
  ON public.diet_plans FOR INSERT
  WITH CHECK (practitioner_id = auth.uid());

CREATE POLICY "Practitioners can update their diet plans"
  ON public.diet_plans FOR UPDATE
  USING (practitioner_id = auth.uid());

CREATE POLICY "Patients can view their diet plans"
  ON public.diet_plans FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.patients
      WHERE patients.id = diet_plans.patient_id
      AND patients.profile_id = auth.uid()
    )
  );

-- RLS Policies for diet_plan_meals
CREATE POLICY "Users can view meals from accessible diet plans"
  ON public.diet_plan_meals FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.diet_plans
      WHERE diet_plans.id = diet_plan_meals.diet_plan_id
      AND (
        diet_plans.practitioner_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM public.patients
          WHERE patients.id = diet_plans.patient_id
          AND patients.profile_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Practitioners can manage meals"
  ON public.diet_plan_meals FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.diet_plans
      WHERE diet_plans.id = diet_plan_meals.diet_plan_id
      AND diet_plans.practitioner_id = auth.uid()
    )
  );

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'practitioner')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointment_workflows_updated_at
  BEFORE UPDATE ON public.appointment_workflows
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_food_items_updated_at
  BEFORE UPDATE ON public.food_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_diet_plans_updated_at
  BEFORE UPDATE ON public.diet_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();