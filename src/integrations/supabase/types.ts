export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointment_workflows: {
        Row: {
          appointment_id: string
          completed: boolean
          created_at: string
          id: string
          notes: string | null
          step_description: string | null
          step_number: number
          step_title: string
          updated_at: string
        }
        Insert: {
          appointment_id: string
          completed?: boolean
          created_at?: string
          id?: string
          notes?: string | null
          step_description?: string | null
          step_number: number
          step_title: string
          updated_at?: string
        }
        Update: {
          appointment_id?: string
          completed?: boolean
          created_at?: string
          id?: string
          notes?: string | null
          step_description?: string | null
          step_number?: number
          step_title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointment_workflows_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          completed_at: string | null
          created_at: string
          duration_minutes: number
          id: string
          notes: string | null
          patient_id: string
          practitioner_id: string
          scheduled_at: string
          status: Database["public"]["Enums"]["appointment_status"]
          title: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          notes?: string | null
          patient_id: string
          practitioner_id: string
          scheduled_at: string
          status?: Database["public"]["Enums"]["appointment_status"]
          title: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          notes?: string | null
          patient_id?: string
          practitioner_id?: string
          scheduled_at?: string
          status?: Database["public"]["Enums"]["appointment_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_practitioner_id_fkey"
            columns: ["practitioner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      diet_plan_meals: {
        Row: {
          created_at: string
          day_number: number
          diet_plan_id: string
          food_items: Json
          id: string
          instructions: string | null
          meal_type: string
          time: string | null
        }
        Insert: {
          created_at?: string
          day_number: number
          diet_plan_id: string
          food_items: Json
          id?: string
          instructions?: string | null
          meal_type: string
          time?: string | null
        }
        Update: {
          created_at?: string
          day_number?: number
          diet_plan_id?: string
          food_items?: Json
          id?: string
          instructions?: string | null
          meal_type?: string
          time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diet_plan_meals_diet_plan_id_fkey"
            columns: ["diet_plan_id"]
            isOneToOne: false
            referencedRelation: "diet_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      diet_plans: {
        Row: {
          created_at: string
          duration_days: number
          goals: string | null
          id: string
          notes: string | null
          patient_id: string
          plan_name: string
          practitioner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          duration_days: number
          goals?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          plan_name: string
          practitioner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          duration_days?: number
          goals?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          plan_name?: string
          practitioner_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "diet_plans_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diet_plans_practitioner_id_fkey"
            columns: ["practitioner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      food_items: {
        Row: {
          added_by: string | null
          calories_per_100g: number | null
          carbs_g: number | null
          category: string
          created_at: string
          fat_g: number | null
          fiber_g: number | null
          id: string
          is_custom: boolean
          kapha_effect: string
          name: string
          pitta_effect: string
          protein_g: number | null
          taste: string[]
          updated_at: string
          vata_effect: string
        }
        Insert: {
          added_by?: string | null
          calories_per_100g?: number | null
          carbs_g?: number | null
          category: string
          created_at?: string
          fat_g?: number | null
          fiber_g?: number | null
          id?: string
          is_custom?: boolean
          kapha_effect: string
          name: string
          pitta_effect: string
          protein_g?: number | null
          taste: string[]
          updated_at?: string
          vata_effect: string
        }
        Update: {
          added_by?: string | null
          calories_per_100g?: number | null
          carbs_g?: number | null
          category?: string
          created_at?: string
          fat_g?: number | null
          fiber_g?: number | null
          id?: string
          is_custom?: boolean
          kapha_effect?: string
          name?: string
          pitta_effect?: string
          protein_g?: number | null
          taste?: string[]
          updated_at?: string
          vata_effect?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_items_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          age: number | null
          chief_complaints: string | null
          created_at: string
          dominant_dosha: Database["public"]["Enums"]["dosha_type"] | null
          email: string | null
          full_name: string | null
          gender: string | null
          height_cm: number | null
          id: string
          kapha_percentage: number | null
          medical_history: string | null
          phone: string | null
          pitta_percentage: number | null
          practitioner_id: string
          profile_id: string | null
          updated_at: string
          vata_percentage: number | null
          weight_kg: number | null
        }
        Insert: {
          age?: number | null
          chief_complaints?: string | null
          created_at?: string
          dominant_dosha?: Database["public"]["Enums"]["dosha_type"] | null
          email?: string | null
          full_name?: string | null
          gender?: string | null
          height_cm?: number | null
          id?: string
          kapha_percentage?: number | null
          medical_history?: string | null
          phone?: string | null
          pitta_percentage?: number | null
          practitioner_id: string
          profile_id?: string | null
          updated_at?: string
          vata_percentage?: number | null
          weight_kg?: number | null
        }
        Update: {
          age?: number | null
          chief_complaints?: string | null
          created_at?: string
          dominant_dosha?: Database["public"]["Enums"]["dosha_type"] | null
          email?: string | null
          full_name?: string | null
          gender?: string | null
          height_cm?: number | null
          id?: string
          kapha_percentage?: number | null
          medical_history?: string | null
          phone?: string | null
          pitta_percentage?: number | null
          practitioner_id?: string
          profile_id?: string | null
          updated_at?: string
          vata_percentage?: number | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_practitioner_id_fkey"
            columns: ["practitioner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patients_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_practitioner: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      appointment_status: "scheduled" | "completed" | "cancelled"
      dosha_type: "vata" | "pitta" | "kapha"
      priority_level: "low" | "medium" | "high"
      user_role: "practitioner" | "patient"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      appointment_status: ["scheduled", "completed", "cancelled"],
      dosha_type: ["vata", "pitta", "kapha"],
      priority_level: ["low", "medium", "high"],
      user_role: ["practitioner", "patient"],
    },
  },
} as const
