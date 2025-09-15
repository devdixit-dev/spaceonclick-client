import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Wifi, Car, Coffee, Shield, ArrowLeft } from "lucide-react";

// Import office images
import officeSpace1 from "@/assets/office-space-1.jpg";
import officeSpace2 from "@/assets/office-space-2.jpg";
import officeSpace3 from "@/assets/office-space-3.jpg";

const PropertyDetail = () => {
  const { id } = useParams();

  const properties = {
    "1": {
      id: "1",
      name: "Executive Suite Premium",
      images: [officeSpace1, officeSpace2, officeSpace3],
      description: "A sophisticated executive office space perfect for established businesses. Features premium furnishings, private meeting areas, and stunning city views. This flagship location offers the perfect blend of luxury and functionality for discerning professionals.",
      longDescription: "Our Executive Suite Premium represents the pinnacle of professional workspace design. Located in the heart of the downtown business district, this premium office space spans 1,200 square feet of meticulously designed workspace. The suite features floor-to-ceiling windows offering panoramic city views, premium hardwood flooring, and designer furnishings throughout. The space includes a private executive office, dedicated meeting room, reception area, and collaborative workspace for your team.",
      sqft: 1200,
      location: "Downtown Business District",
      address: "123 Executive Plaza, Suite 2000, Downtown",
      amenities: [
        "High-speed Fiber Internet",
        "Private Meeting Rooms", 
        "Dedicated Reception Area",
        "Covered Parking",
        "24/7 Secure Access",
        "Concierge Services",
        "Premium Furnishings",
        "City Views",
        "Executive Kitchen",
        "Phone Booths"
      ],
      propertyId: "ES-001",
      monthlyRate: "$2,500",
      availability: "Available Now"
    },
    "2": {
      id: "2", 
      name: "Modern Collaborative Hub",
      images: [officeSpace2, officeSpace3, officeSpace1],
      description: "Open-plan workspace designed for creative teams and startups. Flexible layout with collaborative zones and state-of-the-art technology infrastructure.",
      longDescription: "The Modern Collaborative Hub is specifically designed for dynamic teams and growing startups. This 800 square foot space features an open-plan layout that can be configured to meet your team's evolving needs. The space includes dedicated collaboration zones, quiet focus areas, and breakout spaces for informal meetings. With state-of-the-art technology infrastructure and flexible furniture systems, this workspace adapts to your business as it grows.",
      sqft: 800,
      location: "Tech Quarter",
      address: "456 Innovation Drive, Tech Quarter",
      amenities: [
        "Gigabit Fiber Internet",
        "Flexible Collaboration Tools",
        "Modern Kitchen Facilities",
        "Relaxing Lounge Area",
        "High-tech Printing Station",
        "Video Conferencing Setup",
        "Adjustable Desks",
        "Natural Lighting",
        "Bike Storage",
        "Wellness Room"
      ],
      propertyId: "MCH-002",
      monthlyRate: "$1,800",
      availability: "Available from Next Month"
    },
    "3": {
      id: "3",
      name: "Private Office Elite",
      images: [officeSpace3, officeSpace1, officeSpace2],
      description: "Exclusive private office space for discerning professionals. Includes dedicated phone booths, executive meeting room, and concierge services.",
      longDescription: "The Private Office Elite offers an exclusive workspace experience for discerning professionals who demand privacy and luxury. This 600 square foot space is thoughtfully designed with premium materials and finishes throughout. The office features a private entrance, executive-grade furnishings, and access to our exclusive Elite amenities program. Perfect for consultants, financial advisors, and other professionals who require a prestigious business address.",
      sqft: 600,
      location: "Financial District",
      address: "789 Financial Center, Elite Floor",
      amenities: [
        "Dedicated Concierge Service",
        "Private Entrance Access",
        "Soundproof Phone Booths",
        "Premium Catering Service",
        "Enhanced Security System",
        "Executive Lounge Access",
        "Personal Mail Handling",
        "Premium Location",
        "Valet Parking",
        "Business Lounge"
      ],
      propertyId: "POE-003",
      monthlyRate: "$2,200",
      availability: "Available in 2 weeks"
    }
  };

  const property = properties[id as keyof typeof properties];

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Property Not Found</h1>
          <Link to="/">
            <Button variant="professional">Return Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const iconMap = {
    "High-speed": Wifi,
    "Gigabit": Wifi,
    "Parking": Car,
    "Covered": Car,
    "Valet": Car,
    "Kitchen": Coffee,
    "Catering": Coffee,
    "Security": Shield,
    "Enhanced": Shield,
    "24/7": Shield
  };

  const getIcon = (amenity: string) => {
    const key = Object.keys(iconMap).find(k => amenity.includes(k));
    return key ? iconMap[key as keyof typeof iconMap] : Users;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-text-secondary hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              <img 
                src={property.images[0]} 
                alt={`${property.name} - Main view`}
                className="w-full h-64 object-cover rounded-lg col-span-2"
              />
              <img 
                src={property.images[1]} 
                alt={`${property.name} - Secondary view`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <img 
                src={property.images[2]} 
                alt={`${property.name} - Third view`}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>

            {/* Property Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary mb-2 font-effra">
                    {property.name}
                  </h1>
                  <div className="text-text-muted mb-2">
                    Property ID: {property.propertyId}
                  </div>
                  <div className="flex items-center text-text-secondary mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    {property.address}
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {property.availability}
                </Badge>
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium text-text-primary">
                    {property.sqft.toLocaleString()} sq ft
                  </span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {property.monthlyRate}/month
                </div>
              </div>

              <p className="text-text-secondary leading-relaxed mb-6">
                {property.longDescription}
              </p>
            </div>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Amenities & Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.amenities.map((amenity, index) => {
                    const IconComponent = getIcon(amenity);
                    return (
                      <div key={index} className="flex items-center">
                        <IconComponent className="h-4 w-4 mr-3 text-primary" />
                        <span className="text-text-secondary">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {property.monthlyRate}
                  </div>
                  <div className="text-text-muted">per month</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Property ID:</span>
                    <span className="font-medium text-text-primary">{property.propertyId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Size:</span>
                    <span className="font-medium text-text-primary">{property.sqft.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Location:</span>
                    <span className="font-medium text-text-primary">{property.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Availability:</span>
                    <span className="font-medium text-primary">{property.availability}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to={`/booking?property=${property.id}`} className="block">
                    <Button variant="professional" className="w-full">
                      Book This Space
                    </Button>
                  </Link>
                  <Button variant="outline-professional" className="w-full">
                    Schedule Tour
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-accent rounded-lg">
                  <div className="text-sm text-text-secondary text-center">
                    <p className="mb-2">Need help choosing?</p>
                    <div className="flex items-center justify-center space-x-2">
                      <span>Call us:</span>
                      <a href="tel:+15551234567" className="text-primary font-medium hover:underline">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;