import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar, FileText, TrendingUp, Camera, Plus } from "lucide-react";
import DoshaChart from "@/components/dosha/DoshaChart";

interface PatientProfileViewProps {
  patient: any;
  onClose: () => void;
  onCreateDietPlan: (patient: any) => void;
}

export default function PatientProfileView({ patient, onClose, onCreateDietPlan }: PatientProfileViewProps) {
  const [selectedTab, setSelectedTab] = useState("overview");

  const mockVisitHistory = [
    { date: "2024-01-15", complaint: "Digestive issues", treatment: "Triphala, Diet modification" },
    { date: "2023-12-10", complaint: "Stress management", treatment: "Ashwagandha, Meditation guidance" },
    { date: "2023-11-05", complaint: "Initial consultation", treatment: "Prakriti assessment" }
  ];

  const mockDietPlan = {
    breakfast: ["Oatmeal with almonds", "Herbal tea", "Fresh fruit"],
    morningSnack: ["Handful of nuts", "Warm water with honey"],
    lunch: ["Kitchari", "Steamed vegetables", "Rice"],
    eveningSnack: ["Herbal tea", "Dates"],
    dinner: ["Light soup", "Chapati", "Cooked greens"],
    notes: "Avoid cold foods, prefer warm meals"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{patient.full_name || patient.name}</h2>
          <p className="text-muted-foreground">
            {patient.email && `${patient.email} • `}
            {patient.phone && patient.phone}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button variant="wellness" onClick={() => onCreateDietPlan(patient)}>
            <Plus className="w-4 h-4 mr-2" />
            New Diet Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Age / Gender</p>
            <p className="text-2xl font-bold">{patient.age}Y / {patient.gender}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Prakriti Type</p>
            <Badge variant="outline" className="text-wellness border-wellness text-lg">
              {patient.dominant_dosha?.toUpperCase() || 'Not Assessed'}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Health Metrics</p>
            <div className="text-sm space-y-1">
              <p>Height: {patient.height_cm || 'N/A'} cm</p>
              <p>Weight: {patient.weight_kg || 'N/A'} kg</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Visit History</TabsTrigger>
          <TabsTrigger value="diet">Current Diet</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dosha Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <DoshaChart 
                vata={patient.vata_percentage || 33} 
                pitta={patient.pitta_percentage || 33} 
                kapha={patient.kapha_percentage || 34} 
              />
            </CardContent>
          </Card>

          {(patient.chief_complaints || patient.medical_history) && (
            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.chief_complaints && (
                    <div>
                      <p className="font-medium mb-2">Chief Complaints</p>
                      <p className="text-sm text-muted-foreground">{patient.chief_complaints}</p>
                    </div>
                  )}
                  {patient.medical_history && (
                    <div>
                      <p className="font-medium mb-2">Medical History</p>
                      <p className="text-sm text-muted-foreground">{patient.medical_history}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {mockVisitHistory.map((visit, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-wellness-light/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-wellness" />
                    </div>
                    <div>
                      <p className="font-semibold">{visit.date}</p>
                      <p className="text-sm text-muted-foreground mt-1">Chief Complaint: {visit.complaint}</p>
                      <p className="text-sm mt-2">Treatment: {visit.treatment}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="diet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Diet Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(mockDietPlan).map(([meal, items]) => {
                if (meal === 'notes') return null;
                return (
                  <div key={meal} className="border-b pb-4 last:border-b-0">
                    <h4 className="font-semibold mb-2 capitalize">{meal.replace(/([A-Z])/g, ' $1').trim()}</h4>
                    <ul className="space-y-1">
                      {(items as string[]).map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-wellness"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              <div className="bg-wellness-light/10 p-4 rounded-lg mt-4">
                <p className="text-sm font-medium">Dietary Notes:</p>
                <p className="text-sm text-muted-foreground mt-1">{mockDietPlan.notes}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Progress tracking data will be available after appointments</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
