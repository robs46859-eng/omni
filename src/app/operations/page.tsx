import { KPICard } from "@/modules/executive/components/kpi-card";
import { DeliveryEfficiency } from "@/modules/operations/components/delivery-efficiency";
import { ResourceUtilization } from "@/modules/operations/components/resource-utilization";
import { Button } from "@/components/ui/button";
import { Truck, MapPin } from "lucide-react";
import Link from "next/link";

export default function OperationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operations & Logistics</h1>
          <p className="text-muted-foreground">
            Monitor fleet status, delivery performance, and resources.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/operations/map">
              <MapPin className="mr-2 h-4 w-4" />
              Live Map
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/operations/dispatch">
              <Truck className="mr-2 h-4 w-4" />
              Dispatch
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Active Routes"
          value="142"
          trend="up"
          description="+8 from yesterday"
        />
        <KPICard
          title="On-Time Delivery"
          value="94.8%"
          trend="up"
          description="+1.2% this week"
        />
        <KPICard
          title="Fuel Efficiency"
          value="8.4 MPG"
          trend="neutral"
          description="Fleet average"
        />
        <KPICard
          title="Incident Rate"
          value="0.04%"
          trend="down"
          description="-0.01% from last month"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <DeliveryEfficiency />
        <ResourceUtilization />
      </div>
    </div>
  );
}