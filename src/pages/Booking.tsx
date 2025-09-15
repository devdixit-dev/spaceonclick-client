import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, MapPin, Users, CalendarIcon, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Import office images
import officeSpace1 from "@/assets/office-space-1.jpg";
import officeSpace2 from "@/assets/office-space-2.jpg";
import officeSpace3 from "@/assets/office-space-3.jpg";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOffice, setSelectedOffice] = useState(searchParams.get("property") || "");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    additionalDetails: ""
  });

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const offices = [
    {
      id: "1",
      name: "Executive Suite Premium",
      image: officeSpace1,
      propertyId: "ES-001",
      sqft: 1200,
      location: "Downtown Business District",
      monthlyRate: "$2,500"
    },
    {
      id: "2", 
      name: "Modern Collaborative Hub",
      image: officeSpace2,
      propertyId: "MCH-002",
      sqft: 800,
      location: "Tech Quarter",
      monthlyRate: "$1,800"
    },
    {
      id: "3",
      name: "Private Office Elite",
      image: officeSpace3,
      propertyId: "POE-003",
      sqft: 600,
      location: "Financial District",
      monthlyRate: "$2,200"
    }
  ];

  const plans = [
    { id: "monthly", name: "Monthly", description: "Flexible month-to-month rental" },
    { id: "quarterly", name: "Quarterly", description: "3-month commitment with 5% discount" },
    { id: "annual", name: "Annual", description: "12-month commitment with 15% discount" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOffice || !selectedPlan) {
      toast({
        title: "Missing Information",
        description: "Please select both an office space and rental plan.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both a date and time for your visit.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information", 
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Store booking data and navigate to thank you page
    const bookingData = {
      office: offices.find(o => o.id === selectedOffice),
      plan: plans.find(p => p.id === selectedPlan),
      visitDate: selectedDate,
      visitTime: selectedTime,
      customer: formData,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    navigate("/booking/thank-you");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-4 font-effra">
              Book Your Office Space
            </h1>
            <p className="text-text-secondary">
              Choose your preferred office space and rental plan to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Office Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">1</span>
                  Choose Your Office Space
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {offices.map((office) => (
                    <div
                      key={office.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedOffice === office.id 
                          ? "border-primary bg-accent" 
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedOffice(office.id)}
                    >
                      <img 
                        src={office.image} 
                        alt={office.name}
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <h3 className="font-semibold text-text-primary mb-1">{office.name}</h3>
                      <p className="text-sm text-text-muted mb-2">ID: {office.propertyId}</p>
                      <div className="flex items-center text-sm text-text-secondary mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        {office.location}
                      </div>
                      <div className="flex items-center text-sm text-text-secondary mb-2">
                        <Users className="h-3 w-3 mr-1" />
                        {office.sqft.toLocaleString()} sq ft
                      </div>
                      <div className="text-primary font-semibold">{office.monthlyRate}/month</div>
                      {selectedOffice === office.id && (
                        <div className="mt-2 flex items-center text-primary">
                          <Check className="h-4 w-4 mr-1" />
                          Selected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Plan Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">2</span>
                  Choose Your Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPlan === plan.id 
                          ? "border-primary bg-accent" 
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <h3 className="font-semibold text-text-primary mb-2">{plan.name}</h3>
                      <p className="text-sm text-text-secondary mb-3">{plan.description}</p>
                      {selectedPlan === plan.id && (
                        <div className="flex items-center text-primary">
                          <Check className="h-4 w-4 mr-1" />
                          Selected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Date and Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">3</span>
                  Schedule Your Visit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Select Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-12",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Select Time *</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger className="h-12">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="Choose a time slot" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">4</span>
                  Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="additionalDetails">Additional Details</Label>
                  <Textarea
                    id="additionalDetails"
                    value={formData.additionalDetails}
                    onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
                    placeholder="Tell us about your specific requirements, move-in date, or any questions you have..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button type="submit" variant="professional" size="lg" className="px-12">
                Continue Booking
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;