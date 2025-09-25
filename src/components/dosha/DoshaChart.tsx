import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DoshaData {
  name: string;
  value: number;
  color: string;
}

interface DoshaChartProps {
  vata: number;
  pitta: number;
  kapha: number;
  className?: string;
}

const DoshaChart = ({ vata, pitta, kapha, className }: DoshaChartProps) => {
  const data: DoshaData[] = [
    { name: "Vata", value: vata, color: "hsl(var(--vata))" },
    { name: "Pitta", value: pitta, color: "hsl(var(--pitta))" },
    { name: "Kapha", value: kapha, color: "hsl(var(--kapha))" },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-card">
          <p className="font-medium">{data.name}</p>
          <p className="text-muted-foreground">{data.value}%</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex justify-center space-x-6 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className={`shadow-card ${className}`}>
      <CardHeader>
        <CardTitle className="text-center text-foreground">Your Dosha Constitution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Dosha Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 rounded-xl dosha-vata/10 border border-dosha-vata/20">
            <h4 className="font-semibold text-dosha-vata mb-2">Vata ({vata}%)</h4>
            <p className="text-xs text-muted-foreground">Air & Space - Movement, creativity, nervous system</p>
          </div>
          <div className="text-center p-4 rounded-xl dosha-pitta/10 border border-dosha-pitta/20">
            <h4 className="font-semibold text-dosha-pitta mb-2">Pitta ({pitta}%)</h4>
            <p className="text-xs text-muted-foreground">Fire & Water - Metabolism, digestion, transformation</p>
          </div>
          <div className="text-center p-4 rounded-xl dosha-kapha/10 border border-dosha-kapha/20">
            <h4 className="font-semibold text-dosha-kapha mb-2">Kapha ({kapha}%)</h4>
            <p className="text-xs text-muted-foreground">Earth & Water - Structure, immunity, stability</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoshaChart;