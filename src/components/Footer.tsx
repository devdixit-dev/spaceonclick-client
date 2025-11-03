import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-primary font-effra mb-4">spaceonclick</h3>
            <p className="text-text-secondary leading-relaxed">
              Premium office spaces designed for modern businesses.

            </p>
            <p className="text-text-secondary leading-relaxed">
              Find your perfect workspace today.
            </p>
            <div className="flex items-center mt-4">
              <Phone className="h-4 w-4 mr-3 text-primary" />
              <span className="text-text-secondary">+91 12345 67890</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4 flex justify-center text-center">Navigation</h4>
            <div className="flex justify-center gap-4 text-center">
              <Link to="/" className="block text-text-secondary hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-text-secondary hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/booking" className="block text-text-secondary hover:text-primary transition-colors">
                Book Now
              </Link>
              {/* <Link to="/contact" className="block text-text-secondary hover:text-primary transition-colors">
                Contact
              </Link> */}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-end">
          <p className="text-text-muted text-sm mb-2 sm:mb-0">
            © 2025 spaceonclick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;