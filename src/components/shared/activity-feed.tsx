"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  GitBranch, 
  Sparkles, 
  Search, 
  Monitor, 
  Briefcase, 
  Database,
  CheckCircle2,
  Clock,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const activities = [
  {
    id: 1,
    type: "WORKFLOW",
    description: "New 'Employee Onboarding' workflow active.",
    time: "12m ago",
    icon: GitBranch,
    color: "text-amber-500",
    href: "/dashboard/workflows",
  },
  {
    id: 2,
    type: "OPPORTUNITY",
    description: "High-value domain 'ai-orchestrator.io' detected.",
    time: "45m ago",
    icon: Sparkles,
    color: "text-purple-500",
    href: "/dashboard/digital-it-girl",
  },
  {
    id: 3,
    type: "SOFTWARE",
    description: "Next.js v14.2.4 released (Critical Security Patch).",
    time: "2h ago",
    icon: Monitor,
    color: "text-rose-500",
    href: "/dashboard/public-beta/SOFT-001",
  },
  {
    id: 4,
    type: "PITCH",
    description: "Automation pitch for Healthcare Senior Partner generated.",
    time: "5h ago",
    icon: Briefcase,
    color: "text-slate-700",
    href: "/dashboard/autopitch",
  },
  {
    id: 5,
    type: "CNS",
    description: "Data sync completed for 'Stripe Production'.",
    time: "1d ago",
    icon: Database,
    color: "text-emerald-500",
    href: "/dashboard/omniscale/sources",
  },
];

export function ActivityFeed() {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
            Unified Activity Feed
          </CardTitle>
          <Link href="/dashboard/activity" className="text-xs text-primary font-medium hover:underline">View all</Link>
        </div>
        <CardDescription>Real-time updates from all OmniScale modules.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity) => (
            <Link key={activity.id} href={activity.href}>
              <div className="flex items-start space-x-4 p-4 transition-colors hover:bg-muted/50 cursor-pointer">
                <div className={cn("mt-1 rounded-full p-2 bg-muted/50", activity.color)}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">{activity.type}</span>
                    <div className="h-1 w-1 rounded-full bg-muted" />
                    <span className="text-[10px] text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
                <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-1 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}