import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Building, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PropertyForm = ({ 
  onPropertyAdded, 
  onPropertyUpdated,
  editProperty,
  onCancelEdit 
}: { 
  onPropertyAdded: (property: any) => void;
  onPropertyUpdated?: (property: any) => void;
  editProperty?: any;
  onCancelEdit?: () => void;
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    sqft: "",
    monthlyRate: "",
    description: "",
    amenities: "",
    status: "Available",
    images: [] as string[]
  });

  useEffect(() => {
    if (editProperty) {
      setFormData({
        name: editProperty.name || "",
        location: editProperty.location || "",
        sqft: editProperty.sqft?.toString() || "",
        monthlyRate: editProperty.monthlyRate?.replace('$', '').replace(',', '') || "",
        description: editProperty.description || "",
        amenities: editProperty.amenities?.join(', ') || "",
        status: editProperty.status || "Available",
        images: editProperty.images || []
      });
    }
  }, [editProperty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const propertyData = {
      id: editProperty ? editProperty.id : `PROP-${Date.now()}`,
      name: formData.name,
      location: formData.location,
      sqft: parseInt(formData.sqft),
      monthlyRate: `$${formData.monthlyRate}`,
      description: formData.description,
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean),
      status: formData.status,
      images: formData.images,
      createdAt: editProperty ? editProperty.createdAt : new Date().toISOString()
    };

    if (editProperty && onPropertyUpdated) {
      onPropertyUpdated(propertyData);
    } else {
      onPropertyAdded(propertyData);
    }
    
    // Reset form only if not editing
    if (!editProperty) {
      setFormData({
        name: "",
        location: "",
        sqft: "",
        monthlyRate: "",
        description: "",
        amenities: "",
        status: "Available",
        images: []
      });
    } else {
      onCancelEdit?.();
    }

    toast({
      title: editProperty ? "Property Updated" : "Property Added",
      description: editProperty ? "Property has been updated successfully." : "New property has been added successfully.",
    });
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setFormData(prev => ({ 
          ...prev, 
          images: [...prev.images, imageUrl] 
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            {editProperty ? <Building className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
            {editProperty ? "Edit Property" : "Add New Property"}
          </div>
          {editProperty && (
            <Button variant="outline" size="sm" onClick={onCancelEdit}>
              Cancel
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Property Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Executive Suite Premium"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Downtown Business District"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sqft">Square Feet</Label>
              <Input
                id="sqft"
                type="number"
                value={formData.sqft}
                onChange={(e) => handleInputChange("sqft", e.target.value)}
                placeholder="1200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyRate">Monthly Rate ($)</Label>
              <Input
                id="monthlyRate"
                type="number"
                value={formData.monthlyRate}
                onChange={(e) => handleInputChange("monthlyRate", e.target.value)}
                placeholder="2500"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Premium office space with modern amenities..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities (comma-separated)</Label>
            <Input
              id="amenities"
              value={formData.amenities}
              onChange={(e) => handleInputChange("amenities", e.target.value)}
              placeholder="High-speed WiFi, Conference room, Kitchen, Parking"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Occupied">Occupied</SelectItem>
                <SelectItem value="Maintenance">Under Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Property Images</Label>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-accent/50 hover:bg-accent">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-text-secondary" />
                    <p className="mb-2 text-sm text-text-secondary">
                      <span className="font-semibold">Click to upload</span> property images
                    </p>
                    <p className="text-xs text-text-secondary">PNG, JPG or JPEG</p>
                  </div>
                  <input 
                    id="image-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`Property ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            <Building className="h-4 w-4 mr-2" />
            {editProperty ? "Update Property" : "Add Property"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;