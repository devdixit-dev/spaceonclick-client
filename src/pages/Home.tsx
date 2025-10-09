import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Users, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import axios from 'axios';

// Import office images
import officeSpace1 from "@/assets/office-space-1.jpg";
import officeSpace2 from "@/assets/office-space-2.jpg";
import officeSpace3 from "@/assets/office-space-3.jpg";
import { useEffect, useState } from "react";

const Home = () => {
  const [property, setProperty] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchProperties = async () => {
        const { data } = (await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`, {})).data;
        setProperty(data);
      }
      await fetchProperties();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (property.length > 0) {
      console.log("Fetched properties:", property);
    }
  }, [property]);

  const properties = [
    {
      id: "1",
      name: "Executive Suite Premium",
      images: [officeSpace1, officeSpace2, officeSpace3],
      description: "A sophisticated executive office space perfect for established businesses. Features premium furnishings, private meeting areas, and stunning city views.",
      sqft: 1200,
      location: "Downtown Business District",
      amenities: ["High-speed WiFi", "Meeting Rooms", "Reception Area", "Parking", "24/7 Access"],
      propertyId: "ES-001"
    },
    {
      id: "2",
      name: "Modern Collaborative Hub",
      images: [officeSpace2, officeSpace3, officeSpace1],
      description: "Open-plan workspace designed for creative teams and startups. Flexible layout with collaborative zones and state-of-the-art technology infrastructure.",
      sqft: 800,
      location: "Tech Quarter",
      amenities: ["Fiber Internet", "Collaboration Tools", "Kitchen", "Lounge Area", "Printing"],
      propertyId: "MCH-002"
    },
    {
      id: "3",
      name: "Private Office Elite",
      images: [officeSpace3, officeSpace1, officeSpace2],
      description: "Exclusive private office space for discerning professionals. Includes dedicated phone booths, executive meeting room, and concierge services.",
      sqft: 600,
      location: "Financial District",
      amenities: ["Concierge", "Private Entrance", "Phone Booths", "Catering", "Security"],
      propertyId: "POE-003"
    }
  ];

  const features = [
    {
      icon: Building,
      title: "Premium Locations",
      description: "Strategic locations in the heart of business districts with excellent connectivity."
    },
    {
      icon: Users,
      title: "Professional Community",
      description: "Join a network of ambitious professionals and growing businesses."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated support team available around the clock for all your needs."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 font-effra">
            Premium Office Spaces
            <span className="block text-primary">For Modern Business</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover professionally designed office spaces that inspire productivity and success.
            Flexible terms, premium amenities, and prime locations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button variant="professional" size="lg" className="group">
                Book Your Space
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline-professional" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4 font-effra">
              Why Choose Space On Click
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We provide more than just office space - we deliver an ecosystem for business success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4 font-effra">
              Available Office Spaces
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Explore our carefully curated selection of premium office spaces, each designed to meet different business needs.
            </p>
          </div>

          <div className="space-y-8">
            {property.map((property) => (
              <PropertyCard key={property.propertyId} {...property} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;