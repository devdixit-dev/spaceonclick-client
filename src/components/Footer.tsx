import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-primary font-effra mb-4">Space On Click</h3>
            <p className="text-text-secondary leading-relaxed">
              Premium office spaces designed for modern businesses. Find your perfect workspace today.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Navigation</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-text-secondary hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-text-secondary hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/booking" className="block text-text-secondary hover:text-primary transition-colors">
                Book Now
              </Link>
              <Link to="/contact" className="block text-text-secondary hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-primary" />
                <span className="text-text-secondary">+91 12345 67890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-primary" />
                <span className="text-text-secondary">info@spaceonclick.com</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Address</h4>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-3 text-primary mt-1" />
              <address className="text-text-secondary not-italic">
                26, Haribhakti Society<br />
                5, Samarpan Society, Race Course Rd<br />
                Vadodara, GJ 390007
              </address>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-text-muted text-sm mb-2 sm:mb-0">
            © 2025 Space On Click. All rights reserved. | Premium office spaces for modern businesses.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;