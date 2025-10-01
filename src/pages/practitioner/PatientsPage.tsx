import { useState } from "react";
import { Search, UserPlus, Eye, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import PatientProfileView from "@/components/dashboard/PatientProfileView";

const mockPatients = [
  { id: "AYU001", name: "Priya Sharma", age: 32, gender: "Female", prakriti: "Vata-Pitta", compliance: 85, lastVisit: "2024-01-15", status: "Active" },
  { id: "AYU002", name: "Rajesh Kumar", age: 45, gender: "Male", prakriti: "Kapha-Vata", compliance: 67, lastVisit: "2024-01-12", status: "Follow-up" },
  { id: "AYU003", name: "Anita Patel", age: 28, gender: "Female", prakriti: "Pitta", compliance: 92, lastVisit: "2024-01-18", status: "Active" },
  { id: "AYU004", name: "Vikram Singh", age: 38, gender: "Male", prakriti: "Kapha-Pitta", compliance: 71, lastVisit: "2024-01-14", status: "Active" },
  { id: "AYU005", name: "Meera Reddy", age: 52, gender: "Female", prakriti: "Vata", compliance: 88, lastVisit: "2024-01-16", status: "Follow-up" },
];

export default function PatientsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedPatient) {
    return (
      <PatientProfileView
        patient={selectedPatient}
        onClose={() => setSelectedPatient(null)}
        onCreateDietPlan={(patient) => {
          navigate('/practitioner-dashboard/diet-plans', { state: { patient } });
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patient Management</h1>
          <p className="text-muted-foreground">Manage your patient records and treatment plans</p>
        </div>
        <Button variant="wellness" onClick={() => navigate('/practitioner-dashboard/analysis')}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Patients</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Prakriti</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-wellness-light/5">
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}Y, {patient.gender}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-wellness border-wellness">
                      {patient.prakriti}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={patient.compliance} className="w-16" />
                      <span className="text-sm">{patient.compliance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(patient)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate('/practitioner-dashboard/diet-plans', { state: { patient } })}
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
