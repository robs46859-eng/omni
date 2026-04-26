"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Zap, 
  TrendingUp, 
  Search, 
  Filter, 
  ChevronRight, 
  Sparkles,
  ExternalLink,
  Plus,
  BarChart3,
  Lightbulb
} from "lucide-react";
import { Input } from "@/components/ui/input";

const domains = [
  { domain: "ai-orchestrator.io", category: "Technology", score: 92, value: "$12,500", status: "AVAILABLE", seen: "2h ago" },
  { domain: "green-supply.com", category: "Sustainability", score: 85, value: "$4,200", status: "AUCTION", seen: "5h ago" },
  { domain: "meta-health.app", category: "Healthcare", score: 78, value: "$8,900", status: "TAKEN", seen: "1d ago" },
  { domain: "spatial-dev.net", category: "Computing", score: 88, value: "$6,100", status: "AVAILABLE", seen: "3h ago" },
];

const niches = [
  { 
    name: "AI Micro-SaaS for Legal Summaries", 
    audience: "Solo Attorneys", 
    competition: "Low", 
    tam: "$450M", 
    type: "SaaS",
    desc: "Predictive gap in document processing for independent law firms."
  },
  { 
    name: "Verticalized CRM for Urban Farmers", 
    audience: "AgTech Startups", 
    competition: "Med", 
    tam: "$1.2B", 
    type: "Tool",
    desc: "Niche tracking for hydroponic and rooftop garden management."
  },
  { 
    name: "AI-Powered Ghostwriting for Gen-Z", 
    audience: "Content Creators", 
    competition: "Low", 
    tam: "$800M", 
    type: "Service",
    desc: "Synthetic tone-of-voice alignment for high-velocity social media."
  },
];

export default function DigitalItGirlPage() {
  const [activeTab, setActiveTab] = useState("domains");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Digital IT Girl</h1>
          <p className="text-muted-foreground">
            Predictive Intelligence Engine for Digital Real Estate & Niche AI Gaps.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Set Alert
          </Button>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
            <Sparkles className="mr-2 h-4 w-4" />
            Run Scanner
          </Button>
        </div>
      </div>

      <Tabs defaultValue="domains" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="domains" className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              Domain Scanner
            </TabsTrigger>
            <TabsTrigger value="niches" className="flex items-center">
              <Lightbulb className="mr-2 h-4 w-4" />
              Niche Products
            </TabsTrigger>
            <TabsTrigger value="radar" className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trend Radar
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder={`Search ${activeTab}...`} className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="domains" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Trend Score</TableHead>
                    <TableHead>Est. Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Analysis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {domains.map((d) => (
                    <TableRow key={d.domain} className="group">
                      <TableCell className="font-bold flex items-center">
                        {d.domain}
                        <ExternalLink className="ml-2 h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">{d.category}</Badge>
                      </TableCell>
                      <TableCell className="w-48">
                        <div className="flex items-center space-x-2">
                          <Progress value={d.score} className="h-1.5 flex-1" />
                          <span className="text-xs font-bold w-6">{d.score}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-emerald-600 font-bold">{d.value}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={
                          d.status === 'AVAILABLE' ? 'bg-emerald-500/10 text-emerald-500' :
                          d.status === 'AUCTION' ? 'bg-amber-500/10 text-amber-500' : 'bg-muted text-muted-foreground'
                        }>
                          {d.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 group-hover:bg-purple-500/10 group-hover:text-purple-600">
                          Analyze
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="niches" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {niches.map((n) => (
              <Card key={n.name} className="relative overflow-hidden group border-purple-500/20 hover:border-purple-500/50 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={
                      n.competition === 'Low' ? 'bg-emerald-500' : 'bg-amber-500'
                    }>{n.competition} Competition</Badge>
                    <span className="text-xs font-bold text-muted-foreground uppercase">{n.type}</span>
                  </div>
                  <CardTitle className="text-lg">{n.name}</CardTitle>
                  <CardDescription>{n.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">Target Audience</p>
                      <p className="text-sm font-medium">{n.audience}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">Est. TAM</p>
                      <p className="text-sm font-bold text-purple-600">{n.tam}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t p-3">
                  <Button variant="ghost" size="sm" className="w-full h-8 hover:bg-purple-500 hover:text-white transition-colors group">
                    <Sparkles className="mr-2 h-3 w-3 group-hover:animate-pulse" />
                    Deep Dive Analysis
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="radar">
          <Card className="h-[600px] flex items-center justify-center border-2 border-dashed relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent"></div>
            </div>
            <div className="text-center space-y-4 relative z-10">
              <div className="mx-auto bg-purple-100 p-6 rounded-full w-20 h-20 flex items-center justify-center dark:bg-purple-900/30">
                <BarChart3 className="h-10 w-10 text-purple-600" />
              </div>
              <div>
                <CardTitle>Emerging Trend Radar</CardTitle>
                <CardDescription>Visualizing {niches.length + domains.length} high-signal opportunities across the digital spectrum.</CardDescription>
              </div>
              <p className="text-sm text-muted-foreground max-w-md mx-auto italic">
                (Interactive Bubble Chart: Mapping signal strength against time-to-market. Larger bubbles represent higher estimated opportunity value.)
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}