import NewAnalysisTab from "@/components/dashboard/NewAnalysisTab";

export default function AnalysisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Patient Analysis</h1>
        <p className="text-muted-foreground">Comprehensive Ayurvedic assessment for patients</p>
      </div>
      
      <NewAnalysisTab />
    </div>
  );
}
