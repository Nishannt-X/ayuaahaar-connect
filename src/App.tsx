import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import PractitionerDashboard from "./pages/PractitionerDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import PrakritiiAssessment from "./pages/PrakritiiAssessment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/dashboard" element={<PractitionerDashboard />} />
          <Route path="/practitioner-dashboard" element={<PractitionerDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/assessment" element={<PrakritiiAssessment />} />
          <Route path="/prakriti-assessment" element={<PrakritiiAssessment />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
