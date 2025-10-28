import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Phone, Mail, ArrowLeft } from "lucide-react";

const ThankYou = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data) {
      setBookingData(JSON.parse(data));
      localStorage.clear();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-text-primary mb-4 font-effra">
              Thank You for Your Booking Request!
            </h1>
            <p className="text-xl text-text-secondary">
              We've received your office space booking request and will respond as soon as possible.
            </p>
          </div>

          {bookingData && (
            <Card className="mb-8 text-left">
              <CardContent className="p-6">
                <h3 className="font-semibold text-text-primary mb-4">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  {/* <div>
                    <span className="font-medium">Office Space:</span> {bookingData.office?.name}
                  </div> */}
                  {/* <div>
                    <span className="font-medium">Property ID:</span> {bookingData.propertyID}
                  </div> */}
                  {/* <div>
                    <span className="font-medium">Plan:</span> {bookingData.plan?.name}
                  </div> */}
                  <div>
                    <span className="font-medium">Contact Person:</span> {bookingData.firstName} {bookingData.lastName}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span> {bookingData.email}
                  </div>
                  <div>
                    <span className="font-medium">Date:</span> {bookingData.date}
                  </div>
                  <div>
                    <span className="font-medium">Time:</span> {bookingData.time}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="bg-accent rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              What happens next?
            </h2>
            <div className="text-text-secondary space-y-2">
              <p>• Our team will review your requirements within 24 hours</p>
              <p>• We'll contact you to discuss details and schedule a viewing</p>
              <p>• You'll receive a customized proposal based on your needs</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Need immediate assistance?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span className="text-text-secondary">+91 12345 67890</span>
              </div>
              <div className="flex items-center justify-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span className="text-text-secondary">hello@spaceonclick.com</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="professional">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Button variant="outline-professional" asChild>
              <a href="mailto:hello@spaceonclick.com">
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ThankYou;