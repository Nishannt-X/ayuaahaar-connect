import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface AssessmentData {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  bowelHabits: string;
  sleepPattern: string;
  appetite: string;
  stressLevel: string;
  physicalActivity: string;
  medicalConditions: string;
  currentDiet: string;
  foodPreferences: string[];
  digestiveIssues: string[];
}

interface PatientAssessmentFormProps {
  onSubmit: (data: AssessmentData) => void;
  isLoading?: boolean;
}

export default function PatientAssessmentForm({ onSubmit, isLoading }: PatientAssessmentFormProps) {
  const [formData, setFormData] = useState<AssessmentData>({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    bowelHabits: "",
    sleepPattern: "",
    appetite: "",
    stressLevel: "",
    physicalActivity: "",
    medicalConditions: "",
    currentDiet: "",
    foodPreferences: [],
    digestiveIssues: []
  });

  const { toast } = useToast();

  const handleInputChange = (field: keyof AssessmentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: 'foodPreferences' | 'digestiveIssues', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.age || !formData.gender) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Assessment Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter patient name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Enter age"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="Enter weight"
              />
            </div>
          </div>

          {/* Ayurvedic Assessment */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bowelHabits">Bowel Habits</Label>
              <Select value={formData.bowelHabits} onValueChange={(value) => handleInputChange('bowelHabits', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bowel pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular (once daily)</SelectItem>
                  <SelectItem value="irregular">Irregular</SelectItem>
                  <SelectItem value="constipated">Constipated</SelectItem>
                  <SelectItem value="loose">Loose/frequent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleepPattern">Sleep Pattern</Label>
              <Select value={formData.sleepPattern} onValueChange={(value) => handleInputChange('sleepPattern', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sleep pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sound">Sound sleep</SelectItem>
                  <SelectItem value="light">Light sleeper</SelectItem>
                  <SelectItem value="disturbed">Disturbed sleep</SelectItem>
                  <SelectItem value="insomnia">Insomnia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="appetite">Appetite Level</Label>
              <Select value={formData.appetite} onValueChange={(value) => handleInputChange('appetite', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select appetite level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strong">Strong/Good</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="poor">Poor/Low</SelectItem>
                  <SelectItem value="irregular">Irregular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stressLevel">Stress Level</Label>
              <Select value={formData.stressLevel} onValueChange={(value) => handleInputChange('stressLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stress level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="chronic">Chronic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Food Preferences */}
          <div className="space-y-3">
            <Label>Food Preferences</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Sweet', 'Sour', 'Salty', 'Pungent', 'Bitter', 'Astringent', 'Spicy', 'Cold foods', 'Hot foods'].map((taste) => (
                <div key={taste} className="flex items-center space-x-2">
                  <Checkbox
                    id={taste}
                    checked={formData.foodPreferences.includes(taste)}
                    onCheckedChange={(checked) => handleCheckboxChange('foodPreferences', taste, checked as boolean)}
                  />
                  <Label htmlFor={taste} className="text-sm">{taste}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentDiet">Current Diet Pattern</Label>
              <Textarea
                id="currentDiet"
                value={formData.currentDiet}
                onChange={(e) => handleInputChange('currentDiet', e.target.value)}
                placeholder="Describe current eating habits, meal timing, etc."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <Textarea
                id="medicalConditions"
                value={formData.medicalConditions}
                onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                placeholder="List any existing medical conditions, medications, allergies"
                rows={3}
              />
            </div>
          </div>

          <Button type="submit" variant="wellness" className="w-full" disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Generate Ayurvedic Analysis"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}