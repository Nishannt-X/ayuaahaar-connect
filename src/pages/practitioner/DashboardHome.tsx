import { motion } from "framer-motion";
import { Users, FileText, BarChart3, UserPlus, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const stats = [
  { title: "Total Patients", value: "127", icon: Users, trend: "+12%", link: "/practitioner-dashboard/patients" },
  { title: "Active Plans", value: "89", icon: FileText, trend: "+8%", link: "/practitioner-dashboard/diet-plans" },
  { title: "Avg Compliance", value: "78%", icon: BarChart3, trend: "+5%", link: "/practitioner-dashboard/analytics" },
  { title: "This Month", value: "23", icon: UserPlus, trend: "+15%", link: "/practitioner-dashboard/analytics" }
];

const recentActivity = [
  { patient: "Priya Sharma", action: "Completed diet plan review", time: "2 hours ago" },
  { patient: "Rajesh Kumar", action: "New appointment scheduled", time: "4 hours ago" },
  { patient: "Anita Patel", action: "Updated health assessment", time: "1 day ago" },
];

const upcomingAppointments = [
  { patient: "Vikram Singh", time: "09:00 AM", type: "Follow-up" },
  { patient: "Meera Reddy", time: "11:00 AM", type: "Initial Consultation" },
];

export default function DashboardHome() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, Dr. Ayush</h1>
        <p className="text-muted-foreground">Here's what's happening with your practice today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="cursor-pointer hover:shadow-wellness transition-all duration-300" onClick={() => navigate(stat.link)}>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today's Appointments</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/practitioner-dashboard/appointments')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((apt, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-wellness-light/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-wellness" />
                    <div>
                      <p className="font-medium">{apt.patient}</p>
                      <p className="text-sm text-muted-foreground">{apt.type}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{apt.time}</p>
                </div>
              ))}
              <Button variant="wellness" className="w-full" onClick={() => navigate('/practitioner-dashboard/appointments')}>
                <Calendar className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-wellness mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.patient}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24" onClick={() => navigate('/practitioner-dashboard/analysis')}>
              <div className="text-center">
                <UserPlus className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">New Patient</p>
              </div>
            </Button>
            <Button variant="outline" className="h-24" onClick={() => navigate('/practitioner-dashboard/patients')}>
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">View Patients</p>
              </div>
            </Button>
            <Button variant="outline" className="h-24" onClick={() => navigate('/practitioner-dashboard/diet-plans')}>
              <div className="text-center">
                <FileText className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">Create Diet Plan</p>
              </div>
            </Button>
            <Button variant="outline" className="h-24" onClick={() => navigate('/practitioner-dashboard/analytics')}>
              <div className="text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">View Analytics</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
