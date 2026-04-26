"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  ShieldAlert, 
  TrendingDown, 
  TrendingUp, 
  Zap, 
  Map as MapIcon, 
  Search, 
  Filter, 
  MoreHorizontal,
  ChevronRight,
  AlertTriangle,
  Info,
  Radio,
  BarChart3,
  ExternalLink,
  Download
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const signals = [
  {
    id: "SIG-001",
    source: "Reuters",
    category: "REGULATORY",
    content: "New EU Data Privacy framework announced. Significant impact on SaaS analytics providers expected by Q3.",
    impact: "CRITICAL",
    time: "15m ago",
  },
  {
    id: "SIG-002",
    source: "Competitor Watch",
    category: "COMPETITOR",
    content: "Acme Analytics lowered entry-level pricing by 15%. Direct threat to current North Region market share.",
    impact: "HIGH",
    time: "1h ago",
  },
  {
    id: "SIG-003",
    source: "Macro Economic",
    category: "MACRO",
    content: "Port of Long Beach reports 48-hour container backlog due to labor negotiations.",
    impact: "MEDIUM",
    time: "3h ago",
  },
  {
    id: "SIG-004",
    source: "TechCrunch",
    category: "TREND",
    content: "Investment in on-device AI model orchestration peaks. Validates Digital IT Girl signal #402.",
    impact: "LOW",
    time: "5h ago",
  },
];

const impactStyles = {
  CRITICAL: "bg-rose-500 text-white",
  HIGH: "bg-amber-500 text-white",
  MEDIUM: "bg-blue-500 text-white",
  LOW: "bg-slate-500 text-white",
};

export default function GlobalIntelligencePage() {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Left: Signal Feed */}
      <div className="w-[450px] border-r bg-card flex flex-col">
        <div className="p-6 border-b space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
              <Radio className="mr-2 h-5 w-5 text-rose-500 animate-pulse" />
              Intelligence Feed
            </h2>
            <Button variant="ghost" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Filter signals..." className="pl-8 h-9" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {signals.map((sig) => (
            <Card key={sig.id} className="cursor-pointer hover:border-primary transition-all group">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={cn("text-[9px] font-bold h-4 px-1.5", impactStyles[sig.impact as keyof typeof impactStyles])}>
                    {sig.impact} IMPACT
                  </Badge>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{sig.time}</span>
                </div>
                <CardTitle className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">
                  {sig.content}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-muted-foreground uppercase">
                  <span>{sig.source}</span>
                  <div className="h-1 w-1 rounded-full bg-muted" />
                  <span>{sig.category}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right: War Room Analytics */}
      <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Executive War Room</h1>
            <p className="text-muted-foreground">Cross-referencing global events with internal operational metrics.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download SITREP
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Declare Alert
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Global Contextual Map */}
          <Card className="col-span-1 shadow-lg">
            <CardHeader className="border-b bg-card">
              <CardTitle className="text-lg flex items-center">
                <MapIcon className="mr-2 h-5 w-5 text-primary" />
                Contextual Event Map
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center p-0 relative overflow-hidden bg-slate-200 dark:bg-slate-900">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat" />
              <div className="text-center space-y-4 relative z-10 p-12">
                <div className="mx-auto bg-primary/10 p-6 rounded-full w-20 h-20 flex items-center justify-center">
                  <Globe className="h-10 w-10 text-primary animate-spin-slow" />
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Mapping global signals to your operational nodes in North, South, and West regions...
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Impact Correlations */}
          <Card className="col-span-1 shadow-lg">
            <CardHeader className="border-b bg-card">
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                Macro-Correlation Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {[
                  { factor: "Shipping Delay (SIG-003)", metric: "Inventory Health", correlation: "High (-0.82)", status: "negative" },
                  { factor: "New EU Regs (SIG-001)", metric: "Compliance Overhead", correlation: "Critical (+0.91)", status: "warning" },
                  { factor: "Competitor Price (SIG-002)", metric: "Conversion Rate", correlation: "Med (-0.45)", status: "negative" },
                  { factor: "AI Adoption (SIG-004)", metric: "Digital IT Girl Accuracy", correlation: "High (+0.74)", status: "positive" },
                ].map((item, i) => (
                  <div key={i} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase">{item.factor}</p>
                      <p className="text-sm font-medium mt-1">Impacts: {item.metric}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-xs font-bold",
                        item.status === 'positive' ? 'text-emerald-500' : 
                        item.status === 'negative' ? 'text-rose-500' : 'text-amber-500'
                      )}>{item.correlation}</p>
                      <Button variant="link" size="sm" className="h-6 p-0 text-[10px]">Analyze Why</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Competitor Watchtower Preview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Competitor Watchtower</CardTitle>
                <CardDescription>Direct monitoring of 4 primary competitors.</CardDescription>
              </div>
              <Button variant="outline" size="sm">Manage Competitors</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              {["Acme Corp", "Zylker Inc", "Global Tech", "Nexus Ltd"].map((c) => (
                <div key={c} className="p-4 border rounded-lg bg-card flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded bg-muted flex items-center justify-center font-bold text-xs">{c[0]}</div>
                    <span className="text-sm font-medium">{c}</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}