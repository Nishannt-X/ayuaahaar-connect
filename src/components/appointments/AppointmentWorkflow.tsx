import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, User, FileText, ClipboardList } from "lucide-react";

interface AppointmentWorkflowProps {
  patient: {
    name: string;
    type: string;
    isNewPatient?: boolean;
  };
  open: boolean;
  onClose: () => void;
}

export default function AppointmentWorkflow({ patient, open, onClose }: AppointmentWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [checklist, setChecklist] = useState<{[key: string]: boolean}>({});
  const [notes, setNotes] = useState("");

  const isNewPatient = patient.type === "Initial Consultation";

  const newPatientSteps = [
    {
      title: "Initial Assessment",
      icon: User,
      description: "Gather patient information and conduct Prakriti assessment"
    },
    {
      title: "Health Evaluation",
      icon: FileText,
      description: "Perform pulse diagnosis, tongue examination, and assess digestive fire"
    },
    {
      title: "Treatment Plan",
      icon: CheckCircle2,
      description: "Create personalized diet plan and lifestyle recommendations"
    }
  ];

  const followUpSteps = [
    {
      title: "Progress Review",
      icon: ClipboardList,
      description: "Review compliance and assess symptom changes"
    },
    {
      title: "Current Assessment",
      icon: FileText,
      description: "Conduct pulse diagnosis and dosha balance evaluation"
    },
    {
      title: "Plan Adjustment",
      icon: CheckCircle2,
      description: "Modify diet plan and update recommendations"
    }
  ];

  const steps = isNewPatient ? newPatientSteps : followUpSteps;

  const isStepComplete = () => {
    return notes.trim().length > 0;
  };

  const canProceed = isStepComplete();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const StepIcon = steps[currentStep].icon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Appointment: {patient.name}</span>
            <Badge variant={isNewPatient ? "default" : "secondary"}>
              {patient.type}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {isNewPatient ? "Complete initial consultation workflow" : "Follow-up appointment checklist"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  idx < currentStep ? "bg-wellness border-wellness text-white" :
                  idx === currentStep ? "border-wellness text-wellness" :
                  "border-muted text-muted-foreground"
                }`}>
                  {idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    idx < currentStep ? "bg-wellness" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Current step */}
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-wellness-light/20 flex items-center justify-center">
                <StepIcon className="w-6 h-6 text-wellness" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{steps[currentStep].title}</h3>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">{steps[currentStep].description}</p>
            </div>
          </Card>

          {/* Notes section */}
          <div>
            <label className="text-sm font-medium mb-2 block">Session Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record important observations, patient feedback, or any special considerations..."
              rows={4}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              variant="wellness"
              onClick={handleNext}
              disabled={!canProceed}
            >
              {currentStep === steps.length - 1 ? "Complete Session" : "Next Step"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {!canProceed && (
            <p className="text-sm text-muted-foreground text-center">
              Add notes to proceed to the next step
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
