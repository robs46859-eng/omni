"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Plus, 
  Monitor, 
  Package, 
  ShieldCheck, 
  AlertCircle,
  History,
  TrendingUp,
  BookmarkPlus,
  BookmarkCheck,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";

const softwares = [
  {
    id: "SOFT-001",
    name: "Next.js",
    vendor: "Vercel",
    category: "Framework",
    version: "14.2.4",
    updated: "2d ago",
    sentiment: "positive",
    sentimentScore: 92,
    isTracking: true,
  },
  {
    id: "SOFT-002",
    name: "Prisma",
    vendor: "Prisma Data",
    category: "ORM",
    version: "5.15.0",
    updated: "5h ago",
    sentiment: "neutral",
    sentimentScore: 74,
    isTracking: false,
  },
  {
    id: "SOFT-003",
    name: "Tailwind CSS",
    vendor: "Tailwind Labs",
    category: "Styling",
    version: "3.4.4",
    updated: "1w ago",
    sentiment: "positive",
    sentimentScore: 98,
    isTracking: true,
  },
  {
    id: "SOFT-004",
    name: "Docker Desktop",
    vendor: "Docker Inc",
    category: "DevOps",
    version: "4.31.0",
    updated: "3d ago",
    sentiment: "negative",
    sentimentScore: 42,
    isTracking: false,
  },
  {
    id: "SOFT-005",
    name: "Node.js",
    vendor: "OpenJS Foundation",
    category: "Runtime",
    version: "22.3.0",
    updated: "1d ago",
    sentiment: "positive",
    sentimentScore: 88,
    isTracking: false,
  },
  {
    id: "SOFT-006",
    name: "PostgreSQL",
    vendor: "PostgreSQL Global",
    category: "Database",
    version: "16.3",
    updated: "2w ago",
    sentiment: "positive",
    sentimentScore: 95,
    isTracking: true,
  },
];

const sentimentColors = {
  positive: "bg-emerald-500",
  neutral: "bg-amber-500",
  negative: "bg-rose-500",
};

export default function SoftwareCatalogPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center">
            Public Beta
            <Badge variant="outline" className="ml-3 font-mono text-[10px] border-primary/30 text-primary uppercase">Software Tracker</Badge>
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor software version cycles, breaking changes, and community sentiment.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/public-beta/my-stack">
              <Package className="mr-2 h-4 w-4" />
              My Stack
            </Link>
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Software
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search software by name, vendor, or category..." 
            className="pl-10 h-11 bg-card shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="h-11 w-11">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {softwares.map((s) => (
          <Card key={s.id} className="group hover:border-primary transition-all duration-300 hover:shadow-md flex flex-col relative overflow-hidden">
            <div className={cn(
              "absolute top-0 right-0 w-1.5 h-full",
              sentimentColors[s.sentiment as keyof typeof sentimentColors]
            )} />
            
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="font-normal text-[10px]">{s.category}</Badge>
                <div className="flex items-center space-x-1.5">
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    sentimentColors[s.sentiment as keyof typeof sentimentColors]
                  )} />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{s.sentimentScore}% Sentiment</span>
                </div>
              </div>
              <CardTitle className="text-xl flex items-center group-hover:text-primary transition-colors">
                {s.name}
              </CardTitle>
              <CardDescription>{s.vendor}</CardDescription>
            </CardHeader>
            
            <CardContent className="pb-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-tight">Current Version</p>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-mono">v{s.version}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-tight">Last Updated</p>
                  <p className="text-sm font-medium">{s.updated}</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-muted/30 border-t p-3 flex justify-between items-center">
              <Button variant="ghost" size="sm" className="h-8 group-hover:text-primary" asChild>
                <Link href={`/dashboard/public-beta/${s.id}`}>
                  Version History
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className={cn(
                "h-8 w-8 rounded-full",
                s.isTracking ? "text-primary" : "text-muted-foreground"
              )}>
                {s.isTracking ? <BookmarkCheck className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}