import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddFoodDialog from "@/components/food/AddFoodDialog";
import FoodDetailsDialog from "@/components/food/FoodDetailsDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const categories = ["All", "Grains", "Vegetables", "Fruits", "Legumes", "Nuts", "Spices", "Fats", "Sweeteners"];

export default function FoodDatabasePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .order('name');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load food items",
        variant: "destructive",
      });
    } else {
      setFoods(data || []);
    }
    setLoading(false);
  };

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDoshaColor = (effect: string) => {
    if (effect.toLowerCase().includes("increase")) return "text-red-500";
    if (effect.toLowerCase().includes("decrease")) return "text-green-500";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Food Database</h1>
          <p className="text-muted-foreground">Comprehensive Ayurvedic food properties and nutritional information</p>
        </div>
        <AddFoodDialog onFoodAdded={fetchFoods} />
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
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading food database...</p>
            </div>
          ) : filteredFoods.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No food items found. Add your first food item to get started.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredFoods.map((food) => (
                <Card key={food.id} className="hover:shadow-wellness transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div className="md:col-span-2">
                        <h3 className="font-semibold text-lg mb-2">{food.name}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{food.category}</Badge>
                          {food.taste?.map((taste: string) => (
                            <Badge key={taste} variant="secondary" className="text-xs">{taste}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Dosha Effects</p>
                        <div className="flex items-center space-x-3">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">V</p>
                            <p className={`font-semibold text-xs ${getDoshaColor(food.vata_effect)}`}>
                              {food.vata_effect?.substring(0, 3)}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">P</p>
                            <p className={`font-semibold text-xs ${getDoshaColor(food.pitta_effect)}`}>
                              {food.pitta_effect?.substring(0, 3)}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">K</p>
                            <p className={`font-semibold text-xs ${getDoshaColor(food.kapha_effect)}`}>
                              {food.kapha_effect?.substring(0, 3)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Nutrition (per 100g)</p>
                        <div className="space-y-1">
                          <p className="text-sm">Calories: {food.calories_per_100g || 'N/A'}</p>
                          <p className="text-sm">Protein: {food.protein_g || 'N/A'}g</p>
                          <p className="text-sm">Carbs: {food.carbs_g || 'N/A'}g</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-end">
                        <FoodDetailsDialog food={food}>
                          <Button variant="outline" size="sm">View Details</Button>
                        </FoodDetailsDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}