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
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store/use-sidebar-store";

const navigation = [
  { name: "Executive Overview", href: "/executive", icon: LayoutDashboard },
  { name: "Sales & Revenue", href: "/sales", icon: BarChart3 },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Marketing", href: "/marketing", icon: Megaphone },
  { name: "Operations", href: "/operations", icon: Truck },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebarStore();

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

      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                !isOpen && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5", isOpen && "mr-3")} />
              {isOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-2">
        <Link
          href="/settings"
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            !isOpen && "justify-center"
          )}
        >
          <Settings className={cn("h-5 w-5", isOpen && "mr-3")} />
          {isOpen && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}