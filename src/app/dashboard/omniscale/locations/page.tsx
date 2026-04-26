import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Map, List, Download, Upload, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const locations = [
  { id: "LOC-001", name: "New York Hub", region: "North", status: "Active", devices: 12 },
  { id: "LOC-002", name: "Los Angeles Center", region: "West", status: "Active", devices: 8 },
  { id: "LOC-003", name: "Chicago Node", region: "Midwest", status: "Active", devices: 5 },
  { id: "LOC-004", name: "Miami Branch", region: "South", status: "Inactive", devices: 0 },
  { id: "LOC-005", name: "Houston Depot", region: "South", status: "Active", devices: 14 },
];

export default function LocationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Location Manager</h1>
          <p className="text-muted-foreground">
            Monitor and organize your global operational nodes by region and type.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Bulk Import
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        </div>
      </div>

      <Tabs defaultValue="table" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="table" className="flex items-center">
              <List className="mr-2 h-4 w-4" />
              Table View
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center">
              <Map className="mr-2 h-4 w-4" />
              Map View
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search locations..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Active Devices</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locations.map((loc) => (
                    <TableRow key={loc.id}>
                      <TableCell className="font-medium">{loc.name}</TableCell>
                      <TableCell>{loc.region}</TableCell>
                      <TableCell>{loc.devices}</TableCell>
                      <TableCell>
                        <span className={loc.status === "Active" ? "text-emerald-500" : "text-muted-foreground"}>
                          {loc.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card className="h-[500px] flex items-center justify-center border-2 border-dashed">
            <div className="text-center space-y-4">
              <div className="mx-auto bg-primary/10 p-6 rounded-full w-20 h-20 flex items-center justify-center">
                <Map className="h-10 w-10 text-primary" />
              </div>
              <div>
                <CardTitle>Interactive US Map</CardTitle>
                <CardDescription>Visualizing {locations.length} operational nodes across the United States.</CardDescription>
              </div>
              <p className="text-sm text-muted-foreground max-w-md mx-auto italic">
                (SVG Map Integration: Interactive regions highlighting node density and health status based on real-time data ingestion.)
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}