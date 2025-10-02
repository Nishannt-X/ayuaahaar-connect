import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Clock } from "lucide-react";

interface DietPlanViewProps {
  patient: any;
  dietPlan?: any;
  onClose: () => void;
  onEdit?: () => void;
}

const MEAL_CATEGORIES = [
  { id: "earlyMorning", label: "Early Morning", time: "6:00 AM", icon: "🌅" },
  { id: "breakfast", label: "Breakfast", time: "8:00 AM", icon: "🍳" },
  { id: "morningSnack", label: "Mid-Morning Snack", time: "11:00 AM", icon: "🥤" },
  { id: "lunch", label: "Lunch", time: "1:00 PM", icon: "🍽️" },
  { id: "eveningSnack", label: "Evening Snack", time: "4:00 PM", icon: "☕" },
  { id: "dinner", label: "Dinner", time: "7:00 PM", icon: "🌙" },
  { id: "bedtime", label: "Bedtime", time: "9:30 PM", icon: "🛏️" }
];

export default function DietPlanView({ patient, dietPlan, onClose, onEdit }: DietPlanViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Diet Plan - {patient.full_name || patient.name}</h2>
          <p className="text-muted-foreground">Prakriti: {patient.dominant_dosha || patient.prakriti || 'Not assessed'}</p>
        </div>
        <div className="flex items-center space-x-2">
          {onEdit && (
            <Button variant="wellness" onClick={onEdit}>
              Edit Plan
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
        </div>
      </div>

      {dietPlan?.photo && (
        <Card>
          <CardHeader>
            <CardTitle>Prescribed Diet Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={dietPlan.photo} alt="Diet prescription" className="max-w-full rounded-lg border" />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {MEAL_CATEGORIES.map((meal) => (
          <Card key={meal.id} className="overflow-hidden">
            <CardHeader className="bg-wellness-light/10 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{meal.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{meal.label}</CardTitle>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{meal.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {dietPlan?.meals?.[meal.id]?.length > 0 ? (
                <div className="space-y-2">
                  {dietPlan.meals[meal.id].map((food: string, idx: number) => (
                    <div 
                      key={idx} 
                      className="flex items-center p-3 bg-background rounded-lg border"
                    >
                      <div className="w-2 h-2 rounded-full bg-wellness mr-3" />
                      <span className="font-medium">{food}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No items specified for this meal</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {dietPlan?.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes & Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{dietPlan.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
