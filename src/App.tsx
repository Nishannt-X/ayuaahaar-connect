import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PractitionerSidebar } from "@/components/layout/PractitionerSidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DashboardHome from "./pages/practitioner/DashboardHome";
import PatientsPage from "./pages/practitioner/PatientsPage";
import DietPlansPage from "./pages/practitioner/DietPlansPage";
import FoodDatabasePage from "./pages/practitioner/FoodDatabasePage";
import AppointmentsPage from "./pages/practitioner/AppointmentsPage";
import AnalyticsPage from "./pages/practitioner/AnalyticsPage";
import SettingsPage from "./pages/practitioner/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/practitioner-dashboard/*" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="min-h-screen flex w-full">
                    <PractitionerSidebar />
                    <div className="flex-1 flex flex-col">
                      <header className="h-14 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40 flex items-center px-6">
                        <SidebarTrigger className="mr-4" />
                        <h1 className="text-xl font-semibold text-wellness">AyuAahaar Connect</h1>
                      </header>
                      <main className="flex-1 p-6 bg-gradient-to-br from-wellness-light/10 via-background to-wellness-light/5">
                        <Routes>
                          <Route index element={<DashboardHome />} />
                          <Route path="patients" element={<PatientsPage />} />
                          <Route path="diet-plans" element={<DietPlansPage />} />
                          <Route path="food-database" element={<FoodDatabasePage />} />
                          <Route path="appointments" element={<AppointmentsPage />} />
                          <Route path="analytics" element={<AnalyticsPage />} />
                          <Route path="settings" element={<SettingsPage />} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
