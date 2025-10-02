import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PatientAssessmentForm from "@/components/forms/PatientAssessmentForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPatientAdded?: (patient: any) => void;
}

export default function AddPatientDialog({ open, onOpenChange, onPatientAdded }: AddPatientDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (data: any) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add patients",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Create a patient profile first
      const { data: profileData, error: profileError } = await supabase.auth.signUp({
        email: data.email,
        password: Math.random().toString(36).slice(-12), // Generate random password
        options: {
          data: {
            full_name: data.name,
            role: 'patient'
          }
        }
      });

      if (profileError) throw profileError;

      if (!profileData.user) throw new Error("Failed to create patient profile");

      // Create patient record
      const { error: patientError } = await supabase
        .from('patients')
        .insert({
          profile_id: profileData.user.id,
          practitioner_id: user.id,
          age: parseInt(data.age) || null,
          gender: data.gender || null,
          height_cm: parseFloat(data.height) || null,
          weight_kg: parseFloat(data.weight) || null,
          medical_history: data.medicalHistory || null,
          chief_complaints: data.chiefComplaints || null,
          dominant_dosha: data.dominantDosha || null,
          vata_percentage: parseInt(data.vata) || null,
          pitta_percentage: parseInt(data.pitta) || null,
          kapha_percentage: parseInt(data.kapha) || null,
        });

      if (patientError) throw patientError;
      
      toast({
        title: "Patient Added",
        description: `${data.name} has been successfully added to your patients.`
      });
      
      setIsLoading(false);
      onPatientAdded?.(profileData.user);
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add patient",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Complete the patient assessment form to add a new patient
          </DialogDescription>
        </DialogHeader>
        <PatientAssessmentForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
}