import { KPICard } from "@/modules/executive/components/kpi-card";
import { ChannelPerformance } from "@/modules/marketing/components/channel-performance";
import { CampaignList } from "@/modules/marketing/components/campaign-list";
import { Button } from "@/components/ui/button";
import { Plus, Target } from "lucide-react";
import Link from "next/link";

export default function MarketingPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketing Performance</h1>
          <p className="text-muted-foreground">
            Track campaign ROI, leads, and customer acquisition costs.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/marketing/goals">
              <Target className="mr-2 h-4 w-4" />
              Set Goals
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/marketing/campaigns/new">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Avg. ROI"
          value="3.8x"
          trend="up"
          description="+0.4x from Q1"
        />
        <KPICard
          title="Cost Per Lead"
          value="$14.20"
          trend="down"
          description="-12% from last month"
        />
        <KPICard
          title="New Leads"
          value="4,210"
          trend="up"
          description="+15.2% from last week"
        />
        <KPICard
          title="CAC"
          value="$82.00"
          trend="down"
          description="Goal: < $100"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ChannelPerformance />
        <CampaignList />
      </div>
    </div>
  );
}