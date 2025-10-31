import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building, Edit, Trash2, MapPin, Square } from "lucide-react";
import axios from "axios";

// interface Property {
//   _id: string;
//   name: string;
//   location: string;
//   size: number;
//   isAvailable: boolean;
//   description?: string;
//   amenities?: string[];
//   createdAt?: string;
//   bookingsCount?: number;
//   nextAvailableDate?: string;
// }

const PropertiesManagement = () => {
  const getStatusColor = (isAvailable: boolean) => {
    switch (isAvailable) {
      case true: return 'default';
      case false: return 'secondary';
      default: return 'secondary';
    }
  };

  const [Allproperties, setAllProperties] = useState([]);

  useEffect(() => {
    const fetchAllProperties = async () => {
      const res = (await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`, {})).data
      console.log(res.data)
      setAllProperties(res.data);
    }
    fetchAllProperties();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="h-5 w-5 mr-2" />
          Property Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property Details</TableHead>
                <TableHead>Location & Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Allproperties.map((property) => (
                <TableRow key={property._id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">{property.propertyName}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{property.area.toLocaleString()} sq ft</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(property.isAvailable)}>
                      {property.isAvailable ? "Available" : "Not available"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { }}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => { }}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertiesManagement;