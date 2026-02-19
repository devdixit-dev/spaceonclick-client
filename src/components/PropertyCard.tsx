import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  propertyID: string;
  propertyName: string;
  images: string[];
  isAvailable: boolean;
  description: string;
  area: number;
  seatingCapacity: number
  location: string;
  amenities: string[];
}

const PropertyCard = ({
  propertyID,
  propertyName,
  images,
  isAvailable,
  description,
  area,
  seatingCapacity,
  location,
  amenities,
}: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <Card className="overflow-hidden shadow-medium hover:shadow-large transition-all duration-300 group">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Images - Slider */}
        <div className="relative h-64 md:h-full min-h-[300px] bg-gray-200 group">
          {images && images.length > 0 ? (
            <>
              <img
                src={images[currentImageIndex]}
                alt={`${propertyName} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-800" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-800" />
                  </button>
                </>
              )}

              {/* Dot Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => goToImage(index, e)}
                      className={`transition-all ${index === currentImageIndex
                          ? "bg-white w-8 h-2"
                          : "bg-white/60 hover:bg-white/80 w-2 h-2"
                        } rounded-full`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Image Counter */}
              <div className="absolute top-3 right-3 bg-black/60 text-white px-2.5 py-1 rounded-full text-xs font-medium">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No images available
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <CardContent className="p-6 flex-1">
            <div className="mb-4">
              <div className="w-full flex justify-between">
                <h3 className="text-xl font-bold text-text-primary mb-2 font-effra">
                  {propertyName}
                </h3>
                <p className="flex justify-center items-center w-18 h-5 text-gray-500 text-sm">
                  <p className={`h-1 w-1 ${isAvailable ? 'bg-green-500' : 'bg-red-500'} mr-2 rounded-full animate-ping`}></p>
                  {isAvailable ? "Available" : "Unavailable"}
                </p>
              </div>
              <div className="text-sm text-text-muted mb-1">
                Property ID: {propertyID}
              </div>
              <div className="flex items-center text-text-secondary mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{location}</span>
              </div>
            </div>

            <p className="text-text-secondary mb-4 leading-relaxed">
              {description}
            </p>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Users className="h-4 w-4 mr-2 text-primary" />
                <span className="font-medium text-text-primary">
                  {propertyID === 'PGR-005' ? `${seatingCapacity} Beds Available` : `${area} sq ft`}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md font-medium"
                >
                  {amenity}
                </span>
              ))}
              {amenities.length > 3 && (
                <span className="text-xs text-text-muted">
                  +{amenities.length - 3} more
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
            <Link to={`/property/${propertyID}`} className="flex-1">
              <Button variant="outline-professional" className="w-full">
                More Info
              </Button>
            </Link>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;