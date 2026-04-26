import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const campaigns = [
  {
    id: "CAM-001",
    name: "Spring Sale 2026",
    type: "Email",
    status: "Active",
    roi: "3.2x",
    spent: "$4,500",
  },
  {
    id: "CAM-002",
    name: "Lead Gen Q2",
    type: "Search",
    status: "Active",
    roi: "2.8x",
    spent: "$12,000",
  },
  {
    id: "CAM-003",
    name: "Social Retargeting",
    type: "Social",
    status: "Paused",
    roi: "4.1x",
    spent: "$3,200",
  },
  {
    id: "CAM-004",
    name: "Partner Display",
    type: "Display",
    status: "Completed",
    roi: "1.9x",
    spent: "$8,000",
  },
];

const statusStyles = {
  Active: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
  Paused: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
  Completed: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
};

export function CampaignList() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Active Campaigns</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>ROI</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((camp) => (
              <TableRow key={camp.id}>
                <TableCell>
                  <div className="font-medium">{camp.name}</div>
                  <div className="text-xs text-muted-foreground">{camp.type} • {camp.spent}</div>
                </TableCell>
                <TableCell className="font-semibold text-emerald-600">{camp.roi}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statusStyles[camp.status as keyof typeof statusStyles]}>
                    {camp.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}