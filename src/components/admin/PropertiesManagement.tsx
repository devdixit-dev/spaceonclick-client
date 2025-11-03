// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Building, Edit, Trash2, MapPin, Square } from "lucide-react";
// import axios from "axios";
// import { useToast } from "@/hooks/use-toast";

// const PropertiesManagement = () => {
//   const { toast } = useToast();

//   const getStatusColor = (isAvailable: boolean) => {
//     switch (isAvailable) {
//       case true: return 'default';
//       case false: return 'secondary';
//       default: return 'secondary';
//     }
//   };

//   const [Allproperties, setAllProperties] = useState([]);

//   const fetchAllProperties = async () => {
//     const res = (await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`, {})).data
//     setAllProperties(res.data);
//   }

//   useEffect(() => {
//     fetchAllProperties();
//   }, []);

//   const handlePropertyEdit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//   }

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handlePropertyDelete = async (id: any) => {
//     const res = (await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/property/delete/${id}`)).data;
//     if (res.success) {
//       toast({
//         title: "Property Deleted",
//         description: "Property has been successfully deleted from the database.",
//       });

//       fetchAllProperties();
//     } else {
//       toast({
//         title: "Error",
//         description: res.message || "Failed to delete property.",
//         variant: "destructive",
//       });
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center">
//           <Building className="h-5 w-5 mr-2" />
//           Property Management
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Property Details</TableHead>
//                 <TableHead>Location & Size</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {Allproperties.map((property) => (
//                 <TableRow key={property._id}>
//                   <TableCell>
//                     <div className="space-y-1">
//                       <div className="flex items-center">
//                         <Building className="h-4 w-4 mr-2 text-muted-foreground" />
//                         <span className="font-medium">{property.propertyName}</span>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="space-y-1">
//                       <div className="flex items-center">
//                         <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
//                         <span className="text-sm">{property.location}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Square className="h-4 w-4 mr-2 text-muted-foreground" />
//                         <span className="text-sm">{
//                           property.propertyID === 'PGR-005'
//                             ? `${property.seatingCapacity} Beds Available`
//                             : `${property.area} sq ft`}
//                         </span>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge variant={getStatusColor(property.isAvailable)}>
//                       {property.isAvailable ? "Available" : "Not available"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex gap-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => { }}
//                       >
//                         <Edit className="h-3 w-3 mr-1" />
//                         Edit
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handlePropertyDelete(property.propertyID)}
//                       >
//                         <Trash2 className="h-3 w-3 mr-1" />
//                         Delete
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default PropertiesManagement;







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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Edit, Trash2, MapPin, Square } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface Property {
  _id: string;
  propertyName: string;
  propertyID: string;
  location: string;
  area?: number;
  seatingCapacity?: number;
  isAvailable: boolean;
}

const PropertiesManagement = () => {
  const { toast } = useToast();
  const [Allproperties, setAllProperties] = useState<Property[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<Partial<Property>>({});

  const getStatusColor = (isAvailable: boolean) =>
    isAvailable ? "default" : "secondary";

  // Fetch all properties
  const fetchAllProperties = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`);
      setAllProperties(res.data.data);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch properties.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAllProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Delete a property
  const handlePropertyDelete = async (id: string) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admin/property/delete/${id}`
      );
      if (res.data.success) {
        toast({
          title: "Property Deleted",
          description: "Successfully removed from the database.",
        });
        fetchAllProperties();
      } else {
        throw new Error(res.data.message || "Failed to delete property.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Deletion failed.",
        variant: "destructive",
      });
    }
  };

  // Open edit modal
  const handleEditClick = (property: Property) => {
    setSelectedProperty(property);
    setFormData({ ...property });
    setOpen(true);
  };

  // Update property API call
  const handlePropertyUpdate = async () => {
    if (!selectedProperty) return;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/property/update/${selectedProperty.propertyID}`,
        formData
      );

      if (res.data.success) {
        toast({
          title: "Updated",
          description: "Property details updated successfully.",
        });
        setOpen(false);
        fetchAllProperties();
      } else {
        throw new Error(res.data.message || "Failed to update property.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Update failed.",
        variant: "destructive",
      });
    }
  };

  // Input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "area" || name === "seatingCapacity"
          ? Number(value)
          : name === "isAvailable"
            ? value === "true"
            : value,
    });
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
                        <span className="text-sm">
                          {property.propertyID === "PGR-005"
                            ? `${property.seatingCapacity} Beds`
                            : `${property.area} sq ft`}
                        </span>
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
                        onClick={() => handleEditClick(property)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePropertyDelete(property.propertyID)}
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

      {/* Edit Property Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Property Details</DialogTitle>
          </DialogHeader>

          {selectedProperty && (
            <div className="space-y-4">
              <div>
                <Label>Property Name</Label>
                <Input
                  name="propertyName"
                  value={formData.propertyName || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label>Area (sq ft)</Label>
                <Input
                  name="area"
                  type="number"
                  value={formData.area || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label>Seating Capacity</Label>
                <Input
                  name="seatingCapacity"
                  type="number"
                  value={formData.seatingCapacity || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label>Status</Label>
                <select
                  name="isAvailable"
                  value={formData.isAvailable ? "true" : "false"}  // safe conversion to string
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isAvailable: e.target.value === "true", // convert back to boolean
                    })
                  }
                  className="w-full border rounded-md p-2"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>

              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePropertyUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PropertiesManagement;
