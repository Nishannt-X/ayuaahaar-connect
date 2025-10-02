import { NavLink } from "react-router-dom";
import { Users, FileText, BarChart3, Calendar, Database, BookTemplate, Settings, LogOut, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: "Dashboard", url: "/practitioner-dashboard", icon: Home },
  { title: "Patients", url: "/practitioner-dashboard/patients", icon: Users },
  { title: "Diet Plans", url: "/practitioner-dashboard/diet-plans", icon: BookTemplate },
  { title: "Food Database", url: "/practitioner-dashboard/food-database", icon: Database },
  { title: "Appointments", url: "/practitioner-dashboard/appointments", icon: Calendar },
  { title: "Analytics", url: "/practitioner-dashboard/analytics", icon: BarChart3 },
];

const bottomNavItems = [
  { title: "Settings", url: "/practitioner-dashboard/settings", icon: Settings },
];

export function PractitionerSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-wellness/10 text-wellness font-medium border-l-4 border-wellness" 
      : "hover:bg-wellness/5";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-wellness flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold">Dr</span>
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-wellness">AyuAahaar</h2>
                <p className="text-xs text-muted-foreground">Practitioner</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-5 w-5" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/login" className="hover:bg-destructive/5 hover:text-destructive">
                      <LogOut className="h-5 w-5" />
                      {!isCollapsed && <span>Logout</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
