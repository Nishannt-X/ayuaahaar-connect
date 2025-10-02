import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const appointmentTypes = ["Initial Consultation", "Follow-up", "Diet Review", "Lifestyle Counseling"];
const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

interface NewAppointmentDialogProps {
  children: React.ReactNode;
  onAppointmentCreated?: () => void;
}

export default function NewAppointmentDialog({ children, onAppointmentCreated }: NewAppointmentDialogProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    patientId: "",
    type: "",
    time: "",
    notes: ""
  });

  useEffect(() => {
    if (open && user) {
      fetchPatients();
    }
  }, [open, user]);

  const fetchPatients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('practitioner_id', user?.id)
      .order('full_name', { ascending: true });

    if (!error && data) {
      setPatients(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientId || !formData.type || !date || !formData.time || !user) {
      toast({
        title: "Incomplete form",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const selectedPatient = patients.find(p => p.id === formData.patientId);
    const [hours, minutes] = formData.time.split(/[: ]/);
    const isPM = formData.time.includes('PM');
    let hour = parseInt(hours);
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
    
    const scheduledDateTime = new Date(date);
    scheduledDateTime.setHours(hour, parseInt(minutes.replace(/[^\d]/g, '')), 0, 0);

    const { error } = await supabase.from('appointments').insert({
      patient_id: formData.patientId,
      practitioner_id: user.id,
      scheduled_at: scheduledDateTime.toISOString(),
      title: formData.type,
      duration_minutes: 60,
      status: 'scheduled',
      notes: formData.notes || null,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create appointment",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Appointment scheduled",
        description: `Appointment for ${selectedPatient?.full_name} on ${format(date, "PPP")} at ${formData.time}`
      });

      onAppointmentCreated?.();

      // Reset form
      setFormData({
        patientId: "",
        type: "",
        time: "",
        notes: ""
      });
      setDate(undefined);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
          <DialogDescription>
            Create a new appointment for your patient
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="patientId">Select Patient *</Label>
            <Select value={formData.patientId} onValueChange={(value) => setFormData({...formData, patientId: value})}>
              <SelectTrigger>
                <SelectValue placeholder={loading ? "Loading patients..." : "Select a patient"} />
              </SelectTrigger>
              <SelectContent>
                {patients.map(patient => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.full_name} {patient.email && `(${patient.email})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Appointment Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Appointment Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="time">Time Slot *</Label>
            <Select value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map(time => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Any special requirements"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="wellness">
              Schedule Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
