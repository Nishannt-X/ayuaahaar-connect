import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Eye, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DietPlanBuilder from "@/components/dashboard/DietPlanBuilder";
import DietPlanView from "@/components/dashboard/DietPlanView";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function DietPlansPage() {
  const { toast } = useToast();
  const location = useLocation();
  const initialPatient = location.state?.patient;
  const { user } = useAuth();
  
  const [selectedPatient, setSelectedPatient] = useState<any | null>(initialPatient);
  const [view, setView] = useState<'list' | 'builder' | 'view'>(initialPatient ? 'builder' : 'list');
  const [dietPlans, setDietPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDietPlan, setSelectedDietPlan] = useState<any | null>(null);

  useEffect(() => {
    if (user) {
      fetchDietPlans();
    }
  }, [user]);

  const fetchDietPlans = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('diet_plans')
      .select('*, patient:patients!diet_plans_patient_id_fkey(*), meals:diet_plan_meals(*)')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load diet plans",
        variant: "destructive",
      });
    } else {
      // Convert meals array to meals object for easier viewing
      const plansWithMeals = data?.map(plan => {
        const mealsMap: Record<string, string[]> = {};
        plan.meals?.forEach((meal: any) => {
          if (!mealsMap[meal.meal_type]) {
            mealsMap[meal.meal_type] = [];
          }
          if (Array.isArray(meal.food_items)) {
            mealsMap[meal.meal_type].push(...meal.food_items);
          }
        });
        return {
          ...plan,
          meals: mealsMap
        };
      });
      setDietPlans(plansWithMeals || []);
    }
    setLoading(false);
  };

  const handleSaveDietPlan = async (dietPlan: any) => {
    if (!selectedPatient?.id || !user) return;

    try {
      let planId = selectedDietPlan?.id;

      // Check if we're editing an existing plan
      if (selectedDietPlan?.id) {
        // Update existing plan
        const { error } = await supabase
          .from('diet_plans')
          .update({
            plan_name: dietPlan.planName || "Custom Diet Plan",
            duration_days: dietPlan.duration || 30,
            goals: dietPlan.goals || null,
            notes: dietPlan.notes || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', selectedDietPlan.id);

        if (error) throw error;

        // Delete existing meals
        await supabase
          .from('diet_plan_meals')
          .delete()
          .eq('diet_plan_id', selectedDietPlan.id);
      } else {
        // Create new plan
        const { data, error } = await supabase
          .from('diet_plans')
          .insert({
            patient_id: selectedPatient.id,
            practitioner_id: user.id,
            plan_name: dietPlan.planName || "Custom Diet Plan",
            duration_days: dietPlan.duration || 30,
            goals: dietPlan.goals || null,
            notes: dietPlan.notes || null,
          })
          .select()
          .single();

        if (error) throw error;
        planId = data.id;
      }

      // Save meals
      if (dietPlan.meals && Object.keys(dietPlan.meals).length > 0) {
        const mealsToInsert = Object.entries(dietPlan.meals).map(([mealType, foods]) => ({
          diet_plan_id: planId,
          meal_type: mealType,
          day_number: 1,
          food_items: foods as string[],
        }));

        const { error: mealsError } = await supabase
          .from('diet_plan_meals')
          .insert(mealsToInsert);

        if (mealsError) throw mealsError;
      }

      toast({
        title: "Success",
        description: selectedDietPlan?.id ? "Diet plan has been updated successfully" : "Diet plan has been saved successfully"
      });
      
      fetchDietPlans();
      setView('list');
      setSelectedPatient(null);
      setSelectedDietPlan(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save diet plan",
        variant: "destructive",
      });
      console.error('Error saving diet plan:', error);
    }
  };

  if (view === 'view' && selectedPatient && selectedDietPlan) {
    return (
      <DietPlanView
        patient={selectedPatient}
        dietPlan={selectedDietPlan}
        onClose={() => {
          setView('list');
          setSelectedPatient(null);
          setSelectedDietPlan(null);
        }}
        onEdit={() => setView('builder')}
      />
    );
  }

  if (view === 'builder' && selectedPatient) {
    return (
      <div className="space-y-6">
        <DietPlanBuilder
          patient={selectedPatient}
          existingPlan={selectedDietPlan}
          onSave={handleSaveDietPlan}
          onClose={() => {
            setView('list');
            setSelectedPatient(null);
            setSelectedDietPlan(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Diet Plans</h1>
        <p className="text-muted-foreground">Create, manage and customize diet plans for your patients</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Diet Plans</CardTitle>
          <CardDescription>View and manage diet plans for all patients</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading diet plans...</p>
            </div>
          ) : dietPlans.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No diet plans yet. Create your first diet plan from the Patients page.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dietPlans.map((plan) => (
                <Card key={plan.id} className="p-4 hover:shadow-wellness transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-wellness-light/20 flex items-center justify-center">
                        <span className="font-semibold text-wellness">
                          {plan.patient?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{plan.patient?.full_name || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground">
                          {plan.plan_name} • Duration: {plan.duration_days} days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedPatient(plan.patient);
                          setSelectedDietPlan(plan);
                          setView('view');
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        variant="wellness" 
                        size="sm"
                        onClick={() => {
                          setSelectedPatient(plan.patient);
                          setSelectedDietPlan(plan);
                          setView('builder');
                        }}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Edit Plan
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}