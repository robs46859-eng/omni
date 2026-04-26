import { KPICard } from "@/modules/executive/components/kpi-card";
import { SegmentDistribution } from "@/modules/customers/components/segment-distribution";
import { CustomerList } from "@/modules/customers/components/customer-list";
import { Button } from "@/components/ui/button";
import { UserPlus, Mail } from "lucide-react";
import Link from "next/link";

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Insights</h1>
          <p className="text-muted-foreground">
            Analyze customer behavior, segments, and sentiment.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/marketing/campaigns/new">
              <Mail className="mr-2 h-4 w-4" />
              Campaign
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/customers/new">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Customer
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Customers"
          value="12,845"
          trend="up"
          description="+420 this month"
        />
        <KPICard
          title="Avg. Sentiment"
          value="4.2/5"
          trend="up"
          description="+0.3 from last month"
        />
        <KPICard
          title="Churn Rate"
          value="2.1%"
          trend="down"
          description="-0.5% from last month"
        />
        <KPICard
          title="LTV (Avg)"
          value="$1,420"
          trend="up"
          description="+$85 from average"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <SegmentDistribution />
        <CustomerList />
      </div>
    </div>
  );
}