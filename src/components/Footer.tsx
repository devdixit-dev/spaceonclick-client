import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={logo} alt="" className="w-30 h-32 rounded-lg" />
            <p className="text-text-secondary leading-relaxed">
              Premium office spaces designed for modern businesses.

            </p>
            <p className="text-text-secondary leading-relaxed">
              Find your perfect workspace today.
            </p>
            <div className="flex items-center mt-4">
              <Phone className="h-4 w-4 mr-3 text-primary" />
              <span className="text-text-secondary">+91 99798 76366</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4 flex justify-center text-center">Navigation</h4>
            <div className="flex-row text-center">
              <Link to="/" className="block text-text-secondary hover:text-primary transition-colors mb-2">
                Home
              </Link>
              <Link to="/about" className="block text-text-secondary hover:text-primary transition-colors mb-2">
                About Us
              </Link>
              <Link to="/booking" className="block text-text-secondary hover:text-primary transition-colors mb-8">
                Book Now
              </Link>
              <p className="text-text-secondary">Email: <a href="mailto:spaceonclick@gmail.com" className="hover:text-primary cursor-pointer">spaceonclick@gmail.com</a></p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-2">
            <p className="text-text-muted text-sm sm:mb-0">All systems are working</p>
            <p className="h-2 w-2 bg-green-500 ml-3 rounded-full animate-ping"></p>
          </div>

          <p className="text-text-muted text-sm mb-2 sm:mb-0">
            © 2026 spaceonclick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;