import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, GitBranch, Clock, Search, Filter, Copy, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const workflows = [
  {
    id: "WF-001",
    name: "Employee Onboarding",
    description: "Standard process for hardware provision and system access.",
    status: "ACTIVE",
    runs: 45,
    lastRun: "2h ago",
    isTemplate: true,
  },
  {
    id: "WF-002",
    name: "Invoice Approval",
    description: "Multi-step approval chain for vendor payments > $5k.",
    status: "DRAFT",
    runs: 0,
    lastRun: "Never",
    isTemplate: true,
  },
  {
    id: "WF-003",
    name: "Incident Response",
    description: "Automated alert routing for critical system failures.",
    status: "ACTIVE",
    runs: 12,
    lastRun: "1d ago",
    isTemplate: true,
  },
  {
    id: "WF-004",
    name: "Customer Reactivation",
    description: "Personalized outreach for users inactive for 30+ days.",
    status: "ACTIVE",
    runs: 850,
    lastRun: "5m ago",
    isTemplate: false,
  },
];

const statusStyles = {
  ACTIVE: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
  DRAFT: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
  ARCHIVED: "bg-muted text-muted-foreground",
};

export default function WorkflowsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflow Architect</h1>
          <p className="text-muted-foreground">
            Design and automate complex business processes with visual canvas and AI assistance.
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/dashboard/workflows/builder/new">
            <Plus className="mr-2 h-4 w-4" />
            New Workflow
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2 flex-1">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search workflows..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="px-3 py-1">All: {workflows.length}</Badge>
          <Badge variant="outline" className="px-3 py-1">Active: 3</Badge>
          <Badge variant="outline" className="px-3 py-1">Drafts: 1</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workflows.map((wf) => (
          <Card key={wf.id} className="group relative overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className={statusStyles[wf.status as keyof typeof statusStyles]}>
                  {wf.status}
                </Badge>
                {wf.isTemplate && (
                  <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">
                    Template
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg mt-3">{wf.name}</CardTitle>
              <CardDescription className="line-clamp-2">{wf.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Play className="mr-1 h-3 w-3" />
                  {wf.runs} runs
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {wf.lastRun}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50/50 dark:bg-slate-950/50 p-4 border-t flex justify-between">
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <Button size="sm" variant="outline" asChild className="h-8">
                <Link href={`/dashboard/workflows/builder/${wf.id}`}>
                  Edit Workflow
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}