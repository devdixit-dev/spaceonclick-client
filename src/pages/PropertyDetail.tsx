import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Wifi, Car, Coffee, Shield, ArrowLeft, Dot, ChevronLeft, ChevronRight } from "lucide-react";

import { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";

const PropertyDetail = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fetchedproperty, setFetchedProperty] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/property/${id}`);
      setFetchedProperty(response.data.property);
    }

    if (id) fetchData();
  }, [id]);

  const nextImage = () => {
    if (fetchedproperty?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % fetchedproperty.images.length);
    }
  };

  const prevImage = () => {
    if (fetchedproperty?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + fetchedproperty.images.length) % fetchedproperty.images.length);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!fetchedproperty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading property details...
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
            {/* Image Gallery - Slider */}
            <div className="relative mb-8 group">
              <div className="relative h-98 bg-gray-200 rounded-lg overflow-hidden">
                {fetchedproperty.images && fetchedproperty.images.length > 0 ? (
                  <>
                    <img
                      src={fetchedproperty.images[currentImageIndex]}
                      alt={`${fetchedproperty.propertyName} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation Arrows */}
                    {fetchedproperty.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-6 h-6 text-gray-800" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-6 h-6 text-gray-800" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                      {currentImageIndex + 1} / {fetchedproperty.images.length}
                    </div>

                    {/* Thumbnail Navigation
                    {fetchedproperty.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 p-2 rounded-lg backdrop-blur-sm">
                        {fetchedproperty.images.map((img: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                              index === currentImageIndex
                                ? "border-white scale-110"
                                : "border-white/40 hover:border-white/70"
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )} */}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No images available
                  </div>
                )}
              </div>
            </div>

            {/* Property Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary mb-2 font-effra">
                    {fetchedproperty.propertyName}
                  </h1>
                  <div className="flex items-center text-text-secondary mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    {fetchedproperty.location}
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {fetchedproperty.isAvailable}
                </Badge>
              </div>
              <p className="text-text-secondary leading-relaxed mb-6">
                {fetchedproperty.description}
              </p>
            </div>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Amenities & Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {fetchedproperty.amenities.map((amenity, index) => {
                    const IconComponent = getIcon(amenity);
                    return (
                      <div key={index} className="flex items-center">
                        <Dot className="h-4 w-4 mr-3 text-primary" />
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
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Property ID:</span>
                    <span className="font-medium text-text-primary">{fetchedproperty.propertyID}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Size:</span>
                    <span className="font-medium text-text-primary">{fetchedproperty.area.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">{fetchedproperty.propertyID === 'PGR-005' ? "Total Capacity:" : "Seating Capacity:"}</span>
                    <span className="font-medium text-text-primary">{fetchedproperty.seatingCapacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Location:</span>
                    <span className="font-medium text-text-primary">{fetchedproperty.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Availability:</span>
                    <span className="font-medium text-primary">{fetchedproperty.isAvailable ? "Available now" : "Not available"}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to={`/booking?property=${fetchedproperty.propertyID}`} className="block">
                    <Button variant="professional" className="w-full">
                      Book This Space
                    </Button>
                  </Link>
                  {/* <Button variant="outline-professional" className="w-full">
                    Schedule Tour
                  </Button> */}
                </div>

                <div className="mt-6 p-4 bg-accent rounded-lg">
                  <div className="text-sm text-text-secondary text-center">
                    <p className="mb-2">Need help choosing?</p>
                    <div className="flex items-center justify-center space-x-2">
                      <span>Call us:</span>
                      <a href="tel:+919979876366" className="text-primary font-medium hover:underline">
                        +91 99798 76366
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