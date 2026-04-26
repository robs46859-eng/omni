"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Info,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  History,
  Activity,
  Server,
  Cpu,
  Monitor
} from "lucide-react";
import Link from "next/link";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { cn } from "@/lib/utils";

const versionHistory = [
  { id: 1, version: "14.2.4", date: "2026-04-24", type: "PATCH", breaking: false, summary: "Security patch addressing CVE-2026-1042. Improved hydration performance for nested layouts." },
  { id: 2, version: "14.2.0", date: "2026-04-10", type: "MINOR", breaking: false, summary: "New experimental Server Actions stability. Added support for Partial Prerendering (PPR)." },
  { id: 3, version: "14.1.0", date: "2026-03-15", type: "MINOR", breaking: true, summary: "Significant changes to Image component optimization logic. Removed deprecated legacy export aliases." },
  { id: 4, version: "14.0.0", date: "2025-10-26", type: "MAJOR", breaking: true, summary: "Initial release of Next.js 14. App Router stable. Server Components by default." },
];

const sentimentData = [
  { version: "13.0", score: 65 },
  { version: "13.4", score: 72 },
  { version: "14.0", score: 85 },
  { version: "14.1", score: 78 },
  { version: "14.2", score: 92 },
];

export default function SoftwareDetailPage({ params }: { params: { id: string } }) {
  const [showBrief, setShowBrief] = useState(false);
  const [expandedVersion, setExpandedVersion] = useState<number | null>(1);

  return (
    <div className="space-y-8 p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/public-beta">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold tracking-tight">Next.js</h1>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-none">v14.2.4</Badge>
            </div>
            <p className="text-muted-foreground mt-1">The React Framework for the Web by Vercel.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Stop Tracking</Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowBrief(!showBrief)}>
            <Sparkles className="mr-2 h-4 w-4" />
            {showBrief ? "Hide AI Brief" : "Get AI Brief"}
          </Button>
        </div>
      </div>

      {showBrief && (
        <Card className="border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/10 animate-in slide-in-from-top-4 duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center text-blue-700 dark:text-blue-400">
              <ShieldAlert className="mr-2 h-5 w-5" />
              Technical Update Briefing
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 mb-1">TL;DR</p>
                <p className="text-sm leading-relaxed">
                  Next.js 14.2.4 is a critical security and stability update. It resolves a high-severity hydration vulnerability and introduces significant memory optimizations for large-scale App Router deployments.
                </p>
              </div>
              <div className="flex items-start space-x-3 bg-white/50 dark:bg-black/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-500">Upgrade Urgency: HIGH</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Recommended for all production environments using 14.2.x due to CVE-2026-1042.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 border-l pl-6 border-blue-200 dark:border-blue-800">
              <div>
                <p className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 mb-1">Breaking Changes Impact</p>
                <p className="text-sm">Minimal. Strictly internal optimizations. No API contract changes reported by early adopters.</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 mb-1">Community Consensus</p>
                <p className="text-sm italic">"Exceptionally stable patch. 12% reduction in memory overhead observed in SSR workloads."</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Version Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <History className="mr-2 h-5 w-5 text-primary" />
              Version Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-muted">
              {versionHistory.map((v) => (
                <div key={v.id} className="relative pl-8 group">
                  <div className={cn(
                    "absolute left-0 top-1.5 h-6 w-6 rounded-full border-4 border-background z-10 flex items-center justify-center transition-colors",
                    v.type === 'MAJOR' ? 'bg-primary' : v.type === 'MINOR' ? 'bg-blue-500' : 'bg-slate-400'
                  )}>
                    {v.breaking && <ShieldAlert className="h-3 w-3 text-white" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-bold font-mono">v{v.version}</span>
                        <Badge variant="outline" className="text-[10px] py-0">{v.type}</Badge>
                        {v.breaking && <Badge className="bg-rose-500/10 text-rose-600 border-none text-[10px] py-0">Breaking</Badge>}
                      </div>
                      <span className="text-xs text-muted-foreground">{v.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{v.summary}</p>
                    <Button variant="ghost" size="sm" className="h-7 text-xs px-0 hover:bg-transparent text-primary">
                      View Changelog <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right: Charts & Matrix */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-primary" />
                Community Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sentimentData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="version" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      labelStyle={{ fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t text-[10px] font-bold uppercase text-muted-foreground">
                <div className="flex items-center"><CheckCircle2 className="h-3 w-3 text-emerald-500 mr-1" /> Stable</div>
                <div className="flex items-center"><Info className="h-3 w-3 text-blue-500 mr-1" /> 1.4k Samples</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Server className="mr-2 h-5 w-5 text-primary" />
                Compatibility Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y text-sm">
                {[
                  { name: "Node.js", requirement: ">= 18.17.0", status: "Compatible" },
                  { name: "React", requirement: "18.2.x - 19.0.x", status: "Compatible" },
                  { name: "macOS / Linux", requirement: "x64 / arm64", status: "Compatible" },
                  { name: "Vercel / AWS", requirement: "Supported", status: "Compatible" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 px-6">
                    <span className="font-medium">{item.name}</span>
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground">{item.requirement}</p>
                      <span className="text-[10px] text-emerald-500 font-bold uppercase">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}