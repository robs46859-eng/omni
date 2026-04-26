import { KPICard } from "@/modules/executive/components/kpi-card";
import { ModuleStatus } from "@/modules/executive/components/module-status";
import { RecentAlerts } from "@/modules/executive/components/recent-alerts";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExecutivePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Executive Overview</h1>
        <p className="text-muted-foreground">
          Real-time performance across all product modules.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          value="$1,284,430"
          trend="up"
          description="+12.5% from last month"
        />
        <KPICard
          title="Active Customers"
          value="42,108"
          trend="up"
          description="+3.2% from last month"
        />
        <KPICard
          title="Inventory Value"
          value="$4,102,800"
          trend="down"
          description="-2.1% from last month"
        />
        <KPICard
          title="Ops Efficiency"
          value="94.2%"
          trend="neutral"
          description="Consistent with average"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <ActivityFeed />
        </div>
        
        <RecentAlerts />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Module Health</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ModuleStatus name="Sales & Revenue" status="healthy" lastSync="2m ago" />
          <ModuleStatus name="Inventory" status="warning" lastSync="5m ago" />
          <ModuleStatus name="Customer Insights" status="healthy" lastSync="10m ago" />
          <ModuleStatus name="Marketing" status="healthy" lastSync="1h ago" />
          <ModuleStatus name="Operations" status="healthy" lastSync="15m ago" />
          <ModuleStatus name="Global AI Service" status="critical" lastSync="Now" />
        </div>
      </div>
    </div>
  );
}