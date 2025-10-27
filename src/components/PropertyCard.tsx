import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Users, Wifi, Car } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  propertyID: string;
  propertyName: string;
  images: string[];
  description: string;
  size: number;
  location: string;
  amenities: string[];
}

import office1 from '@/assets/9/1.jpeg'
import office2 from '@/assets/9/4.jpeg'
import office3 from '@/assets/9/3.jpeg'

const PropertyCard = ({ 
  propertyID, 
  propertyName, 
  images,
  description, 
  size, 
  location, 
  amenities,
}: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden shadow-medium hover:shadow-large transition-all duration-300 group">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Images */}
        <div className="relative h-64 md:h-full min-h-[300px]">
          <div className="grid grid-cols-2 gap-1 h-full">
            <img 
              src={office1} 
              alt={`${propertyName} - Main view`}
              className="w-full h-full object-cover rounded-tl-lg"
            />
            <div className="grid grid-rows-2 gap-1">
              <img 
                src={office2} 
                alt={`${propertyName} - Secondary view`}
                className="w-full h-full object-cover rounded-tr-lg"
              />
              <img 
                src={office3}
                alt={`${propertyName} - Third view`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <CardContent className="p-6 flex-1">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-text-primary mb-2 font-effra">
                {propertyName}
              </h3>
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
                  {size} sq ft
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
            {/* <Link to={`/booking?property=${id}`} className="flex-1">
              <Button variant="professional" className="w-full">
                Book Now
              </Button>
            </Link> */}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;