import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  User, 
  Heart, 
  Brain, 
  Activity, 
  Thermometer, 
  Droplets,
  Wind,
  Calculator,
  FileText,
  CheckCircle
} from "lucide-react";

interface PatientData {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  bodyType: string;
  skinType: string;
  hairType: string;
  appetite: string;
  digestion: string;
  sleepPattern: string;
  energyLevel: string;
  stressResponse: string;
  weatherPreference: string;
  emotionalTendency: string;
  physicalActivity: string;
  currentSymptoms: string;
}

interface DoshaResult {
  vata: number;
  pitta: number;
  kapha: number;
  dominant: string;
  bodyComposition: {
    musclePercentage: number;
    fatPercentage: number;
    metabolicRate: string;
    bodyFrame: string;
  };
  recommendations: {
    diet: string[];
    lifestyle: string[];
    exercises: string[];
    precautions: string[];
  };
}

const PrakritiiAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [patientData, setPatientData] = useState<PatientData>({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    bodyType: "",
    skinType: "",
    hairType: "",
    appetite: "",
    digestion: "",
    sleepPattern: "",
    energyLevel: "",
    stressResponse: "",
    weatherPreference: "",
    emotionalTendency: "",
    physicalActivity: "",
    currentSymptoms: ""
  });

  const [results, setResults] = useState<DoshaResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const totalSteps = 4;

  // Hardcoded assessment algorithm
  const calculateDosha = (data: PatientData): DoshaResult => {
    let vataScore = 0;
    let pittaScore = 0;
    let kaphaScore = 0;

    // Body type scoring
    if (data.bodyType === "thin") vataScore += 3;
    else if (data.bodyType === "medium") pittaScore += 3;
    else if (data.bodyType === "heavy") kaphaScore += 3;

    // Skin type scoring
    if (data.skinType === "dry") vataScore += 2;
    else if (data.skinType === "oily") pittaScore += 2;
    else if (data.skinType === "normal") kaphaScore += 2;

    // Appetite scoring
    if (data.appetite === "variable") vataScore += 2;
    else if (data.appetite === "strong") pittaScore += 2;
    else if (data.appetite === "moderate") kaphaScore += 2;

    // Digestion scoring
    if (data.digestion === "irregular") vataScore += 2;
    else if (data.digestion === "strong") pittaScore += 2;
    else if (data.digestion === "slow") kaphaScore += 2;

    // Sleep pattern scoring
    if (data.sleepPattern === "light") vataScore += 2;
    else if (data.sleepPattern === "moderate") pittaScore += 2;
    else if (data.sleepPattern === "deep") kaphaScore += 2;

    // Energy level scoring
    if (data.energyLevel === "variable") vataScore += 2;
    else if (data.energyLevel === "intense") pittaScore += 2;
    else if (data.energyLevel === "steady") kaphaScore += 2;

    // Stress response scoring
    if (data.stressResponse === "anxious") vataScore += 2;
    else if (data.stressResponse === "irritable") pittaScore += 2;
    else if (data.stressResponse === "calm") kaphaScore += 2;

    // Weather preference scoring
    if (data.weatherPreference === "warm") vataScore += 2;
    else if (data.weatherPreference === "cool") pittaScore += 2;
    else if (data.weatherPreference === "moderate") kaphaScore += 2;

    // Emotional tendency scoring
    if (data.emotionalTendency === "creative") vataScore += 2;
    else if (data.emotionalTendency === "focused") pittaScore += 2;
    else if (data.emotionalTendency === "stable") kaphaScore += 2;

    const total = vataScore + pittaScore + kaphaScore;
    const vataPercentage = Math.round((vataScore / total) * 100);
    const pittaPercentage = Math.round((pittaScore / total) * 100);
    const kaphaPercentage = Math.round((kaphaScore / total) * 100);

    let dominant = "Vata";
    if (pittaScore > vataScore && pittaScore > kaphaScore) dominant = "Pitta";
    else if (kaphaScore > vataScore && kaphaScore > pittaScore) dominant = "Kapha";

    // Calculate body composition based on dosha
    const weight = parseInt(data.weight) || 70;
    const height = parseInt(data.height) || 170;
    const bmi = weight / ((height / 100) ** 2);

    let musclePercentage, fatPercentage, metabolicRate, bodyFrame;

    if (dominant === "Vata") {
      musclePercentage = 35 + Math.random() * 5;
      fatPercentage = 8 + Math.random() * 7;
      metabolicRate = "High (Variable)";
      bodyFrame = "Ectomorphic - Lean build";
    } else if (dominant === "Pitta") {
      musclePercentage = 40 + Math.random() * 8;
      fatPercentage = 12 + Math.random() * 8;
      metabolicRate = "High (Steady)";
      bodyFrame = "Mesomorphic - Athletic build";
    } else {
      musclePercentage = 35 + Math.random() * 5;
      fatPercentage = 18 + Math.random() * 10;
      metabolicRate = "Slow (Steady)";
      bodyFrame = "Endomorphic - Solid build";
    }

    // Generate recommendations based on dominant dosha
    const recommendations = {
      diet: dominant === "Vata" 
        ? ["Warm, cooked foods", "Sweet, sour, salty tastes", "Regular meal times", "Avoid cold drinks", "Include healthy fats"]
        : dominant === "Pitta"
        ? ["Cool, fresh foods", "Sweet, bitter, astringent tastes", "Avoid spicy foods", "Regular hydration", "Include cooling herbs"]
        : ["Light, warm foods", "Pungent, bitter, astringent tastes", "Avoid heavy meals", "Include digestive spices", "Reduce dairy intake"],
      
      lifestyle: dominant === "Vata"
        ? ["Regular sleep schedule", "Oil massage", "Meditation", "Avoid overstimulation", "Stay warm"]
        : dominant === "Pitta"
        ? ["Moderate exercise", "Cool environment", "Avoid excessive heat", "Practice patience", "Take breaks"]
        : ["Regular exercise", "Stay active", "Avoid daytime sleep", "Stimulating activities", "Social engagement"],
      
      exercises: dominant === "Vata"
        ? ["Gentle yoga", "Walking", "Swimming", "Tai chi", "Avoid intense cardio"]
        : dominant === "Pitta"
        ? ["Moderate cardio", "Swimming", "Cycling", "Yoga", "Avoid hot yoga"]
        : ["Vigorous exercise", "Running", "Weight training", "Hot yoga", "High-intensity activities"],
      
      precautions: dominant === "Vata"
        ? ["Avoid irregular eating", "Manage stress", "Stay hydrated", "Avoid cold weather", "Regular routine"]
        : dominant === "Pitta"
        ? ["Avoid anger triggers", "Stay cool", "Moderate sun exposure", "Avoid skipping meals", "Manage competition"]
        : ["Avoid overeating", "Stay active", "Avoid excessive sleep", "Manage weight", "Avoid cold, damp conditions"]
    };

    return {
      vata: vataPercentage,
      pitta: pittaPercentage,
      kapha: kaphaPercentage,
      dominant,
      bodyComposition: {
        musclePercentage: Math.round(musclePercentage),
        fatPercentage: Math.round(fatPercentage),
        metabolicRate,
        bodyFrame
      },
      recommendations
    };
  };

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const result = calculateDosha(patientData);
      setResults(result);
      setIsCalculating(false);
      setCurrentStep(5); // Results step
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="shadow-card rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Patient Name</Label>
                  <Input
                    id="name"
                    value={patientData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter patient name"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={patientData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Age in years"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Select onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={patientData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="Weight in kg"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={patientData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="Height in cm"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="shadow-card rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Physical Characteristics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Body Type</Label>
                <RadioGroup
                  value={patientData.bodyType}
                  onValueChange={(value) => handleInputChange("bodyType", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="thin" id="thin" />
                    <Label htmlFor="thin">Thin/Lean build</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium/Athletic build</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="heavy" id="heavy" />
                    <Label htmlFor="heavy">Heavy/Solid build</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Skin Type</Label>
                <RadioGroup
                  value={patientData.skinType}
                  onValueChange={(value) => handleInputChange("skinType", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dry" id="dry" />
                    <Label htmlFor="dry">Dry, rough skin</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oily" id="oily" />
                    <Label htmlFor="oily">Oily, warm skin</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal">Smooth, cool skin</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Hair Type</Label>
                <RadioGroup
                  value={patientData.hairType}
                  onValueChange={(value) => handleInputChange("hairType", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dry" id="dry-hair" />
                    <Label htmlFor="dry-hair">Dry, brittle hair</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fine" id="fine-hair" />
                    <Label htmlFor="fine-hair">Fine, early graying</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="thick" id="thick-hair" />
                    <Label htmlFor="thick-hair">Thick, lustrous hair</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="shadow-card rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <span>Digestive & Sleep Patterns</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Appetite</Label>
                <RadioGroup
                  value={patientData.appetite}
                  onValueChange={(value) => handleInputChange("appetite", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="variable" id="variable-appetite" />
                    <Label htmlFor="variable-appetite">Variable/Irregular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="strong" id="strong-appetite" />
                    <Label htmlFor="strong-appetite">Strong/Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate-appetite" />
                    <Label htmlFor="moderate-appetite">Moderate/Steady</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Digestion</Label>
                <RadioGroup
                  value={patientData.digestion}
                  onValueChange={(value) => handleInputChange("digestion", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="irregular" id="irregular-digestion" />
                    <Label htmlFor="irregular-digestion">Irregular/Gas prone</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="strong" id="strong-digestion" />
                    <Label htmlFor="strong-digestion">Strong/Fast</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="slow" id="slow-digestion" />
                    <Label htmlFor="slow-digestion">Slow/Heavy feeling</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Sleep Pattern</Label>
                <RadioGroup
                  value={patientData.sleepPattern}
                  onValueChange={(value) => handleInputChange("sleepPattern", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light-sleep" />
                    <Label htmlFor="light-sleep">Light/Interrupted</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate-sleep" />
                    <Label htmlFor="moderate-sleep">Moderate/Sound</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="deep" id="deep-sleep" />
                    <Label htmlFor="deep-sleep">Deep/Heavy</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="shadow-card rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>Mental & Emotional Characteristics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Energy Level</Label>
                <RadioGroup
                  value={patientData.energyLevel}
                  onValueChange={(value) => handleInputChange("energyLevel", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="variable" id="variable-energy" />
                    <Label htmlFor="variable-energy">Variable/Bursts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intense" id="intense-energy" />
                    <Label htmlFor="intense-energy">Intense/Focused</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="steady" id="steady-energy" />
                    <Label htmlFor="steady-energy">Steady/Enduring</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Stress Response</Label>
                <RadioGroup
                  value={patientData.stressResponse}
                  onValueChange={(value) => handleInputChange("stressResponse", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="anxious" id="anxious-stress" />
                    <Label htmlFor="anxious-stress">Anxious/Worried</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="irritable" id="irritable-stress" />
                    <Label htmlFor="irritable-stress">Irritable/Angry</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="calm" id="calm-stress" />
                    <Label htmlFor="calm-stress">Calm/Withdrawn</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Weather Preference</Label>
                <RadioGroup
                  value={patientData.weatherPreference}
                  onValueChange={(value) => handleInputChange("weatherPreference", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="warm" id="warm-weather" />
                    <Label htmlFor="warm-weather">Prefer warm weather</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cool" id="cool-weather" />
                    <Label htmlFor="cool-weather">Prefer cool weather</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate-weather" />
                    <Label htmlFor="moderate-weather">Prefer moderate weather</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Current Symptoms (Optional)</Label>
                <Textarea
                  value={patientData.currentSymptoms}
                  onChange={(e) => handleInputChange("currentSymptoms", e.target.value)}
                  placeholder="Describe any current health concerns or symptoms..."
                  className="rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return results && (
          <div className="space-y-6">
            {/* Dosha Results */}
            <Card className="shadow-card rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <span>Prakriti Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    Dominant Dosha: {results.dominant}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 rounded-xl dosha-vata/10 border border-dosha-vata/20">
                    <Wind className="h-8 w-8 text-dosha-vata mx-auto mb-2" />
                    <h4 className="font-semibold text-dosha-vata mb-2">Vata</h4>
                    <div className="text-2xl font-bold text-foreground">{results.vata}%</div>
                    <Progress value={results.vata} className="mt-2" />
                  </div>
                  
                  <div className="text-center p-4 rounded-xl dosha-pitta/10 border border-dosha-pitta/20">
                    <Thermometer className="h-8 w-8 text-dosha-pitta mx-auto mb-2" />
                    <h4 className="font-semibold text-dosha-pitta mb-2">Pitta</h4>
                    <div className="text-2xl font-bold text-foreground">{results.pitta}%</div>
                    <Progress value={results.pitta} className="mt-2" />
                  </div>
                  
                  <div className="text-center p-4 rounded-xl dosha-kapha/10 border border-dosha-kapha/20">
                    <Droplets className="h-8 w-8 text-dosha-kapha mx-auto mb-2" />
                    <h4 className="font-semibold text-dosha-kapha mb-2">Kapha</h4>
                    <div className="text-2xl font-bold text-foreground">{results.kapha}%</div>
                    <Progress value={results.kapha} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Body Composition */}
            <Card className="shadow-card rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Body Composition Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-xl bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-2">Muscle Mass</h4>
                    <div className="text-2xl font-bold text-primary">{results.bodyComposition.musclePercentage}%</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-2">Body Fat</h4>
                    <div className="text-2xl font-bold text-primary">{results.bodyComposition.fatPercentage}%</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-2">Metabolism</h4>
                    <div className="text-sm font-medium text-primary">{results.bodyComposition.metabolicRate}</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-2">Body Frame</h4>
                    <div className="text-sm font-medium text-primary">{results.bodyComposition.bodyFrame}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span>Dietary Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {results.recommendations.diet.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-card rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <span>Lifestyle Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {results.recommendations.lifestyle.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return patientData.name && patientData.age && patientData.gender && patientData.weight && patientData.height;
      case 2:
        return patientData.bodyType && patientData.skinType && patientData.hairType;
      case 3:
        return patientData.appetite && patientData.digestion && patientData.sleepPattern;
      case 4:
        return patientData.energyLevel && patientData.stressResponse && patientData.weatherPreference;
      default:
        return false;
    }
  };

  if (isCalculating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="shadow-elevated rounded-2xl bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="wellness-gradient p-4 rounded-full w-16 h-16 mx-auto mb-4"
            >
              <Calculator className="h-8 w-8 text-primary-foreground" />
            </motion.div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Analyzing Prakriti Constitution
            </h3>
            <p className="text-muted-foreground mb-4">
              Processing {patientData.name}'s assessment data...
            </p>
            <Progress value={65} className="w-64 mx-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Prakriti Assessment Tool
          </h1>
          <p className="text-muted-foreground">
            Complete constitutional analysis for personalized Ayurvedic recommendations
          </p>
        </motion.div>

        {/* Progress Indicator */}
        {currentStep <= 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-wellness ${
                    currentStep >= step
                      ? "wellness-gradient text-primary-foreground shadow-wellness"
                      : isStepComplete(step)
                      ? "bg-primary-soft text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isStepComplete(step) && currentStep > step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step
                  )}
                </div>
              ))}
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="mb-2" />
            <p className="text-center text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        )}

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1 || currentStep === 5}
          >
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!isStepComplete(currentStep)}
              className="wellness-gradient"
            >
              Next
            </Button>
          ) : currentStep === 4 ? (
            <Button
              onClick={handleCalculate}
              disabled={!isStepComplete(currentStep)}
              className="wellness-gradient"
            >
              Calculate Results
            </Button>
          ) : (
            <Button
              onClick={() => {
                setCurrentStep(1);
                setResults(null);
                setPatientData({
                  name: "",
                  age: "",
                  gender: "",
                  weight: "",
                  height: "",
                  bodyType: "",
                  skinType: "",
                  hairType: "",
                  appetite: "",
                  digestion: "",
                  sleepPattern: "",
                  energyLevel: "",
                  stressResponse: "",
                  weatherPreference: "",
                  emotionalTendency: "",
                  physicalActivity: "",
                  currentSymptoms: ""
                });
              }}
              variant="outline"
            >
              New Assessment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrakritiiAssessment;