import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Building, 
  LogOut,
  TrendingUp,
  Plus
} from "lucide-react";
import PropertyForm from "@/components/admin/PropertyForm";
import BookingsList from "@/components/admin/BookingsList";
import PropertiesManagement from "@/components/admin/PropertiesManagement";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<unknown[]>([]);
  const [properties, setProperties] = useState<unknown[]>([]);
  const [editingProperty, setEditingProperty] = useState<unknown>(null);

  useEffect(() => {
    // Check if admin is authenticated
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin/login");
      return;
    }

    // Load bookings from localStorage
    const storedBookings = localStorage.getItem("bookingData");
    if (storedBookings) {
      try {
        const booking = JSON.parse(storedBookings);
        setBookings([booking]);
      } catch (error) {
        console.error("Error parsing booking data:", error);
      }
    }

    // Initialize with dummy data
    initializeDummyData();
  }, [navigate]);

  const initializeDummyData = () => {
    // Dummy bookings data
    const dummyBookings = [
      {
        id: "BK001",
        customerName: "John Smith",
        customerEmail: "john.smith@techcorp.com",
        customerPhone: "+1 (555) 123-4567",
        company: "TechCorp Inc.",
        propertyName: "Executive Suite Premium",
        propertyId: "ES-001",
        bookingDate: "2024-01-15",
        bookingTime: "10:30 AM",
        visitDate: "2024-01-20",
        visitTime: "2:00 PM",
        planType: "Premium",
        status: "confirmed",
        additionalDetails: "Need parking space for 2 cars",
        createdAt: "2024-01-15T10:30:00Z"
      },
      {
        id: "BK002",
        customerName: "Sarah Johnson",
        customerEmail: "sarah@startuplab.io",
        customerPhone: "+1 (555) 987-6543",
        company: "StartupLab",
        propertyName: "Modern Collaborative Hub",
        propertyId: "MCH-002",
        bookingDate: "2024-01-16",
        bookingTime: "2:15 PM",
        visitDate: "2024-01-22",
        visitTime: "11:00 AM",
        planType: "Standard",
        status: "pending",
        additionalDetails: "Looking for long-term lease",
        createdAt: "2024-01-16T14:15:00Z"
      },
      {
        id: "BK003",
        customerName: "Michael Chen",
        customerEmail: "m.chen@designstudio.com",
        customerPhone: "+1 (555) 456-7890",
        company: "Creative Design Studio",
        propertyName: "Private Office Elite",
        propertyId: "POE-003",
        bookingDate: "2024-01-17",
        bookingTime: "11:45 AM",
        visitDate: "2024-01-25",
        visitTime: "3:30 PM",
        planType: "Premium",
        status: "confirmed",
        createdAt: "2024-01-17T11:45:00Z"
      }
    ];

    // Dummy properties data
    const dummyProperties = [
      {
        id: "ES-001",
        name: "Executive Suite Premium",
        location: "Downtown Business District",
        sqft: 1200,
        monthlyRate: "$2,500",
        status: "Available",
        description: "Premium executive office space with panoramic city views",
        amenities: ["High-speed WiFi", "Conference room", "Kitchen", "Parking", "24/7 Security"],
        bookingsCount: 5,
        nextAvailableDate: "2024-02-01"
      },
      {
        id: "MCH-002", 
        name: "Modern Collaborative Hub",
        location: "Tech Quarter",
        sqft: 800,
        monthlyRate: "$1,800",
        status: "Available",
        description: "Open collaborative workspace perfect for startups",
        amenities: ["High-speed WiFi", "Meeting rooms", "Kitchen", "Shared workspace"],
        bookingsCount: 3,
        nextAvailableDate: "2024-01-25"
      },
      {
        id: "POE-003",
        name: "Private Office Elite", 
        location: "Financial District",
        sqft: 600,
        monthlyRate: "$2,200",
        status: "Occupied",
        description: "Private office space with premium furnishing",
        amenities: ["High-speed WiFi", "Private entrance", "Reception area", "Parking"],
        bookingsCount: 2,
        nextAvailableDate: "2024-03-01"
      }
    ];

    setBookings(prev => prev.length > 0 ? [...prev, ...dummyBookings] : dummyBookings);
    setProperties(dummyProperties);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handlePropertyAdded = (newProperty: unknown) => {
    setProperties(prev => [...prev, newProperty]);
  };

  const handleEditProperty = (property: unknown) => {
    setEditingProperty(property);
  };

  const handlePropertyUpdated = (updatedProperty: unknown) => {
    setProperties(prev => prev.map(p => p?.id === updatedProperty?.id ? updatedProperty : p));
    setEditingProperty(null);
  };

  const handleCancelEdit = () => {
    setEditingProperty(null);
  };

  const handleDeleteProperty = (propertyId: string) => {
    setProperties(prev => prev.filter(p => p.id !== propertyId));
    toast({
      title: "Property Deleted",
      description: "Property has been removed successfully.",
    });
  };

  // Statistics
  // const stats = [
  //   {
  //     title: "Total Bookings",
  //     value: bookings.length.toString(),
  //     icon: Calendar,
  //     trend: "+12%"
  //   },
  //   {
  //     title: "Active Properties",
  //     value: properties.filter(p => p.status === "Available").length.toString(),
  //     icon: Building,
  //     trend: "+0%"
  //   },
  //   {
  //     title: "Total Inquiries",
  //     value: (bookings.length + 5).toString(),
  //     icon: Users,
  //     trend: "+8%"
  //   },
  //   {
  //     title: "Revenue This Month",
  //     value: "$12,500",
  //     icon: TrendingUp,
  //     trend: "+15%"
  //   }
  // ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary font-effra">Welcome, Admin</h1>
                <p className="text-sm text-text-secondary">Dashboard</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6" value={editingProperty ? "add-property" : undefined}>
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="bookings" disabled={!!editingProperty}>All Bookings</TabsTrigger>
            <TabsTrigger value="properties" disabled={!!editingProperty}>Manage Properties</TabsTrigger>
            <TabsTrigger value="add-property">{editingProperty ? "Edit Property" : "Add Property"}</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <BookingsList bookings={bookings} />
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties">
            <PropertiesManagement 
              properties={properties}
              onEditProperty={handleEditProperty}
              onDeleteProperty={handleDeleteProperty}
            />
          </TabsContent>

          {/* Add Property Tab */}
          <TabsContent value="add-property">
            <PropertyForm 
              onPropertyAdded={handlePropertyAdded}
              onPropertyUpdated={handlePropertyUpdated}
              editProperty={editingProperty}
              onCancelEdit={handleCancelEdit}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;