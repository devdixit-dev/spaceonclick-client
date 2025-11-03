import { useEffect, useState } from "react";
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
import image1 from '@/assets/9/1.jpeg';
import image2 from '@/assets/12/1.jpeg';
import image3 from '@/assets/12/4.jpeg';
import axios from "axios";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedOffice, setSelectedOffice] = useState(searchParams.get("property") || "");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [offices, setOffices] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    additionalDetails: ""
  });

  const images = [image1, image2, image3]

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  useEffect(() => {
    const fetchOffices = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}`, {});
      console.log(await response.data.data);
      setOffices(await response.data.data);
    }
    fetchOffices();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Validation
    if (!selectedOffice) {
      toast({
        title: "Missing Information",
        description: "Please select an office space",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both a date and time for your visit.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Step 2: Find office details
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const office = offices.find((o: any) => o._id === selectedOffice);
    if (!office) {
      toast({
        title: "Error",
        description: "Invalid office selection.",
        variant: "destructive",
      });
      return;
    }

    // Step 3: Prepare payload for backend
    const bookingPayload = {
      propertyName: office.propertyName,
      date: selectedDate.toLocaleDateString(),
      time: selectedTime,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      contactNumber: formData.phone,
      companyName: formData.company,
      details: formData.additionalDetails,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/booking`,
        bookingPayload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast({
          title: "Booking Confirmed",
          description: res.data.message,
        });

        // Optional: Save locally and navigate
        localStorage.setItem("bookingData", JSON.stringify(res.data.data));
        navigate("/booking/thank-you");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.response?.data?.message || "Something went wrong!";
      toast({
        title: "Booking Failed",
        description: message,
        variant: "destructive",
      });
    }
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
                      key={office._id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedOffice === office._id
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary/50"
                        }`}
                      onClick={() => setSelectedOffice(office._id)}
                    >
                      <img
                        src={office.images[0]}
                        alt={office.propertyName}
                        className="w-full h-32 object-cover rounded-md mb-3"
                      />
                      <h3 className="font-semibold text-text-primary mb-1">{office.propertyName}</h3>
                      {/* <p className="text-sm text-text-muted mb-2">ID: {office.propertyID}</p> */}
                      <div className="flex items-center text-sm text-text-secondary mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        {office.location}
                      </div>
                      <div className="flex items-center text-sm text-text-secondary mb-2">
                        <Users className="h-3 w-3 mr-1" />
                        {office.propertyID === 'PGR-005' ? `${office.seatingCapacity} Beds` : `${office.area} sq ft`}
                      </div>
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

            {/* Date and Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">2</span>
                  Schedule Your Visit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block" htmlFor="selectedDate">Select Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-12",
                            !selectedDate && "text-muted-foreground"
                          )}
                          id="selectedDate"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            if (date) {
                              const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                              setSelectedDate(localDate);
                            }
                          }}
                          // disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0); // reset to midnight
                            return date < today || date < new Date("1900-01-01");
                          }}

                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />

                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block" htmlFor="selectedTime">Select Time *</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger className="h-12" id="selectedTime">
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
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">3</span>
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
                      autoComplete="false"
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
                      autoComplete="false"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    autoComplete="false"
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