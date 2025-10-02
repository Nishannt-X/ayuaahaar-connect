import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, Plus, User, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import NewAppointmentDialog from "@/components/appointments/NewAppointmentDialog";
import AppointmentWorkflow from "@/components/appointments/AppointmentWorkflow";
import RescheduleDialog from "@/components/appointments/RescheduleDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [workflowOpen, setWorkflowOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [rescheduleAppointment, setRescheduleAppointment] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*, patient:patients!appointments_patient_id_fkey(*)')
      .order('scheduled_at', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load appointments",
        variant: "destructive",
      });
    } else {
      setAppointments(data || []);
    }
    setLoading(false);
  };

  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.scheduled_at);
    const today = new Date();
    return aptDate.toDateString() === today.toDateString() && apt.status === 'scheduled';
  });

  const upcomingAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.scheduled_at);
    const today = new Date();
    return aptDate > today && apt.status === 'scheduled';
  });

  const completedAppointments = appointments.filter(apt => apt.status === 'completed');

  const handleStartAppointment = async (appointment: any) => {
    setSelectedAppointment(appointment);
    setWorkflowOpen(true);
  };

  const handleCompleteAppointment = async () => {
    if (!selectedAppointment) return;

    const { error } = await supabase
      .from('appointments')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('id', selectedAppointment.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to mark appointment as completed",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Appointment completed successfully",
      });
      fetchAppointments();
      setWorkflowOpen(false);
      setSelectedAppointment(null);
    }
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;

    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', appointmentId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Appointment deleted successfully"
      });
      
      fetchAppointments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete appointment",
        variant: "destructive",
      });
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">Manage your patient appointments and schedule</p>
        </div>
        <NewAppointmentDialog onAppointmentCreated={fetchAppointments}>
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
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading appointments...</p>
                </div>
              ) : todayAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No appointments scheduled for today</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {todayAppointments.map((apt) => (
                    <Card key={apt.id} className="p-4 hover:shadow-wellness transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-wellness-light/20 flex items-center justify-center">
                            <User className="w-6 h-6 text-wellness" />
                          </div>
                          <div>
                            <p className="font-semibold">{apt.patient?.full_name || 'Unknown'}</p>
                            <div className="flex items-center space-x-3 mt-1">
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{format(new Date(apt.scheduled_at), 'hh:mm a')}</span>
                              </div>
                              <Badge variant="outline">{apt.title}</Badge>
                              <Badge variant="default">{apt.status}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setRescheduleAppointment(apt);
                              setRescheduleOpen(true);
                            }}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            variant="wellness" 
                            size="sm"
                            onClick={() => handleStartAppointment(apt)}
                          >
                            Start
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteAppointment(apt.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming appointments</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map((apt) => (
                    <Card key={apt.id} className="p-4 hover:shadow-wellness transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-wellness-light/20 flex items-center justify-center">
                            <User className="w-6 h-6 text-wellness" />
                          </div>
                          <div>
                            <p className="font-semibold">{apt.patient?.full_name || 'Unknown'}</p>
                            <div className="flex items-center space-x-3 mt-1">
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <CalendarIcon className="w-3 h-3" />
                                <span>{format(new Date(apt.scheduled_at), 'MMM dd, yyyy')}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{format(new Date(apt.scheduled_at), 'hh:mm a')}</span>
                              </div>
                              <Badge variant="outline">{apt.title}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteAppointment(apt.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {completedAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No completed appointments yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedAppointments.map((apt) => (
                    <Card key={apt.id} className="p-4 bg-muted/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-wellness-light/20 flex items-center justify-center">
                            <User className="w-6 h-6 text-wellness" />
                          </div>
                          <div>
                            <p className="font-semibold">{apt.patient?.full_name || 'Unknown'}</p>
                            <div className="flex items-center space-x-3 mt-1">
                              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <CalendarIcon className="w-3 h-3" />
                                <span>{format(new Date(apt.scheduled_at), 'MMM dd, yyyy')}</span>
                              </div>
                              <Badge variant="outline">{apt.title}</Badge>
                              <Badge variant="secondary">Completed</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedAppointment && (
        <AppointmentWorkflow
          patient={{
            name: selectedAppointment.patient?.full_name || 'Unknown',
            type: selectedAppointment.title,
            isNewPatient: selectedAppointment.title.includes("Initial")
          }}
          open={workflowOpen}
          onClose={handleCompleteAppointment}
        />
      )}

      {rescheduleAppointment && (
        <RescheduleDialog
          appointment={rescheduleAppointment}
          open={rescheduleOpen}
          onOpenChange={(open) => {
            setRescheduleOpen(open);
            if (!open) setRescheduleAppointment(null);
          }}
          onRescheduled={fetchAppointments}
        />
      )}
    </div>
  );
}