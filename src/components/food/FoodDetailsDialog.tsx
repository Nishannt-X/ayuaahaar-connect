import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface FoodDetailsDialogProps {
  food: {
    name: string;
    category: string;
    tastes: string[];
    vata: string;
    pitta: string;
    kapha: string;
    calories: number;
    protein: number;
    carbs: number;
  };
  children: React.ReactNode;
}

export default function FoodDetailsDialog({ food, children }: FoodDetailsDialogProps) {
  const getDoshaColor = (effect: string) => {
    if (effect === "+") return "text-red-500";
    if (effect === "-") return "text-green-500";
    return "text-muted-foreground";
  };

  const getDoshaLabel = (effect: string) => {
    if (effect === "+") return "Increases";
    if (effect === "-") return "Decreases";
    return "Neutral";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{food.name}</DialogTitle>
          <DialogDescription>
            Complete Ayurvedic and nutritional information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Category & Tastes</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-sm">{food.category}</Badge>
              {food.tastes.map(taste => (
                <Badge key={taste} variant="secondary">{taste}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Dosha Effects</h3>
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Vata</p>
                  <p className={`text-3xl font-bold ${getDoshaColor(food.vata)}`}>{food.vata}</p>
                  <p className="text-xs text-muted-foreground mt-1">{getDoshaLabel(food.vata)}</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Pitta</p>
                  <p className={`text-3xl font-bold ${getDoshaColor(food.pitta)}`}>{food.pitta}</p>
                  <p className="text-xs text-muted-foreground mt-1">{getDoshaLabel(food.pitta)}</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Kapha</p>
                  <p className={`text-3xl font-bold ${getDoshaColor(food.kapha)}`}>{food.kapha}</p>
                  <p className="text-xs text-muted-foreground mt-1">{getDoshaLabel(food.kapha)}</p>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Nutritional Information (per 100g)</h3>
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Calories</p>
                <p className="text-2xl font-bold">{food.calories}</p>
                <p className="text-xs text-muted-foreground">kcal</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Protein</p>
                <p className="text-2xl font-bold">{food.protein}</p>
                <p className="text-xs text-muted-foreground">grams</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Carbs</p>
                <p className="text-2xl font-bold">{food.carbs}</p>
                <p className="text-xs text-muted-foreground">grams</p>
              </Card>
            </div>
          </div>

          <div className="bg-wellness-light/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Ayurvedic Properties</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Rasa (Taste):</span> {food.tastes.join(", ")}</p>
              <p><span className="font-medium">Category:</span> {food.category}</p>
              <p className="text-muted-foreground">
                This food is most suitable for balancing doshas based on its effects. 
                {food.vata === "-" && " Beneficial for Vata imbalance."}
                {food.pitta === "-" && " Beneficial for Pitta imbalance."}
                {food.kapha === "-" && " Beneficial for Kapha imbalance."}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
