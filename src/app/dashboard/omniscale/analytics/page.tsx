"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell
} from "recharts";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  TrendingUp, 
  Download, 
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const trendData = [
  { name: "01 Apr", revenue: 45000, cost: 32000 },
  { name: "05 Apr", revenue: 52000, cost: 34000 },
  { name: "10 Apr", revenue: 48000, cost: 31000 },
  { name: "15 Apr", revenue: 61000, cost: 38000 },
  { name: "20 Apr", revenue: 55000, cost: 35000 },
  { name: "25 Apr", revenue: 67000, cost: 41000 },
];

const locationComparison = [
  { name: "New York", value: 850, change: 12 },
  { name: "Los Angeles", value: 720, change: -5 },
  { name: "Chicago", value: 640, change: 8 },
  { name: "Miami", value: 410, change: 15 },
  { name: "Houston", value: 590, change: 2 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Unified Analytics</h1>
          <p className="text-muted-foreground">
            Normalized insights aggregated from all operational data sources and locations.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setDateRange("Last 7 Days")}>Last 7 Days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("Last 30 Days")}>Last 30 Days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("Last 90 Days")}>Last 90 Days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("Year to Date")}>Year to Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm">
            <MapPin className="mr-2 h-4 w-4" />
            All Locations
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>

          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Normalized Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124,592.00</div>
            <div className="flex items-center pt-1 text-xs text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              14.2% from previous period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$84,210.00</div>
            <div className="flex items-center pt-1 text-xs text-rose-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              2.1% from previous period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Ingestion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2k rec/sec</div>
            <div className="flex items-center pt-1 text-xs text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              8.4% since last sync
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Integrity Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.4%</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              Stable performance
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue vs. Cost Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="cost" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Performance by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationComparison}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}