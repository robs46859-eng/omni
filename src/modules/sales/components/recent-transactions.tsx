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

const transactions = [
  {
    id: "TRX-001",
    customer: "Acme Corp",
    amount: "$2,500.00",
    status: "completed",
    date: "2026-04-26",
  },
  {
    id: "TRX-002",
    customer: "Global Tech",
    amount: "$1,200.00",
    status: "pending",
    date: "2026-04-26",
  },
  {
    id: "TRX-003",
    customer: "Zylker Inc",
    amount: "$850.00",
    status: "completed",
    date: "2026-04-25",
  },
  {
    id: "TRX-004",
    customer: "Nexus Ltd",
    amount: "$3,100.00",
    status: "cancelled",
    date: "2026-04-25",
  },
];

const statusStyles = {
  completed: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
  cancelled: "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20",
};

export function RecentTransactions() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.id}</TableCell>
                <TableCell>{tx.customer}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statusStyles[tx.status as keyof typeof statusStyles]}>
                    {tx.status}
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