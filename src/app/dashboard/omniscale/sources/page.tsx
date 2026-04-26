import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Database, Globe, FileText, Share2, MoreVertical, RefreshCw } from "lucide-react";
import Link from "next/link";

const sources = [
  {
    id: "SRC-001",
    name: "Stripe Production",
    type: "API",
    status: "active",
    lastSync: "12m ago",
    records: "14,205",
    icon: Globe,
  },
  {
    id: "SRC-002",
    name: "Q1 Sales Data",
    type: "CSV",
    status: "inactive",
    lastSync: "2d ago",
    records: "2,500",
    icon: FileText,
  },
  {
    id: "SRC-003",
    name: "Shopify Webhook",
    type: "WEBHOOK",
    status: "active",
    lastSync: "Now",
    records: "8,940",
    icon: Share2,
  },
];

const statusStyles = {
  active: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
  inactive: "bg-muted text-muted-foreground",
  error: "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20",
};

export default function SourcesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Sources</h1>
          <p className="text-muted-foreground">
            Manage your external data ingestion streams and normalization settings.
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/dashboard/omniscale/sources/new">
            <Plus className="mr-2 h-4 w-4" />
            New Source
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sources.map((source) => (
          <Card key={source.id} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="rounded-md bg-primary/10 p-2">
                  <source.icon className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-sm font-semibold">{source.name}</CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className={statusStyles[source.status as keyof typeof statusStyles]}>
                  {source.status}
                </Badge>
                <span className="text-xs text-muted-foreground">Type: {source.type}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs uppercase font-medium">Last Sync</p>
                  <p className="font-medium">{source.lastSync}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs uppercase font-medium">Records</p>
                  <p className="font-medium">{source.records}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50/50 dark:bg-slate-950/50 p-4 border-t flex justify-between">
              <Button variant="ghost" size="sm" className="text-xs h-8">
                View Logs
              </Button>
              <Button variant="outline" size="sm" className="text-xs h-8">
                <RefreshCw className="mr-2 h-3 w-3" />
                Sync Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}