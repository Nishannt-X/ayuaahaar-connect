import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Plus, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import NewAppointmentDialog from "@/components/appointments/NewAppointmentDialog";
import AppointmentWorkflow from "@/components/appointments/AppointmentWorkflow";

const mockAppointments = [
  { id: 1, patient: "Priya Sharma", time: "09:00 AM", date: "2024-01-20", type: "Follow-up", status: "Confirmed" },
  { id: 2, patient: "Rajesh Kumar", time: "10:30 AM", date: "2024-01-20", type: "Initial Consultation", status: "Confirmed" },
  { id: 3, patient: "Anita Patel", time: "02:00 PM", date: "2024-01-20", type: "Diet Review", status: "Pending" },
  { id: 4, patient: "Vikram Singh", time: "03:30 PM", date: "2024-01-20", type: "Follow-up", status: "Confirmed" },
  { id: 5, patient: "Meera Reddy", time: "11:00 AM", date: "2024-01-21", type: "Initial Consultation", status: "Pending" },
];

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workflowOpen, setWorkflowOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const todayAppointments = mockAppointments.filter(apt => apt.date === "2024-01-20");
  const upcomingAppointments = mockAppointments.filter(apt => apt.date !== "2024-01-20");

  const handleStartAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setWorkflowOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">Manage your patient appointments and schedule</p>
        </div>
        <NewAppointmentDialog>
          <Button variant="wellness">
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>
        </NewAppointmentDialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((apt) => (
                  <Card key={apt.id} className="p-4 hover:shadow-wellness transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-wellness-light/20 flex items-center justify-center">
                          <User className="w-6 h-6 text-wellness" />
                        </div>
                        <div>
                          <p className="font-semibold">{apt.patient}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{apt.time}</span>
                            </div>
                            <Badge variant="outline">{apt.type}</Badge>
                            <Badge variant={apt.status === "Confirmed" ? "default" : "secondary"}>
                              {apt.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button 
                          variant="wellness" 
                          size="sm"
                          onClick={() => handleStartAppointment(apt)}
                        >
                          Start
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <Card key={apt.id} className="p-4 hover:shadow-wellness transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-wellness-light/20 flex items-center justify-center">
                          <User className="w-6 h-6 text-wellness" />
                        </div>
                        <div>
                          <p className="font-semibold">{apt.patient}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <CalendarIcon className="w-3 h-3" />
                              <span>{apt.date}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{apt.time}</span>
                            </div>
                            <Badge variant="outline">{apt.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedAppointment && (
        <AppointmentWorkflow
          patient={{
            name: selectedAppointment.patient,
            type: selectedAppointment.type,
            isNewPatient: selectedAppointment.type === "Initial Consultation"
          }}
          open={workflowOpen}
          onClose={() => {
            setWorkflowOpen(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
}
