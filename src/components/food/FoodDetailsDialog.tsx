import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface FoodDetailsDialogProps {
  food: {
    name: string;
    category: string;
    taste: string[];
    vata_effect: string;
    pitta_effect: string;
    kapha_effect: string;
    calories_per_100g: number | null;
    protein_g: number | null;
    carbs_g: number | null;
  };
  children: React.ReactNode;
}

export default function FoodDetailsDialog({ food, children }: FoodDetailsDialogProps) {
  const getDoshaColor = (effect: string) => {
    if (effect?.toLowerCase().includes("increase")) return "text-red-500";
    if (effect?.toLowerCase().includes("decrease")) return "text-green-500";
    return "text-muted-foreground";
  };

  const getDoshaLabel = (effect: string) => {
    if (effect?.toLowerCase().includes("increase")) return "Increases";
    if (effect?.toLowerCase().includes("decrease")) return "Decreases";
    return "Balancing";
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
              {food.taste?.map(taste => (
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
                  <p className={`text-xl font-bold ${getDoshaColor(food.vata_effect)}`}>{getDoshaLabel(food.vata_effect)}</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Pitta</p>
                  <p className={`text-xl font-bold ${getDoshaColor(food.pitta_effect)}`}>{getDoshaLabel(food.pitta_effect)}</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Kapha</p>
                  <p className={`text-xl font-bold ${getDoshaColor(food.kapha_effect)}`}>{getDoshaLabel(food.kapha_effect)}</p>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Nutritional Information (per 100g)</h3>
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Calories</p>
                <p className="text-2xl font-bold">{food.calories_per_100g || 'N/A'}</p>
                <p className="text-xs text-muted-foreground">kcal</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Protein</p>
                <p className="text-2xl font-bold">{food.protein_g || 'N/A'}</p>
                <p className="text-xs text-muted-foreground">grams</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Carbs</p>
                <p className="text-2xl font-bold">{food.carbs_g || 'N/A'}</p>
                <p className="text-xs text-muted-foreground">grams</p>
              </Card>
            </div>
          </div>

          <div className="bg-wellness-light/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Ayurvedic Properties</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Rasa (Taste):</span> {food.taste?.join(", ")}</p>
              <p><span className="font-medium">Category:</span> {food.category}</p>
              <p className="text-muted-foreground">
                This food is most suitable for balancing doshas based on its effects. 
                {food.vata_effect?.toLowerCase().includes("decrease") && " Beneficial for Vata imbalance."}
                {food.pitta_effect?.toLowerCase().includes("decrease") && " Beneficial for Pitta imbalance."}
                {food.kapha_effect?.toLowerCase().includes("decrease") && " Beneficial for Kapha imbalance."}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
