import { useState } from "react";
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
import { Building, Edit, Trash2, Eye, MapPin, Square } from "lucide-react";

interface Property {
  id: string;
  name: string;
  location: string;
  sqft: number;
  monthlyRate: string;
  status: string;
  description?: string;
  amenities?: string[];
  createdAt?: string;
  bookingsCount?: number;
  nextAvailableDate?: string;
}

const PropertiesManagement = ({ 
  properties, 
  onEditProperty, 
  onDeleteProperty 
}: { 
  properties: Property[];
  onEditProperty: (property: Property) => void;
  onDeleteProperty: (propertyId: string) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return 'default';
      case 'occupied': return 'secondary';
      case 'maintenance': return 'destructive';
      default: return 'secondary';
    }
  };

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
                <TableHead>Pricing</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">{property.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">ID: {property.id}</p>
                      {property.amenities && property.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {property.amenities.slice(0, 2).map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {property.amenities.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{property.amenities.length - 2} more
                            </Badge>
                          )}
                        </div>
                      )}
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
                        <span className="text-sm">{property.sqft.toLocaleString()} sq ft</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-lg">{property.monthlyRate}</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(property.status)}>
                      {property.status}
                    </Badge>
                    {property.nextAvailableDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Next available: {property.nextAvailableDate}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">{property.bookingsCount || 0}</div>
                      <div className="text-sm text-muted-foreground">bookings</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {/* View details */}}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onEditProperty(property)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onDeleteProperty(property.id)}
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