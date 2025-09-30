import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, FileText, Users, BarChart3, Settings, UserPlus, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// Mock data for patients
const mockPatients = [
  {
    id: "AYU001",
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    prakriti: "Vata-Pitta",
    compliance: 85,
    lastVisit: "2024-01-15",
    status: "Active"
  },
  {
    id: "AYU002", 
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    prakriti: "Kapha-Vata",
    compliance: 67,
    lastVisit: "2024-01-12",
    status: "Follow-up"
  },
  {
    id: "AYU003",
    name: "Anita Patel",
    age: 28,
    gender: "Female", 
    prakriti: "Pitta",
    compliance: 92,
    lastVisit: "2024-01-18",
    status: "Active"
  }
];

const stats = [
  { title: "Total Patients", value: "127", icon: Users, trend: "+12%" },
  { title: "Active Plans", value: "89", icon: FileText, trend: "+8%" },
  { title: "Avg Compliance", value: "78%", icon: BarChart3, trend: "+5%" },
  { title: "This Month", value: "23", icon: UserPlus, trend: "+15%" }
];

export default function PractitionerDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-light/10 via-background to-wellness-light/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-wellness flex items-center justify-center">
                <span className="text-white font-semibold">Dr</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-wellness">AyuAahaar</h1>
                <p className="text-sm text-muted-foreground">Practitioner Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="wellness" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Patient
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-wellness">{stat.trend} from last month</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-wellness-light/20 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-wellness" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="analysis">New Analysis</TabsTrigger>
            <TabsTrigger value="plans">Diet Plans</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Patient Management</CardTitle>
                    <CardDescription>Manage your patient records and treatment plans</CardDescription>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="wellness">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Patient
                    </Button>
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
                      <TableRow key={patient.id}>
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
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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
          </TabsContent>

          {/* New Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>New Patient Analysis</CardTitle>
                <CardDescription>Start comprehensive Ayurvedic assessment for new or existing patients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 cursor-pointer hover:shadow-wellness transition-all duration-300 border-wellness-muted/20">
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

                  <Card className="p-6 cursor-pointer hover:shadow-wellness transition-all duration-300 border-wellness-muted/20">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wellness-light/20 flex items-center justify-center">
                        <Users className="w-8 h-8 text-wellness" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Existing Patient Review</h3>
                      <p className="text-muted-foreground mb-4">Update assessment and modify treatment plan</p>
                      <Button variant="outline" className="w-full">
                        Select Patient
                      </Button>
                    </div>
                  </Card>
                </div>

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
          </TabsContent>

          {/* Diet Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Diet Plan Management</CardTitle>
                <CardDescription>Create, manage and customize diet plans for your patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-6 cursor-pointer hover:shadow-wellness transition-all duration-300">
                    <h3 className="font-semibold mb-2">AI-Generated Plans</h3>
                    <p className="text-sm text-muted-foreground mb-4">Auto-generate personalized diet plans based on patient analysis</p>
                    <Button variant="wellness" size="sm">Generate Plan</Button>
                  </Card>
                  
                  <Card className="p-6 cursor-pointer hover:shadow-wellness transition-all duration-300">
                    <h3 className="font-semibold mb-2">Custom Food Selection</h3>
                    <p className="text-sm text-muted-foreground mb-4">Hand-pick foods from our comprehensive Ayurvedic database</p>
                    <Button variant="outline" size="sm">Browse Foods</Button>
                  </Card>
                  
                  <Card className="p-6 cursor-pointer hover:shadow-wellness transition-all duration-300">
                    <h3 className="font-semibold mb-2">Template Library</h3>
                    <p className="text-sm text-muted-foreground mb-4">Access pre-built templates for common conditions</p>
                    <Button variant="outline" size="sm">View Templates</Button>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Practice Analytics</CardTitle>
                <CardDescription>Insights and trends across your patient base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                  <p className="text-muted-foreground">Comprehensive practice analytics and patient insights</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}