import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Phone, Menu, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from '@/assets/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Book Now", href: "/booking" },
  ];

  return (
    <nav className="py-4 bg-background border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="" className="w-32 h-32 rounded-lg" />
            {/* <span className="text-2xl font-bold text-primary font-effra">Space On Click</span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-text-secondary hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact Info & Language */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-text-secondary">
              <Phone className="h-4 w-4" />
              <span className="font-medium">+91 12345 67890</span>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-lg font-medium text-text-secondary hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-text-secondary mb-4">
                    <Phone className="h-4 w-4" />
                    <span className="font-medium">+1 (555) 123-4567</span>
                  </div>
                  
                  <Button variant="professional" className="w-full">
                    Contact Us
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;