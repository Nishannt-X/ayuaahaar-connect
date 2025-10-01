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
      title: "Patient Information",
      icon: User,
      items: [
        "Collect basic demographics (name, age, contact)",
        "Record medical history",
        "Note current medications",
        "Document allergies",
        "Gather family health history"
      ]
    },
    {
      title: "Prakriti Assessment",
      icon: ClipboardList,
      items: [
        "Conduct body constitution questionnaire",
        "Assess physical characteristics",
        "Evaluate mental tendencies",
        "Determine dominant dosha",
        "Document current imbalances (Vikriti)"
      ]
    },
    {
      title: "Health Evaluation",
      icon: FileText,
      items: [
        "Check pulse diagnosis (Nadi Pariksha)",
        "Examine tongue characteristics",
        "Assess digestive fire (Agni)",
        "Evaluate sleep quality",
        "Review stress levels and lifestyle"
      ]
    },
    {
      title: "Treatment Plan",
      icon: CheckCircle2,
      items: [
        "Create personalized diet plan",
        "Recommend lifestyle modifications",
        "Prescribe herbal supplements if needed",
        "Schedule follow-up appointment",
        "Provide written care instructions"
      ]
    }
  ];

  const followUpSteps = [
    {
      title: "Progress Review",
      icon: ClipboardList,
      items: [
        "Review compliance with previous recommendations",
        "Assess changes in symptoms",
        "Evaluate diet adherence",
        "Check lifestyle modifications progress",
        "Note any challenges faced"
      ]
    },
    {
      title: "Current Assessment",
      icon: FileText,
      items: [
        "Conduct pulse diagnosis",
        "Examine tongue",
        "Assess current dosha balance",
        "Evaluate energy levels",
        "Review sleep and digestion"
      ]
    },
    {
      title: "Plan Adjustment",
      icon: CheckCircle2,
      items: [
        "Modify diet plan if needed",
        "Adjust herbal recommendations",
        "Update lifestyle suggestions",
        "Set new health goals",
        "Schedule next follow-up"
      ]
    }
  ];

  const steps = isNewPatient ? newPatientSteps : followUpSteps;

  const handleCheckItem = (stepIndex: number, itemIndex: number) => {
    const key = `${stepIndex}-${itemIndex}`;
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isStepComplete = (stepIndex: number) => {
    const stepItems = steps[stepIndex].items;
    return stepItems.every((_, itemIndex) => 
      checklist[`${stepIndex}-${itemIndex}`]
    );
  };

  const canProceed = isStepComplete(currentStep);

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

            <div className="space-y-3">
              {steps[currentStep].items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id={`${currentStep}-${itemIndex}`}
                    checked={checklist[`${currentStep}-${itemIndex}`] || false}
                    onCheckedChange={() => handleCheckItem(currentStep, itemIndex)}
                  />
                  <label
                    htmlFor={`${currentStep}-${itemIndex}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {item}
                  </label>
                </div>
              ))}
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
              Complete all items to proceed to the next step
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
