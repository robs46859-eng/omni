import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const suppliers = [
  {
    id: "SUP-001",
    name: "Global Logistics",
    category: "Shipping",
    rating: 4.8,
    status: "Active",
  },
  {
    id: "SUP-002",
    name: "TechParts Inc",
    category: "Electronics",
    rating: 4.2,
    status: "Active",
  },
  {
    id: "SUP-003",
    name: "Fabrics & Co",
    category: "Textiles",
    rating: 3.5,
    status: "Under Review",
  },
  {
    id: "SUP-004",
    name: "AutoSystems",
    category: "Parts",
    rating: 4.9,
    status: "Preferred",
  },
];

export function SupplierList() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Suppliers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>
                  <div className="font-medium">{supplier.name}</div>
                  <div className="text-xs text-muted-foreground">{supplier.category}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="mr-1 h-3 w-3 fill-amber-500 text-amber-500" />
                    <span className="text-sm">{supplier.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-medium">{supplier.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}