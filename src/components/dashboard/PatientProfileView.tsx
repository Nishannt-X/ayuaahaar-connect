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
          <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
          <p className="text-muted-foreground">ID: {patient.id}</p>
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
              {patient.prakriti}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Compliance Rate</p>
            <div className="flex items-center space-x-3">
              <Progress value={patient.compliance} className="flex-1" />
              <span className="text-xl font-bold">{patient.compliance}%</span>
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
                vata={35} 
                pitta={40} 
                kapha={25} 
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Observations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-wellness mt-2"></div>
                  <div>
                    <p className="font-medium">Agni Status</p>
                    <p className="text-sm text-muted-foreground">Moderate digestive fire, needs stimulation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-wellness mt-2"></div>
                  <div>
                    <p className="font-medium">Ama Levels</p>
                    <p className="text-sm text-muted-foreground">Low toxin accumulation, good elimination</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-wellness mt-2"></div>
                  <div>
                    <p className="font-medium">Ojas Quality</p>
                    <p className="text-sm text-muted-foreground">Medium immunity, recommend strengthening herbs</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Diet Adherence</span>
                    <span className="text-sm text-muted-foreground">{patient.compliance}%</span>
                  </div>
                  <Progress value={patient.compliance} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Symptom Improvement</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Energy Levels</span>
                    <span className="text-sm text-muted-foreground">68%</span>
                  </div>
                  <Progress value={68} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Sleep Quality</span>
                    <span className="text-sm text-muted-foreground">82%</span>
                  </div>
                  <Progress value={82} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
