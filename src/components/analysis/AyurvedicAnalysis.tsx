import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalysisResult {
  patientName: string;
  prakriti: {
    vata: number;
    pitta: number;
    kapha: number;
    dominant: string;
  };
  bodyComposition: {
    bmi: number;
    agni: string;
    ojas: string;
    ama: string;
  };
  recommendations: {
    diet: string[];
    lifestyle: string[];
    herbs: string[];
    precautions: string[];
  };
  sixTastes: {
    sweet: number;
    sour: number;
    salty: number;
    pungent: number;
    bitter: number;
    astringent: number;
  };
}

interface AyurvedicAnalysisProps {
  result: AnalysisResult;
}

export default function AyurvedicAnalysis({ result }: AyurvedicAnalysisProps) {
  const getDoshaColor = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case 'vata': return 'bg-blue-500';
      case 'pitta': return 'bg-red-500';
      case 'kapha': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Ayurvedic Analysis Results
            <Badge variant="secondary">{result.patientName}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="prakriti" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="prakriti">Prakriti</TabsTrigger>
              <TabsTrigger value="body">Body Analysis</TabsTrigger>
              <TabsTrigger value="tastes">Six Tastes</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="prakriti" className="space-y-4">
              <div className="grid gap-4">
                <div className="text-center p-4 bg-wellness-light/10 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Dominant Constitution</h3>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {result.prakriti.dominant}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Vata</span>
                    <span className="text-sm">{result.prakriti.vata}%</span>
                  </div>
                  <Progress value={result.prakriti.vata} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Pitta</span>
                    <span className="text-sm">{result.prakriti.pitta}%</span>
                  </div>
                  <Progress value={result.prakriti.pitta} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Kapha</span>
                    <span className="text-sm">{result.prakriti.kapha}%</span>
                  </div>
                  <Progress value={result.prakriti.kapha} className="h-3" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="body" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Physical Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>BMI:</span>
                      <Badge variant="outline">{result.bodyComposition.bmi}</Badge>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Ayurvedic Parameters</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Agni (Digestive Fire):</span>
                      <Badge variant="secondary">{result.bodyComposition.agni}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Ojas (Immunity):</span>
                      <Badge variant="secondary">{result.bodyComposition.ojas}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Ama (Toxins):</span>
                      <Badge variant="secondary">{result.bodyComposition.ama}</Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tastes" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(result.sixTastes).map(([taste, percentage]) => (
                  <Card key={taste} className="p-4 text-center">
                    <h4 className="font-semibold capitalize mb-2">{taste}</h4>
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <div className="w-16 h-16 rounded-full bg-wellness-light/20 flex items-center justify-center">
                        <span className="text-lg font-bold">{percentage}%</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-3 text-wellness">Dietary Recommendations</h4>
                  <ul className="space-y-2">
                    {result.recommendations.diet.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 rounded-full bg-wellness mt-2"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-3 text-wellness">Lifestyle Recommendations</h4>
                  <ul className="space-y-2">
                    {result.recommendations.lifestyle.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 rounded-full bg-wellness mt-2"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-3 text-wellness">Herbal Recommendations</h4>
                  <ul className="space-y-2">
                    {result.recommendations.herbs.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 rounded-full bg-wellness mt-2"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-3 text-red-600">Precautions</h4>
                  <ul className="space-y-2">
                    {result.recommendations.precautions.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}