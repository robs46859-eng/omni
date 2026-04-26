"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const myStack = [
  {
    id: "SOFT-001",
    name: "Next.js",
    current: "14.2.3",
    latest: "14.2.4",
    updateAvailable: true,
    urgency: "HIGH",
    sentiment: 92,
  },
  {
    id: "SOFT-003",
    name: "Tailwind CSS",
    current: "3.4.4",
    latest: "3.4.4",
    updateAvailable: false,
    urgency: "NONE",
    sentiment: 98,
  },
  {
    id: "SOFT-006",
    name: "PostgreSQL",
    current: "15.4",
    latest: "16.3",
    updateAvailable: true,
    urgency: "MEDIUM",
    sentiment: 95,
  },
];

const urgencyStyles = {
  CRITICAL: "bg-rose-500/10 text-rose-600 border-rose-200",
  HIGH: "bg-amber-500/10 text-amber-600 border-amber-200",
  MEDIUM: "bg-blue-500/10 text-blue-600 border-blue-200",
  LOW: "bg-slate-500/10 text-slate-600 border-slate-200",
  NONE: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
};

export default function MyStackPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/public-beta">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Stack</h1>
            <p className="text-muted-foreground mt-1">Monitoring {myStack.length} critical software dependencies.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">Export Stack</Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/public-beta">
              Add More
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-rose-50/50 dark:bg-rose-950/10 border-rose-200 dark:border-rose-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center text-rose-700 dark:text-rose-400">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Critical Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-700 dark:text-rose-400">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Version Drift</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 Software</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Stack Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">95.0%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Tracked Software</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Filter stack..." className="pl-8 h-9" />
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Software Name</TableHead>
                <TableHead>Version Status</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myStack.map((item) => (
                <TableRow key={item.id} className="group cursor-pointer">
                  <TableCell className="pl-6">
                    <div className="font-bold">{item.name}</div>
                    <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">{item.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="font-mono text-[11px]">v{item.current}</Badge>
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      <Badge className={cn(
                        "font-mono text-[11px] border-none",
                        item.updateAvailable ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600"
                      )}>v{item.latest}</Badge>
                      {item.updateAvailable && (
                        <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "text-[10px] font-bold",
                      urgencyStyles[item.urgency as keyof typeof urgencyStyles]
                    )}>
                      {item.urgency}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${item.sentiment}%` }} />
                      </div>
                      <span className="text-xs font-bold">{item.sentiment}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/public-beta/${item.id}`}>
                        Manage
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}