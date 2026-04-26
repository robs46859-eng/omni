import { KPICard } from "@/modules/executive/components/kpi-card";
import { RevenueChart } from "@/modules/sales/components/revenue-chart";
import { RecentTransactions } from "@/modules/sales/components/recent-transactions";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import Link from "next/link";

export default function SalesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales & Revenue</h1>
          <p className="text-muted-foreground">
            Monitor transactional data and revenue growth.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Daily Sales"
          value="$12,450"
          trend="up"
          description="+8% from yesterday"
        />
        <KPICard
          title="Avg. Order Value"
          value="$452.00"
          trend="up"
          description="+1.2% from last week"
        />
        <KPICard
          title="Conversion Rate"
          value="3.8%"
          trend="down"
          description="-0.4% from last week"
        />
        <KPICard
          title="Gross Margin"
          value="42.1%"
          trend="neutral"
          description="Steady at target"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart />
        <RecentTransactions />
      </div>
    </div>
  );
}-cols-2 lg:grid-cols-7">
        <RevenueChart />
        <RecentTransactions />
      </div>
    </div>
  );
}