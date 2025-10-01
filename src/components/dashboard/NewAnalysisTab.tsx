import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Users, ArrowLeft } from "lucide-react";
import PatientAssessmentForm from "@/components/forms/PatientAssessmentForm";
import AyurvedicAnalysis from "@/components/analysis/AyurvedicAnalysis";

type ViewState = 'selection' | 'assessment' | 'results';

export default function NewAnalysisTab() {
  const [currentView, setCurrentView] = useState<ViewState>('selection');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAssessmentSubmit = async (formData: any) => {
    setIsLoading(true);
    
    // Simulate analysis processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock analysis result based on form data
    const result = {
      patientName: formData.name,
      prakriti: {
        vata: Math.floor(Math.random() * 40 + 20),
        pitta: Math.floor(Math.random() * 40 + 20),
        kapha: Math.floor(Math.random() * 40 + 20),
        dominant: "Vata-Pitta"
      },
      bodyComposition: {
        bmi: formData.weight && formData.height ? 
          (parseInt(formData.weight) / Math.pow(parseInt(formData.height)/100, 2)).toFixed(1) : "22.5",
        agni: formData.appetite === "strong" ? "Strong" : formData.appetite === "poor" ? "Weak" : "Moderate",
        ojas: formData.stressLevel === "low" ? "High" : formData.stressLevel === "high" ? "Low" : "Medium",
        ama: formData.bowelHabits === "regular" ? "Low" : "Moderate"
      },
      recommendations: {
        diet: [
          "Include warm, cooked foods",
          "Favor sweet, sour, and salty tastes",
          "Avoid cold and raw foods",
          "Regular meal times",
          "Include ghee and warm spices"
        ],
        lifestyle: [
          "Regular sleep schedule (10 PM - 6 AM)",
          "Daily oil massage",
          "Gentle yoga and pranayama",
          "Meditation for stress management",
          "Regular routine maintenance"
        ],
        herbs: [
          "Ashwagandha for stress management",
          "Triphala for digestion",
          "Brahmi for mental clarity",
          "Ginger for digestive fire",
          "Tulsi for immunity"
        ],
        precautions: [
          "Avoid excessive raw foods",
          "Limit caffeine intake",
          "Avoid irregular meal times",
          "Manage stress levels",
          "Don't skip meals"
        ]
      },
      sixTastes: {
        sweet: 25,
        sour: 15,
        salty: 10,
        pungent: 20,
        bitter: 15,
        astringent: 15
      }
    };

    // Adjust prakriti percentages to total 100%
    const total = result.prakriti.vata + result.prakriti.pitta + result.prakriti.kapha;
    result.prakriti.vata = Math.round((result.prakriti.vata / total) * 100);
    result.prakriti.pitta = Math.round((result.prakriti.pitta / total) * 100);
    result.prakriti.kapha = 100 - result.prakriti.vata - result.prakriti.pitta;
    
    // Determine dominant dosha
    const maxDosha = Math.max(result.prakriti.vata, result.prakriti.pitta, result.prakriti.kapha);
    if (result.prakriti.vata === maxDosha) {
      result.prakriti.dominant = result.prakriti.pitta > result.prakriti.kapha ? "Vata-Pitta" : "Vata-Kapha";
    } else if (result.prakriti.pitta === maxDosha) {
      result.prakriti.dominant = result.prakriti.vata > result.prakriti.kapha ? "Pitta-Vata" : "Pitta-Kapha";
    } else {
      result.prakriti.dominant = result.prakriti.vata > result.prakriti.pitta ? "Kapha-Vata" : "Kapha-Pitta";
    }

    setAnalysisResult(result);
    setIsLoading(false);
    setCurrentView('results');
  };

  const renderView = () => {
    switch (currentView) {
      case 'selection':
        return (
          <Card>
            <CardHeader>
              <CardTitle>New Patient Analysis</CardTitle>
              <CardDescription>Start comprehensive Ayurvedic assessment for new or existing patients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card 
                className="p-6 cursor-pointer hover:shadow-wellness transition-all duration-300 border-wellness-muted/20 max-w-md mx-auto"
                onClick={() => setCurrentView('assessment')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wellness-light/20 flex items-center justify-center">
                    <UserPlus className="w-8 h-8 text-wellness" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">New Patient Assessment</h3>
                  <p className="text-muted-foreground mb-4">Complete intake form and prakriti analysis for new patients</p>
                  <Button variant="wellness" className="w-full">
                    Start New Assessment
                  </Button>
                </div>
              </Card>

              <div className="bg-wellness-light/10 rounded-lg p-6">
                <h4 className="font-semibold mb-3">Assessment Features</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-wellness"></div>
                    <span className="text-sm">Comprehensive Prakriti Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-wellness"></div>
                    <span className="text-sm">Body Composition Assessment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-wellness"></div>
                    <span className="text-sm">Digestive Fire (Agni) Evaluation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-wellness"></div>
                    <span className="text-sm">Six Tastes Preference Analysis</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'assessment':
        return (
          <div className="space-y-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('selection')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Selection</span>
            </Button>
            <PatientAssessmentForm 
              onSubmit={handleAssessmentSubmit} 
              isLoading={isLoading}
            />
          </div>
        );

      case 'results':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('selection')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>New Analysis</span>
              </Button>
              <div className="space-x-2">
                <Button variant="outline">Save to Records</Button>
                <Button variant="wellness">Generate Diet Plan</Button>
              </div>
            </div>
            {analysisResult && <AyurvedicAnalysis result={analysisResult} />}
          </div>
        );

      default:
        return null;
    }
  };

  return renderView();
}