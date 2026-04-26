"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Copy, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Target,
  Clock,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const pitches = [
  {
    id: "PITCH-001",
    industry: "Healthcare",
    role: "Clinical Director",
    date: "2026-04-25",
    tone: "Consultative",
    format: "Email",
    status: "REFINED",
    potential: "$12k/mo",
  },
  {
    id: "PITCH-002",
    industry: "Logistics",
    role: "Operations Manager",
    date: "2026-04-24",
    tone: "Bold",
    format: "One-Pager",
    status: "DRAFT",
    potential: "$45k/mo",
  },
  {
    id: "PITCH-003",
    industry: "Real Estate",
    role: "Principal Broker",
    date: "2026-04-20",
    tone: "Professional",
    format: "Slide Deck",
    status: "EXPORTED",
    potential: "$8k/mo",
  },
  {
    id: "PITCH-004",
    industry: "Legal",
    role: "Senior Partner",
    date: "2026-04-18",
    tone: "Consultative",
    format: "Email",
    status: "REFINED",
    potential: "$22k/mo",
  },
];

const statusStyles = {
  DRAFT: "bg-amber-500/10 text-amber-600 border-amber-200",
  REFINED: "bg-blue-500/10 text-blue-600 border-blue-200",
  EXPORTED: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
};

export default function AutoPitchLibraryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center">
            AutoPitch
            <Badge variant="outline" className="ml-3 font-mono text-[10px] border-primary/30 text-primary uppercase">Automation Sales</Badge>
          </h1>
          <p className="text-muted-foreground mt-1">
            Generate and manage high-conversion automation service pitches for industry professionals.
          </p>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
          <Link href="/dashboard/autopitch/generate">
            <Plus className="mr-2 h-4 w-4" />
            New Pitch
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-bold uppercase tracking-wider">Pitches Generated</CardDescription>
            <CardTitle className="text-2xl font-bold">142</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">+12 this week</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-bold uppercase tracking-wider">Avg. Estimated ROI</CardDescription>
            <CardTitle className="text-2xl font-bold">3.4x</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-emerald-500 font-medium">Efficiency benchmark</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-bold uppercase tracking-wider">Conversion Rate</CardDescription>
            <CardTitle className="text-2xl font-bold">24%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">From export to lead</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-bold uppercase tracking-wider">Potential Captured</CardDescription>
            <CardTitle className="text-2xl font-bold">$1.2M</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Est. yearly savings</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Generated Pitch History</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Filter pitches..." className="pl-8 h-9" />
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
                <TableHead className="pl-6">Industry & Role</TableHead>
                <TableHead>Format & Tone</TableHead>
                <TableHead>Est. Savings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pitches.map((pitch) => (
                <TableRow key={pitch.id} className="group cursor-pointer">
                  <TableCell className="pl-6">
                    <div className="font-bold flex items-center">
                      {pitch.industry}
                      <Badge variant="outline" className="ml-2 text-[9px] h-4 py-0 font-normal uppercase">{pitch.id}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{pitch.role}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="text-sm font-medium">{pitch.format}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{pitch.tone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-bold text-emerald-600">{pitch.potential}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "text-[10px] font-bold px-2 py-0.5",
                      statusStyles[pitch.status as keyof typeof statusStyles]
                    )}>
                      {pitch.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" asChild>
                        <Link href={`/dashboard/autopitch/${pitch.id}`}>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
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