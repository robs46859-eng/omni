"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BarChart3, 
  Package, 
  Users, 
  Megaphone, 
  Truck, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Database,
  GitBranch,
  BarChartHorizontal,
  Sparkles,
  Search,
  Monitor,
  Radio,
  FileSpreadsheet,
  Globe,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store/use-sidebar-store";

const coreModules = [
  { name: "Executive Overview", href: "/executive", icon: LayoutDashboard },
  { name: "Sales & Revenue", href: "/sales", icon: BarChart3 },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Marketing", href: "/marketing", icon: Megaphone },
  { name: "Operations", href: "/operations", icon: Truck },
];

const cnsNav = [
  { name: "Sources", href: "/dashboard/omniscale/sources", icon: Database },
  { name: "Locations", href: "/dashboard/omniscale/locations", icon: BarChartHorizontal },
  { name: "Analytics", href: "/dashboard/omniscale/analytics", icon: BarChart3 },
];

const intelligenceNav = [
  { name: "Digital IT Girl", href: "/dashboard/digital-it-girl", icon: Sparkles },
  { name: "Niche Explorer", href: "/dashboard/niche-explorer", icon: Search },
  { name: "Global Intel", href: "/dashboard/global-intelligence", icon: Globe },
];

const automationNav = [
  { name: "Workflow Library", href: "/dashboard/workflows", icon: GitBranch },
];

const engineeringNav = [
  { name: "Public Beta", href: "/dashboard/public-beta", icon: Monitor },
  { name: "My Stack", href: "/dashboard/public-beta/my-stack", icon: Package },
];

const growthNav = [
  { name: "AutoPitch", href: "/dashboard/autopitch", icon: Briefcase },
  { name: "Page Builder", href: "/dashboard/builder", icon: Sparkles },
];

import { useSession } from "next-auth/react";

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { isOpen, toggle } = useSidebarStore();
  
  const userRole = (session?.user as any)?.role || "VIEWER";
  const isAdmin = userRole === "ADMIN";

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r bg-card transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {isOpen && (
          <span className="text-xl font-bold tracking-tight text-primary">
            OmniScale
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={toggle}
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-6 p-2 py-4">
        {/* Core Modules (User/Client Side) */}
        <div>
          {isOpen && <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">My Operations</h3>}
          <nav className="space-y-1">
            {coreModules.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    !isOpen && "justify-center"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isOpen && "mr-3")} />
                  {isOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin Sections (Your Side) */}
        {isAdmin && (
          <>
            <div>
              {isOpen && <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Intelligence Hub</h3>}
              <nav className="space-y-1">
                {intelligenceNav.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        !isOpen && "justify-center"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", isOpen && "mr-3")} />
                      {isOpen && <span>{item.name}</span>}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              {isOpen && <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Growth & Sales</h3>}
              <nav className="space-y-1">
                {growthNav.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        !isOpen && "justify-center"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", isOpen && "mr-3")} />
                      {isOpen && <span>{item.name}</span>}
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            <div>
              {isOpen && <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest text-primary mb-2">System Admin</h3>}
              <nav className="space-y-1">
                {[...cnsNav, ...automationNav, ...engineeringNav].map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        !isOpen && "justify-center"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", isOpen && "mr-3")} />
                      {isOpen && <span>{item.name}</span>}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </>
        )}
      </div>

      <div className="border-t p-2">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            !isOpen && "justify-center"
          )}
        >
          <Settings className={cn("h-4 w-4", isOpen && "mr-3")} />
          {isOpen && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}