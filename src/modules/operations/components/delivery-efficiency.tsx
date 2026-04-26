"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { time: '08:00', efficiency: 85 },
  { time: '10:00', efficiency: 88 },
  { time: '12:00', efficiency: 82 },
  { time: '14:00', efficiency: 90 },
  { time: '16:00', efficiency: 94 },
  { time: '18:00', efficiency: 89 },
  { time: '20:00', efficiency: 92 },
];

export function DeliveryEfficiency() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Delivery Efficiency Index</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--background))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="efficiency" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary) / 0.1)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}