import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
  {
    id: 1,
    title: "Inventory Shortage",
    message: "SKU-402 (Standard Widget) is below safety stock levels in North Region.",
    severity: "critical",
    time: "12m ago",
  },
  {
    id: 2,
    title: "Sales Milestone",
    message: "Daily revenue target exceeded by 14%. Current: $142,000.",
    severity: "info",
    time: "45m ago",
  },
  {
    id: 3,
    title: "Supplier Delay",
    message: "Shipment from Global Logistics Co. delayed by 48 hours.",
    severity: "warning",
    time: "2h ago",
  },
];

const severityIcons = {
  critical: <AlertCircle className="h-5 w-5 text-rose-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

export function RecentAlerts() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>Critical updates from across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0">
              <div className="mt-0.5">{severityIcons[alert.severity as keyof typeof severityIcons]}</div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{alert.title}</p>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}