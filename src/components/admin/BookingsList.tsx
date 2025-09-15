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
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react";

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
  status: 'confirmed' | 'pending' | 'cancelled';
  additionalDetails?: string;
  createdAt: string;
}

const BookingsList = ({ bookings }: { bookings: Booking[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          All Bookings & Property Schedules
        </CardTitle>
      </CardHeader>
      <CardContent>
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Visit Date & Time</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">{booking.customerName}</span>
                        </div>
                        {booking.company && (
                          <p className="text-sm text-muted-foreground">{booking.company}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{booking.propertyName}</p>
                          <p className="text-sm text-muted-foreground">ID: {booking.propertyId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{new Date(booking.visitDate).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">{booking.visitTime}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{booking.planType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(booking.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-sm">{booking.customerEmail}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-sm">{booking.customerPhone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        {booking.status === 'pending' && (
                          <Button variant="default" size="sm">
                            Confirm
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-text-secondary">No bookings yet</p>
            <p className="text-sm text-muted-foreground">Bookings will appear here when customers submit the booking form.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingsList;