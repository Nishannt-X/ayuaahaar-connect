import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PatientAssessmentForm from "@/components/forms/PatientAssessmentForm";
import { useToast } from "@/hooks/use-toast";

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPatientAdded?: (patient: any) => void;
}

export default function AddPatientDialog({ open, onOpenChange, onPatientAdded }: AddPatientDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPatient = {
        id: `AYU${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        name: data.name,
        age: parseInt(data.age),
        gender: data.gender,
        prakriti: "Assessment Pending",
        compliance: 0,
        lastVisit: new Date().toISOString().split('T')[0],
        status: "New"
      };
      
      toast({
        title: "Patient Added",
        description: `${data.name} has been successfully added to your patients.`
      });
      
      setIsLoading(false);
      onPatientAdded?.(newPatient);
      onOpenChange(false);
    }, 1500);
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
