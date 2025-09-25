import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import DoshaChart from "@/components/dosha/DoshaChart";
import { motion } from "framer-motion";
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Utensils,
  TrendingUp,
  AlertCircle,
  Plus,
  Heart,
  Activity
} from "lucide-react";

const PatientDashboard = () => {
  const [completedMeals, setCompletedMeals] = useState(3);
  const totalMeals = 4;
  const compliancePercentage = Math.round((completedMeals / totalMeals) * 100);

  // Mock data for patient
  const patientData = {
    name: "Sarah Johnson",
    dosha: { vata: 45, pitta: 35, kapha: 20 },
    dominantDosha: "Vata-Pitta",
    nextAppointment: "March 15, 2024 at 2:00 PM"
  };

  const todaysMeals = [
    {
      id: 1,
      name: "Warm Oatmeal with Almonds",
      time: "7:00 AM",
      type: "Breakfast",
      completed: true,
      reason: "Warm, grounding foods balance Vata constitution"
    },
    {
      id: 2,
      name: "Quinoa Vegetable Bowl",
      time: "12:30 PM",
      type: "Lunch",
      completed: true,
      reason: "Light, cooling foods support Pitta balance"
    },
    {
      id: 3,
      name: "Herbal Tea & Fruits",
      time: "4:00 PM",
      type: "Snack",
      completed: true,
      reason: "Hydrating and energizing for afternoon Vata time"
    },
    {
      id: 4,
      name: "Spiced Lentil Soup",
      time: "7:30 PM",
      type: "Dinner",
      completed: false,
      reason: "Warm, nourishing meal to settle Vata in evening"
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "reminder",
      message: "Time for your evening meal - Spiced Lentil Soup",
      time: "30 min ago"
    },
    {
      id: 2,
      type: "achievement",
      message: "Great job! 3 days of 80%+ compliance",
      time: "2 hours ago"
    },
    {
      id: 3,
      type: "tip",
      message: "Try gentle yoga before dinner to balance Vata",
      time: "1 day ago"
    }
  ];

  const toggleMealCompletion = (mealId: number) => {
    const meal = todaysMeals.find(m => m.id === mealId);
    if (meal && !meal.completed) {
      setCompletedMeals(prev => prev + 1);
      meal.completed = true;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {patientData.name}
          </h1>
          <p className="text-muted-foreground">
            Today's wellness journey continues
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dosha Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <DoshaChart
                vata={patientData.dosha.vata}
                pitta={patientData.dosha.pitta}
                kapha={patientData.dosha.kapha}
              />
            </motion.div>

            {/* Today's Meals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-card rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Utensils className="h-5 w-5 text-primary" />
                    <span>Today's Meal Plan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {todaysMeals.map((meal, index) => (
                    <motion.div
                      key={meal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`p-4 rounded-xl border transition-wellness ${
                        meal.completed
                          ? "bg-primary-soft/20 border-primary/30"
                          : "bg-muted/50 border-border hover:border-primary/20"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {meal.type}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {meal.time}
                            </span>
                          </div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {meal.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {meal.reason}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant={meal.completed ? "default" : "outline"}
                          onClick={() => toggleMealCompletion(meal.id)}
                          disabled={meal.completed}
                          className="ml-4"
                        >
                          {meal.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Compliance Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="shadow-card rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Today's Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {compliancePercentage}%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Meal Compliance
                    </p>
                  </div>
                  <Progress value={compliancePercentage} className="mb-4" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{completedMeals}/{totalMeals} meals</span>
                    <span>Excellent!</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Next Appointment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="shadow-card rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Next Appointment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="font-medium text-foreground mb-2">
                      Dr. Priya Sharma
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {patientData.nextAppointment}
                    </p>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="shadow-card rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <span>Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 rounded-lg bg-muted/50 border border-border"
                    >
                      <div className="flex items-start space-x-2">
                        {notification.type === "reminder" && (
                          <Clock className="h-4 w-4 text-primary mt-0.5" />
                        )}
                        {notification.type === "achievement" && (
                          <Heart className="h-4 w-4 text-dosha-pitta mt-0.5" />
                        )}
                        {notification.type === "tip" && (
                          <Activity className="h-4 w-4 text-dosha-kapha mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm text-foreground mb-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;