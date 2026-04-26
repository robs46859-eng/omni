import { KPICard } from "@/modules/executive/components/kpi-card";
import { StockLevelChart } from "@/modules/inventory/components/stock-level-chart";
import { SupplierList } from "@/modules/inventory/components/supplier-list";
import { Button } from "@/components/ui/button";
import { PackagePlus, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory & Supply Chain</h1>
          <p className="text-muted-foreground">
            Manage stock levels, suppliers, and procurement.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Sync Inventory
          </Button>
          <Button size="sm">
            <PackagePlus className="mr-2 h-4 w-4" />
            Restock
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total SKUs"
          value="1,240"
          trend="neutral"
          description="Across 12 categories"
        />
        <KPICard
          title="Out of Stock"
          value="14"
          trend="down"
          description="-3 from last week"
        />
        <KPICard
          title="Turnover Rate"
          value="4.2x"
          trend="up"
          description="+0.5x from average"
        />
        <KPICard
          title="Avg. Lead Time"
          value="5.2 Days"
          trend="down"
          description="-0.8 Days from average"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <StockLevelChart />
        <SupplierList />
      </div>
    </div>
  );
}gap-4 md:grid-cols-2 lg:grid-cols-7">
        <StockLevelChart />
        <SupplierList />
      </div>
    </div>
  );
}