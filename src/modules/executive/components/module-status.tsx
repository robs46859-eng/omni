import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ModuleStatusProps {
  name: string;
  status: "healthy" | "warning" | "critical";
  lastSync: string;
}

const statusConfig = {
  healthy: { color: "bg-emerald-500", label: "Healthy" },
  warning: { color: "bg-amber-500", label: "Warning" },
  critical: { color: "bg-rose-500", label: "Critical" },
};

export function ModuleStatus({ name, status, lastSync }: ModuleStatusProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card">
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-xs text-muted-foreground">
          Last sync: {lastSync}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <div className={cn("h-2.5 w-2.5 rounded-full", statusConfig[status].color)} />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {statusConfig[status].label}
        </span>
      </div>
    </div>
  );
}