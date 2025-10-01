import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Eye, FileText, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DietPlanBuilder from "@/components/dashboard/DietPlanBuilder";
import { useToast } from "@/hooks/use-toast";

const mockPatients = [
  { id: "AYU001", name: "Priya Sharma", age: 32, gender: "Female", prakriti: "Vata-Pitta", lastVisit: "2024-01-15" },
  { id: "AYU002", name: "Rajesh Kumar", age: 45, gender: "Male", prakriti: "Kapha-Vata", lastVisit: "2024-01-12" },
  { id: "AYU003", name: "Anita Patel", age: 28, gender: "Female", prakriti: "Pitta", lastVisit: "2024-01-18" },
];

export default function DietPlansPage() {
  const { toast } = useToast();
  const location = useLocation();
  const initialPatient = location.state?.patient;
  
  const [selectedPatient, setSelectedPatient] = useState<any | null>(initialPatient);
  const [view, setView] = useState<'list' | 'builder'>(initialPatient ? 'builder' : 'list');

  const handleSaveDietPlan = (dietPlan: any) => {
    console.log("Diet plan saved:", dietPlan);
    toast({
      title: "Success",
      description: "Diet plan has been saved successfully"
    });
    setView('list');
    setSelectedPatient(null);
  };

  if (view === 'builder' && selectedPatient) {
    return (
      <div className="space-y-6">
        <DietPlanBuilder
          patient={selectedPatient}
          onSave={handleSaveDietPlan}
          onClose={() => {
            setView('list');
            setSelectedPatient(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Diet Plans</h1>
        <p className="text-muted-foreground">Create, manage and customize diet plans for your patients</p>
      </div>


      <Card>
        <CardHeader>
          <CardTitle>Recent Diet Plans</CardTitle>
          <CardDescription>View and manage diet plans for all patients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPatients.map((patient) => (
              <Card key={patient.id} className="p-4 hover:shadow-wellness transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-wellness-light/20 flex items-center justify-center">
                      <span className="font-semibold text-wellness">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">{patient.prakriti} • Last updated: {patient.lastVisit}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedPatient(patient);
                        setView('builder');
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="wellness" 
                      size="sm"
                      onClick={() => {
                        setSelectedPatient(patient);
                        setView('builder');
                      }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Edit Plan
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
