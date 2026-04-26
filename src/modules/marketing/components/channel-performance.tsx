"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: 'Email', leads: 400, conversion: 240 },
  { name: 'Social', leads: 300, conversion: 139 },
  { name: 'Search', leads: 200, conversion: 98 },
  { name: 'Display', leads: 278, conversion: 190 },
  { name: 'Referral', leads: 189, conversion: 48 },
];

export function ChannelPerformance() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Channel Performance (Leads vs. Conversion)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--muted))" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              <Bar dataKey="conversion" fill="hsl(var(--primary) / 0.5)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}