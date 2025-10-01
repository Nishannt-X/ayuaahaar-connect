import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = ["Grains", "Vegetables", "Fruits", "Legumes", "Nuts & Seeds", "Spices", "Fats & Oils", "Main Dishes"];
const tastes = ["Sweet", "Sour", "Salty", "Pungent", "Bitter", "Astringent"];
const doshaEffects = ["+", "-", "="];

export default function AddFoodDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    selectedTastes: [] as string[],
    vata: "=",
    pitta: "=",
    kapha: "=",
    calories: "",
    protein: "",
    carbs: ""
  });

  const toggleTaste = (taste: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTastes: prev.selectedTastes.includes(taste)
        ? prev.selectedTastes.filter(t => t !== taste)
        : [...prev.selectedTastes, taste]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || formData.selectedTastes.length === 0) {
      toast({
        title: "Incomplete form",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Food added successfully",
      description: `${formData.name} has been added to the database`
    });

    // Reset form
    setFormData({
      name: "",
      category: "",
      selectedTastes: [],
      vata: "=",
      pitta: "=",
      kapha: "=",
      calories: "",
      protein: "",
      carbs: ""
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="wellness">
          <Plus className="w-4 h-4 mr-2" />
          Add Food
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Food Item</DialogTitle>
          <DialogDescription>
            Add a new food item to your Ayurvedic database with complete nutritional and dosha information
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Food Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Basmati Rice"
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Six Tastes *</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {tastes.map(taste => (
                  <Badge
                    key={taste}
                    variant={formData.selectedTastes.includes(taste) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTaste(taste)}
                  >
                    {taste}
                    {formData.selectedTastes.includes(taste) && <X className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="vata">Vata Effect</Label>
                <Select value={formData.vata} onValueChange={(value) => setFormData({...formData, vata: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {doshaEffects.map(effect => (
                      <SelectItem key={effect} value={effect}>{effect}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pitta">Pitta Effect</Label>
                <Select value={formData.pitta} onValueChange={(value) => setFormData({...formData, pitta: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {doshaEffects.map(effect => (
                      <SelectItem key={effect} value={effect}>{effect}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="kapha">Kapha Effect</Label>
                <Select value={formData.kapha} onValueChange={(value) => setFormData({...formData, kapha: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {doshaEffects.map(effect => (
                      <SelectItem key={effect} value={effect}>{effect}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="calories">Calories (per 100g)</Label>
                <Input
                  id="calories"
                  type="number"
                  value={formData.calories}
                  onChange={(e) => setFormData({...formData, calories: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  step="0.1"
                  value={formData.protein}
                  onChange={(e) => setFormData({...formData, protein: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  step="0.1"
                  value={formData.carbs}
                  onChange={(e) => setFormData({...formData, carbs: e.target.value})}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="wellness">
              Add Food
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
