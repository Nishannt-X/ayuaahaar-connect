import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Users, FileText } from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    { title: "Total Patients", value: "127", change: "+12%", icon: Users },
    { title: "Active Plans", value: "89", change: "+8%", icon: FileText },
    { title: "Avg Compliance", value: "78%", change: "+5%", icon: TrendingUp },
    { title: "Success Rate", value: "92%", change: "+3%", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Practice Analytics</h1>
        <p className="text-muted-foreground">Insights and trends across your patient base</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-wellness">{stat.change} from last month</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-wellness-light/20 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-wellness" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dosha Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Vata Dominant</span>
                <span className="text-sm text-muted-foreground">38%</span>
              </div>
              <Progress value={38} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Pitta Dominant</span>
                <span className="text-sm text-muted-foreground">32%</span>
              </div>
              <Progress value={32} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Kapha Dominant</span>
                <span className="text-sm text-muted-foreground">30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Trends</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Excellent (80-100%)</span>
                <span className="text-sm text-muted-foreground">45 patients</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Good (60-79%)</span>
                <span className="text-sm text-muted-foreground">52 patients</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Needs Improvement (&lt;60%)</span>
                <span className="text-sm text-muted-foreground">30 patients</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Common Health Concerns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { concern: "Digestive Issues", count: 45, percentage: 35 },
              { concern: "Stress & Anxiety", count: 38, percentage: 30 },
              { concern: "Sleep Problems", count: 32, percentage: 25 },
              { concern: "Weight Management", count: 28, percentage: 22 },
              { concern: "Skin Conditions", count: 24, percentage: 19 },
              { concern: "Joint Pain", count: 20, percentage: 16 },
            ].map((item) => (
              <Card key={item.concern} className="p-4">
                <p className="font-medium mb-2">{item.concern}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>{item.count} patients</span>
                  <span>{item.percentage}%</span>
                </div>
                <Progress value={item.percentage} className="h-1" />
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
