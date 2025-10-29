import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Mail,
  Phone,
  Building,
  Clock,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  company?: string;
  propertyName: string;
  propertyId: string;
  bookingDate: string;
  bookingTime: string;
  visitDate: string;
  visitTime: string;
  planType: string;
  status: "confirmed" | "pending" | "cancelled";
  additionalDetails?: string;
  createdAt: string;
}

const BookingsList = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Utility: safely capitalize
  const formatStatus = (status?: string) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/bookings`, { withCredentials: true });
      setBookings(res.data.bookings)
    }
    fetchBookings();
  }, []);

  return (
    <Card className="shadow-sm border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Calendar className="h-5 w-5 text-primary" />
          All Bookings & Property Schedules
        </CardTitle>
      </CardHeader>

      <CardContent>
        {bookings.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Visit Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.propertyId} className="hover:bg-muted/30 transition-colors">
                    {/* Customer */}
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">{booking.firstName +" "+ booking.lastName}</span>
                        </div>
                        {booking.companyName && (
                          <p className="text-sm text-muted-foreground">{booking.companyName}</p>
                        )}
                      </div>
                    </TableCell>

                    {/* Property */}
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{booking.propertyID.propertyName}</p>
                          {/* <p className="text-xs text-muted-foreground">ID: {booking.propertyId}</p> */}
                        </div>
                      </div>
                    </TableCell>

                    {/* Visit Info */}
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            {new Date(booking.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-muted-foreground">{booking.time}</p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant={getStatusColor(booking.status)}
                        className="flex items-center gap-1 w-fit capitalize"
                      >
                        {getStatusIcon(booking.status)}
                        {formatStatus(booking.status)}
                      </Badge>
                    </TableCell>

                    {/* Contact */}
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-sm">{booking.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-sm">+91{" " + booking.contactNumber}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      {booking.status === "pending" ? (
                        <Button variant="default" size="sm" className="h-8">
                          Confirm
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-10">
            <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground font-medium">No bookings yet</p>
            <p className="text-sm text-muted-foreground/80">
              Bookings will appear here when customers submit the booking form.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingsList;
