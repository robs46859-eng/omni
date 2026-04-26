import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const resources = [
  {
    id: "RES-001",
    name: "Main Warehouse",
    type: "Facility",
    usage: 82,
    status: "Active",
  },
  {
    id: "RES-002",
    name: "Cold Storage A",
    type: "Facility",
    usage: 94,
    status: "Critical",
  },
  {
    id: "RES-003",
    name: "Fleet Maintenance",
    type: "Equipment",
    usage: 45,
    status: "Active",
  },
  {
    id: "RES-004",
    name: "Dispatch Team",
    type: "Personnel",
    usage: 68,
    status: "Active",
  },
];

export function ResourceUtilization() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Resource Utilization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {resources.map((res) => (
            <div key={res.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium leading-none">{res.name}</p>
                  <p className="text-xs text-muted-foreground">{res.type}</p>
                </div>
                <span className="text-sm font-semibold">{res.usage}%</span>
              </div>
              <Progress value={res.usage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}