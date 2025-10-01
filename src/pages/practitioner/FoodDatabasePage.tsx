import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FOOD_DATABASE = [
  { name: "Rice (White)", category: "Grains", tastes: ["Sweet"], vata: "+", pitta: "=", kapha: "+", calories: 130, protein: 2.7, carbs: 28 },
  { name: "Kitchari", category: "Main Dishes", tastes: ["Sweet", "Astringent"], vata: "=", pitta: "=", kapha: "=", calories: 180, protein: 8, carbs: 32 },
  { name: "Ghee", category: "Fats & Oils", tastes: ["Sweet"], vata: "-", pitta: "-", kapha: "+", calories: 120, protein: 0, carbs: 0 },
  { name: "Almonds", category: "Nuts & Seeds", tastes: ["Sweet"], vata: "-", pitta: "=", kapha: "+", calories: 160, protein: 6, carbs: 6 },
  { name: "Ginger", category: "Spices", tastes: ["Pungent", "Sweet"], vata: "-", pitta: "+", kapha: "-", calories: 5, protein: 0.2, carbs: 1 },
  { name: "Turmeric", category: "Spices", tastes: ["Bitter", "Pungent"], vata: "=", pitta: "=", kapha: "-", calories: 8, protein: 0.3, carbs: 1.4 },
  { name: "Mung Dal", category: "Legumes", tastes: ["Sweet", "Astringent"], vata: "=", pitta: "-", kapha: "-", calories: 105, protein: 7, carbs: 19 },
  { name: "Spinach", category: "Vegetables", tastes: ["Bitter", "Astringent"], vata: "+", pitta: "-", kapha: "-", calories: 7, protein: 0.9, carbs: 1.1 },
  { name: "Sweet Potato", category: "Vegetables", tastes: ["Sweet"], vata: "-", pitta: "=", kapha: "+", calories: 86, protein: 1.6, carbs: 20 },
  { name: "Dates", category: "Fruits", tastes: ["Sweet"], vata: "-", pitta: "=", kapha: "+", calories: 66, protein: 0.4, carbs: 18 },
];

const categories = ["All", "Grains", "Vegetables", "Fruits", "Legumes", "Nuts & Seeds", "Spices", "Fats & Oils", "Main Dishes"];

export default function FoodDatabasePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFoods = FOOD_DATABASE.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDoshaColor = (effect: string) => {
    if (effect === "+") return "text-red-500";
    if (effect === "-") return "text-green-500";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Food Database</h1>
          <p className="text-muted-foreground">Comprehensive Ayurvedic food properties and nutritional information</p>
        </div>
        <Button variant="wellness">
          <Plus className="w-4 h-4 mr-2" />
          Add Custom Food
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-9">
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4 mt-6">
          <div className="grid gap-4">
            {filteredFoods.map((food, idx) => (
              <Card key={idx} className="hover:shadow-wellness transition-all duration-300">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div className="md:col-span-2">
                      <h3 className="font-semibold text-lg mb-2">{food.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{food.category}</Badge>
                        {food.tastes.map(taste => (
                          <Badge key={taste} variant="secondary" className="text-xs">{taste}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Dosha Effects</p>
                      <div className="flex items-center space-x-3">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">V</p>
                          <p className={`font-semibold ${getDoshaColor(food.vata)}`}>{food.vata}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">P</p>
                          <p className={`font-semibold ${getDoshaColor(food.pitta)}`}>{food.pitta}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">K</p>
                          <p className={`font-semibold ${getDoshaColor(food.kapha)}`}>{food.kapha}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Nutrition (per 100g)</p>
                      <div className="space-y-1">
                        <p className="text-sm">Calories: {food.calories}</p>
                        <p className="text-sm">Protein: {food.protein}g</p>
                        <p className="text-sm">Carbs: {food.carbs}g</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="wellness" size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
