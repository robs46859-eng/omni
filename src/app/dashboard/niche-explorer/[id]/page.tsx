"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { 
  ArrowLeft, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Users, 
  MapPin, 
  DollarSign, 
  Activity,
  Briefcase,
  Layers,
  Search,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ageData = [
  { range: "18-24", value: 15 },
  { range: "25-34", value: 45 },
  { range: "35-44", value: 25 },
  { range: "45-54", value: 10 },
  { range: "55+", value: 5 },
];

const spendingData = [
  { name: "Equipment", value: 40 },
  { name: "Software", value: 25 },
  { name: "Education", value: 20 },
  { name: "Events", value: 15 },
];

const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'];

export default function SegmentProfilePage({ params }: { params: { id: string } }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/niche-explorer">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold tracking-tight text-primary">Independent Ceramicists</h1>
              <Badge variant="secondary">NON_MEDIA</Badge>
            </div>
            <p className="text-muted-foreground mt-1">Fragmented audience of professional and high-intent hobbyist potters.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Save to Watchlist</Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsAnalyzing(true)}>
            <Sparkles className="mr-2 h-4 w-4" />
            Monetization Playbook
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-bold uppercase tracking-wider">Est. Audience Size</CardDescription>
            <CardTitle className="text-2xl font-bold">125,000</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-emerald-500 text-xs font-medium">
              <TrendingUp className="mr-1 h-3 w-3" />
              14.5% Growth (YoY)
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-bold uppercase tracking-wider">Avg. LTV Potential</CardDescription>
            <CardTitle className="text-2xl font-bold">$1,200</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">High recurring potential</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-bold uppercase tracking-wider">Saturation Level</CardDescription>
            <CardTitle className="text-2xl font-bold">Low</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-emerald-500 font-medium">High opportunity gap</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-bold uppercase tracking-wider">Relevance</CardDescription>
            <CardTitle className="text-2xl font-bold">92/100</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-xs text-muted-foreground">Strong signal match</span>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50 w-full justify-start h-12 p-1">
          <TabsTrigger value="overview" className="px-8 h-10">Data Overview</TabsTrigger>
          <TabsTrigger value="playbook" className="px-8 h-10 flex items-center">
            <Sparkles className="mr-2 h-3 w-3" />
            AI Playbook
          </TabsTrigger>
          <TabsTrigger value="platforms" className="px-8 h-10">Platform Deep Dive</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Demographics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Demographics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageData}>
                      <XAxis dataKey="range" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">Top States</p>
                    <p className="text-sm font-medium">NY, CA, OR, WA, NC</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">Avg. Income</p>
                    <p className="text-sm font-medium">$65k - $120k</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Psychographics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-primary" />
                  Psychographics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Values & Motivations</p>
                  <div className="flex flex-wrap gap-2">
                    {["Craftsmanship", "Sustainability", "Tactile Creation", "Community", "Individuality"].map((v) => (
                      <Badge key={v} variant="outline" className="bg-slate-50 dark:bg-slate-950 font-normal">{v}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Pain Points</p>
                  <div className="flex flex-wrap gap-2">
                    {["Expensive Equipment", "Logistics/Shipping", "Studio Access", "Market Saturation", "Chemical Safety"].map((p) => (
                      <Badge key={p} variant="secondary" className="bg-rose-500/10 text-rose-600 border-none font-normal">{p}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consumption Patterns */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-primary" />
                  Consumption Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {spendingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Platform Presence */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-primary" />
                  Platform Presence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Instagram", pct: 85, context: "Visual showcasing, selling" },
                  { name: "TikTok", pct: 62, context: "Process videos, 'ASMR' pottery" },
                  { name: "Reddit", pct: 45, context: "r/pottery, technical advice" },
                  { name: "Substack", pct: 18, context: "Artist stories, studio tips" },
                ].map((p) => (
                  <div key={p.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold">{p.name}</span>
                      <span className="text-muted-foreground">{p.pct}% Presence</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${p.pct}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground italic w-32 truncate">{p.context}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="playbook">
          {isAnalyzing ? (
            <Card className="border-purple-500/50 bg-purple-50/50 dark:bg-purple-950/10">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                  <CardTitle className="text-lg">Generating Hyper-Niche Playbook...</CardTitle>
                </div>
                <CardDescription>Our AI analyst is processing psychographics and platform signals.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center space-y-4 max-w-sm">
                  <Target className="mx-auto h-12 w-12 text-purple-400 opacity-50" />
                  <p className="text-sm text-muted-foreground italic">"Analyzing contrarian insights and identifying low-competition price points for the Independent Ceramicist segment..."</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed">
              <Sparkles className="h-12 w-12 text-purple-600 mb-4 opacity-50" />
              <h3 className="text-lg font-bold mb-2">Ready for Analysis</h3>
              <p className="text-muted-foreground text-sm max-w-md text-center mb-6">
                Click the button above to generate a custom monetization strategy, content pillars, and partnership opportunities for this segment.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsAnalyzing(true)}>
                Generate Playbook
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}