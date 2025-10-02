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

  const calculateDoshaPercentages = (data: any) => {
    // Simple prakriti calculation based on common indicators
    let vata = 0, pitta = 0, kapha = 0;
    
    // Age factor
    const age = parseInt(data.age || "0");
    if (age < 30) vata += 10;
    else if (age < 50) pitta += 10;
    else kapha += 10;
    
    // Gender factor
    if (data.gender === 'male') pitta += 5;
    else if (data.gender === 'female') kapha += 5;
    
    // Body weight factor
    const weight = parseFloat(data.weight || "0");
    if (weight < 60) vata += 15;
    else if (weight > 80) kapha += 15;
    else pitta += 10;
    
    // Medical conditions indicators
    const medical = (data.medicalConditions || "").toLowerCase();
    if (medical.includes("anxiety") || medical.includes("dry") || medical.includes("irregular")) vata += 10;
    if (medical.includes("inflammation") || medical.includes("acidity") || medical.includes("heat")) pitta += 10;
    if (medical.includes("congestion") || medical.includes("weight") || medical.includes("lethargy")) kapha += 10;
    
    // Bowel habits
    if (data.bowelHabits === 'irregular' || data.bowelHabits === 'constipated') vata += 15;
    if (data.bowelHabits === 'loose') pitta += 15;
    if (data.bowelHabits === 'regular') kapha += 5;
    
    // Sleep patterns
    if (data.sleepPattern === 'light' || data.sleepPattern === 'insomnia') vata += 15;
    if (data.sleepPattern === 'disturbed') pitta += 10;
    if (data.sleepPattern === 'sound') kapha += 10;
    
    // Appetite
    if (data.appetite === 'irregular') vata += 10;
    if (data.appetite === 'strong') pitta += 10;
    if (data.appetite === 'poor') kapha += 10;
    
    // Stress level
    if (data.stressLevel === 'high' || data.stressLevel === 'chronic') vata += 10;
    if (data.stressLevel === 'moderate') pitta += 5;
    
    // Food preferences
    const preferences = data.foodPreferences || [];
    if (preferences.includes('Cold foods')) vata += 5;
    if (preferences.includes('Spicy') || preferences.includes('Pungent')) pitta += 5;
    if (preferences.includes('Sweet')) kapha += 5;
    
    // Normalize to ensure total is 100
    const total = vata + pitta + kapha;
    if (total === 0) {
      return { vata: 33, pitta: 34, kapha: 33, dominant: 'vata' as const, dominantDisplay: 'vata-pitta-kapha' };
    }
    
    vata = Math.round((vata / total) * 100);
    pitta = Math.round((pitta / total) * 100);
    kapha = 100 - vata - pitta;
    
    // Determine dominant dosha
    const doshas = [
      { name: 'vata' as const, value: vata },
      { name: 'pitta' as const, value: pitta },
      { name: 'kapha' as const, value: kapha }
    ].sort((a, b) => b.value - a.value);
    
    const dominant = doshas[0].name;
    const dominantDisplay = Math.abs(doshas[0].value - doshas[1].value) < 10
      ? `${doshas[0].name}-${doshas[1].name}`
      : doshas[0].name;
    
    return { vata, pitta, kapha, dominant, dominantDisplay };
  };

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
      const doshaResults = calculateDoshaPercentages(data);
      
      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .insert([{
          practitioner_id: user.id,
          full_name: data.name,
          age: parseInt(data.age) || null,
          gender: data.gender || null,
          height_cm: parseFloat(data.height) || null,
          weight_kg: parseFloat(data.weight) || null,
          medical_history: data.medicalConditions || null,
          chief_complaints: data.currentDiet || null,
          dominant_dosha: doshaResults.dominant,
          vata_percentage: doshaResults.vata,
          pitta_percentage: doshaResults.pitta,
          kapha_percentage: doshaResults.kapha,
        }])
        .select()
        .single();

      if (patientError) throw patientError;
      
      toast({
        title: "Patient Added",
        description: `${data.name} has been successfully added. Prakriti: ${doshaResults.dominantDisplay.toUpperCase()}`
      });
      
      setIsLoading(false);
      onPatientAdded?.(patientData);
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