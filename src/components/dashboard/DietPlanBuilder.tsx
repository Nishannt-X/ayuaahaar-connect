import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, X, Camera, Upload, Save, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DietPlanBuilderProps {
  patient: any;
  onSave: (dietPlan: any) => void;
  onClose: () => void;
}

const MEAL_CATEGORIES = [
  { id: "earlyMorning", label: "Early Morning", time: "6:00 AM" },
  { id: "breakfast", label: "Breakfast", time: "8:00 AM" },
  { id: "morningSnack", label: "Mid-Morning Snack", time: "11:00 AM" },
  { id: "lunch", label: "Lunch", time: "1:00 PM" },
  { id: "eveningSnack", label: "Evening Snack", time: "4:00 PM" },
  { id: "dinner", label: "Dinner", time: "7:00 PM" },
  { id: "bedtime", label: "Bedtime", time: "9:30 PM" }
];

const SAMPLE_FOODS = [
  { name: "Warm water with lemon", category: "Beverage", tastes: ["Sour"], effect: "Warming" },
  { name: "Oatmeal", category: "Grain", tastes: ["Sweet"], effect: "Grounding" },
  { name: "Almonds", category: "Nuts", tastes: ["Sweet"], effect: "Nourishing" },
  { name: "Kitchari", category: "Main", tastes: ["Sweet", "Astringent"], effect: "Balancing" },
  { name: "Steamed vegetables", category: "Vegetable", tastes: ["Sweet", "Bitter"], effect: "Cooling" },
  { name: "Herbal tea", category: "Beverage", tastes: ["Bitter", "Astringent"], effect: "Calming" },
  { name: "Fresh fruits", category: "Fruit", tastes: ["Sweet"], effect: "Cooling" },
  { name: "Ghee", category: "Fat", tastes: ["Sweet"], effect: "Nourishing" },
  { name: "Ginger tea", category: "Beverage", tastes: ["Pungent"], effect: "Warming" },
  { name: "Rice", category: "Grain", tastes: ["Sweet"], effect: "Grounding" }
];

export default function DietPlanBuilder({ patient, onSave, onClose }: DietPlanBuilderProps) {
  const { toast } = useToast();
  const [dietPlan, setDietPlan] = useState<Record<string, string[]>>({});
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const addFoodToMeal = (mealId: string, foodName: string) => {
    setDietPlan(prev => ({
      ...prev,
      [mealId]: [...(prev[mealId] || []), foodName]
    }));
    toast({
      title: "Food added",
      description: `${foodName} added to ${MEAL_CATEGORIES.find(m => m.id === mealId)?.label}`
    });
  };

  const removeFoodFromMeal = (mealId: string, foodIndex: number) => {
    setDietPlan(prev => ({
      ...prev,
      [mealId]: prev[mealId].filter((_, idx) => idx !== foodIndex)
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
        toast({
          title: "Photo uploaded",
          description: "Diet prescription photo has been uploaded successfully"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAIDietPlan = () => {
    // Simulate AI generation
    const aiPlan: Record<string, string[]> = {
      earlyMorning: ["Warm water with lemon"],
      breakfast: ["Oatmeal", "Almonds", "Herbal tea"],
      morningSnack: ["Fresh fruits"],
      lunch: ["Kitchari", "Steamed vegetables", "Rice"],
      eveningSnack: ["Ginger tea", "Handful of nuts"],
      dinner: ["Light soup", "Steamed greens", "Ghee with rice"],
      bedtime: ["Warm milk with turmeric"]
    };
    setDietPlan(aiPlan);
    setNotes(`AI-generated plan for ${patient.prakriti} constitution. Emphasis on warm, cooked foods to balance Vata-Pitta.`);
    toast({
      title: "AI Plan Generated",
      description: "Diet plan has been auto-generated based on patient's Prakriti"
    });
  };

  const filteredFoods = SAMPLE_FOODS.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    onSave({
      patientId: patient.id,
      meals: dietPlan,
      notes,
      photo: uploadedPhoto,
      createdAt: new Date().toISOString()
    });
    toast({
      title: "Diet plan saved",
      description: `Diet plan for ${patient.name} has been saved successfully`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Create Diet Plan</h2>
          <p className="text-muted-foreground">For {patient.name} ({patient.prakriti})</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={generateAIDietPlan}>
            <Sparkles className="w-4 h-4 mr-2" />
            AI Generate
          </Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="wellness" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Plan
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Diet Prescription Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-wellness-light/10 transition-colors">
                <Camera className="w-4 h-4" />
                <span>Take Photo</span>
              </div>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-wellness-light/10 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Photo</span>
              </div>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
          </div>
          {uploadedPhoto && (
            <div className="mt-4">
              <img src={uploadedPhoto} alt="Diet prescription" className="max-w-md rounded-lg border" />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {MEAL_CATEGORIES.map(meal => (
            <Card key={meal.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{meal.label}</CardTitle>
                    <p className="text-sm text-muted-foreground">{meal.time}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedMeal(meal.id)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Food
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {dietPlan[meal.id]?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {dietPlan[meal.id].map((food, idx) => (
                      <Badge key={idx} variant="secondary" className="px-3 py-1">
                        {food}
                        <button
                          onClick={() => removeFoodFromMeal(meal.id, idx)}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No foods added yet</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Food Database</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search foods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {filteredFoods.map((food, idx) => (
                  <div
                    key={idx}
                    className="p-3 border rounded-lg hover:bg-wellness-light/10 transition-colors cursor-pointer"
                    onClick={() => selectedMeal && addFoodToMeal(selectedMeal, food.name)}
                  >
                    <p className="font-medium">{food.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs">{food.category}</Badge>
                      <span className="text-xs text-muted-foreground">{food.effect}</span>
                    </div>
                  </div>
                ))}
              </div>
              {selectedMeal && (
                <p className="text-sm text-wellness font-medium">
                  Click foods to add to {MEAL_CATEGORIES.find(m => m.id === selectedMeal)?.label}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dietary Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add special instructions, precautions, or notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
