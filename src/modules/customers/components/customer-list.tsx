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

const customers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    spent: "$12,450.00",
    segment: "VIP",
    status: "Active",
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane@example.com",
    spent: "$3,200.00",
    segment: "Regular",
    status: "Active",
  },
  {
    id: "CUST-003",
    name: "Robert Brown",
    email: "robert@example.com",
    spent: "$850.00",
    segment: "At-Risk",
    status: "Inactive",
  },
  {
    id: "CUST-004",
    name: "Alice Johnson",
    email: "alice@example.com",
    spent: "$2,100.00",
    segment: "New",
    status: "Active",
  },
];

const segmentStyles = {
  VIP: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  Regular: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  "At-Risk": "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20",
  New: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
};

export function CustomerList() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Spent</TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((cust) => (
              <TableRow key={cust.id}>
                <TableCell>
                  <div className="font-medium">{cust.name}</div>
                  <div className="text-xs text-muted-foreground">{cust.email}</div>
                </TableCell>
                <TableCell>{cust.spent}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={segmentStyles[cust.segment as keyof typeof segmentStyles]}>
                    {cust.segment}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={cust.status === "Active" ? "text-emerald-500" : "text-muted-foreground"}>
                    {cust.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}