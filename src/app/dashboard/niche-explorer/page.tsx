"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  Users, 
  TrendingUp, 
  PieChart, 
  Share2, 
  ChevronRight,
  Plus,
  ArrowRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

const segments = [
  {
    id: "SEG-001",
    name: "Independent Ceramicists",
    category: "NON_MEDIA",
    size: "125k",
    growth: 14.5,
    relevance: 92,
    platforms: ["Instagram", "TikTok", "Etsy"],
  },
  {
    id: "SEG-002",
    name: "Urban Rooftop Gardeners",
    category: "HYBRID",
    size: "450k",
    growth: 22.1,
    relevance: 85,
    platforms: ["Reddit", "YouTube", "Discord"],
  },
  {
    id: "SEG-003",
    name: "Synthetic Biology Hobbyists",
    category: "NON_MEDIA",
    size: "45k",
    growth: 38.2,
    relevance: 95,
    platforms: ["Substack", "Discord", "Niche Forums"],
  },
  {
    id: "SEG-004",
    name: "Retro Console Modders",
    category: "MEDIA",
    size: "210k",
    growth: 8.4,
    relevance: 78,
    platforms: ["YouTube", "Reddit", "Twitch"],
  },
  {
    id: "SEG-005",
    name: "AI Ethics Advocates",
    category: "MEDIA",
    size: "85k",
    growth: 52.0,
    relevance: 88,
    platforms: ["Substack", "X", "LinkedIn"],
  },
  {
    id: "SEG-006",
    name: "Off-Grid Solar Enthusiasts",
    category: "NON_MEDIA",
    size: "320k",
    growth: 12.1,
    relevance: 82,
    platforms: ["YouTube", "Facebook", "IRL"],
  },
];

export default function NicheExplorerPage() {
  const [category, setCategory] = useState("ALL");

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Left Filter Panel */}
      <div className="w-80 border-r bg-card p-6 overflow-y-auto hidden lg:block">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Filters</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Tabs defaultValue="ALL" className="w-full" onValueChange={setCategory}>
                  <TabsList className="grid grid-cols-4 w-full h-8 p-1">
                    <TabsTrigger value="ALL" className="text-[10px]">All</TabsTrigger>
                    <TabsTrigger value="MEDIA" className="text-[10px]">Media</TabsTrigger>
                    <TabsTrigger value="NON_MEDIA" className="text-[10px]">Non-M</TabsTrigger>
                    <TabsTrigger value="HYBRID" className="text-[10px]">Hybrid</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Audience Size</Label>
                  <span className="text-[10px] text-muted-foreground">0 - 1M+</span>
                </div>
                <Progress value={40} className="h-1.5" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Growth Rate (Min)</Label>
                  <span className="text-[10px] text-muted-foreground">15%</span>
                </div>
                <Progress value={15} className="h-1.5" />
              </div>

              <div className="space-y-3">
                <Label>Platforms</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["TikTok", "Reddit", "YouTube", "Podcasts", "Substack", "Discord", "Forums", "IRL"].map((p) => (
                    <div key={p} className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded border border-primary/50" />
                      <span className="text-xs text-muted-foreground">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="w-full h-8 text-xs">Reset Filters</Button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">NicheMarket Explorer</h1>
            <p className="text-muted-foreground">Identify hyper-niche audience segments and monetization gaps.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <PieChart className="mr-2 h-4 w-4" />
              Compare
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Segment
            </Button>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search audience segments by keyword, value, or platform..." className="pl-10 h-11 bg-card shadow-sm" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {segments.map((s) => (
            <Link key={s.id} href={`/dashboard/niche-explorer/${s.id}`}>
              <Card className="group hover:border-primary transition-all duration-300 hover:shadow-md cursor-pointer h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-[10px] font-bold">{s.category}</Badge>
                    <div className="flex items-center text-emerald-500 text-xs font-bold">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      {s.growth}%
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{s.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Users className="mr-1.5 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{s.size}</span>
                    </div>
                    <div className="flex space-x-1">
                      {s.platforms.map((p) => (
                        <div key={p} className="h-5 w-5 rounded bg-muted flex items-center justify-center" title={p}>
                          <span className="text-[8px] font-bold">{p[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase">
                      <span>Relevance Score</span>
                      <span>{s.relevance}%</span>
                    </div>
                    <Progress value={s.relevance} className="h-1.5" />
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-4 px-6 border-t bg-muted/20">
                  <div className="flex items-center justify-end w-full mt-3">
                    <span className="text-xs font-medium mr-1 text-muted-foreground group-hover:text-primary transition-colors">View Profile</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}