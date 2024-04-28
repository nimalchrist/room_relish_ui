import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Confetti from "react-confetti";
import {
  Box,
  CardMedia,
  CircularProgress,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tick from "../../assets/icons/Booking-icons/tick.png";

function BookingCard({ booking, fetchBookingsOfUser }) {
  // hooks
  const navigate = useNavigate();
  const [deleteBookingLoading, setDeleteBookingLoading] = useState(false);
  const [payNowLoading, setPayNowLoading] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [sncakBarMessage, setSnackBarMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWRodW1pdGhhQGFiYy5jb20iLCJpYXQiOjE3MTQxOTc1OTUsImV4cCI6MTcxNDI4Mzk5NX0.jtWl83lss78k8aZ7j2qx7y4RlQ5j1W9OC73v4lSZHlg";

  // handlers
  const handleDeleteButtonClick = async (bookingId) => {
    try {
      setDeleteBookingLoading(true);
      const apiUrl = `http://localhost:8081/api/v1/payment/deleteMyBooking?_bookingId=${bookingId}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          // Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        fetchBookingsOfUser();
        setDeleteBookingLoading(false);
      } else {
        setSnackBarOpen(true);
        setSnackBarMessage("booking not found");
        setDeleteBookingLoading(false);
      }
    } catch (error) {
      console.log("error: ", error);
      setSnackBarOpen(true);
      setSnackBarMessage("Try again later...");
      setDeleteBookingLoading(false);
    }
  };
  const handlePayNowButtonClick = async () => {
    try {
      setPayNowLoading(true);
      if (booking.id != "") {
        const response = await fetch(
          `http://localhost:8081/api/v1/payment/pay?_bookingId=${booking._bookingId}`,
          {
            method: "POST",
            headers: {
              // Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const responseBody = await response.json();
        if (typeof responseBody == "object") {
          fetchBookingsOfUser();
          setPayNowLoading(false);
          setShowPaymentPopup(true);
          setShowConfetti(true);
          setTimeout(() => {
            setShowPaymentPopup(false);
            setShowConfetti(false);
          }, 6000);
        } else {
          setPayNowLoading(false);
          setSnackBarOpen(true);
          setSnackBarMessage("booking not found");
        }
      }
      setPayNowLoading(false);
    } catch (error) {
      setPayNowLoading(false);
      setSnackBarOpen(true);
      setSnackBarMessage("Something wrong...Try again later");
    }
  };
  const handleViewBookingButtonClick = () => {
    const query = `?hid=${encodeURIComponent(
      booking._hotelId
    )}&rid=${encodeURIComponent(booking._roomId)}&rii=${encodeURIComponent(
      1
    )}&rupees=${encodeURIComponent(
      booking.totalAmount
    )}&ckeckIn=${formatQueryDate(
      booking.checkInDate
    )}&checkOut=${formatQueryDate(
      booking.checkOutDate
    )}&roomamt=${encodeURIComponent(
      booking.totalAmount
    )}&rooms=${encodeURIComponent(booking.numOfRooms)}`;
    navigate(`/view-booking${query}`);
  };
  const handleSnackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // supportive method
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }
  function formatQueryDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }
  return (
    <>
      <Card sx={{ flexBasis: "30%", margin: "20px auto" }}>
        <CardMedia
          component="img"
          alt="booking image"
          width="100%"
          height="140"
          style={{ objectFit: "cover" }}
          image={booking.hotelImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Hotel Name:{" "}
            <span style={{ fontWeight: "bold" }}>{booking.hotelName}</span>
          </Typography>
          <Typography variant="body2" color="text.primary">
            Number of rooms:
            <span style={{ fontWeight: "bold" }}>{booking.numOfRooms}</span>
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.primary">
              Fr:{" "}
              <span style={{ fontWeight: "bold" }}>
                {formatDate(booking.checkInDate)}
              </span>
            </Typography>
            <Typography variant="body2" color="text.primary">
              Till:{" "}
              <span style={{ fontWeight: "bold" }}>
                {formatDate(booking.checkOutDate)}
              </span>
            </Typography>
          </Box>

          <Typography variant="body2" color="text.primary">
            Amount:
            <span style={{ fontWeight: "bold" }}>
              {" "}
              Rs. {booking.totalAmount}
            </span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              margin: "20px 0",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Typography>Payment Status:</Typography>
            <Button
              variant="contained"
              size="small"
              disableElevation
              color={booking.paymentStatus ? "success" : "error"}>
              {booking.paymentStatus ? "Paid" : "Not Paid"}
            </Button>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            disabled={payNowLoading}
            onClick={
              booking.paymentStatus
                ? handleViewBookingButtonClick
                : handlePayNowButtonClick
            }>
            {booking.paymentStatus ? (
              "View booking"
            ) : payNowLoading ? (
              <>
                Pay Now <CircularProgress size={16} />
              </>
            ) : (
              "Pay Now"
            )}
          </Button>
          <Button
            size="small"
            variant="outlined"
            disabled={deleteBookingLoading}
            onClick={() => {
              handleDeleteButtonClick(booking._bookingId);
            }}>
            {deleteBookingLoading ? (
              <>
                Delete <CircularProgress size={16} />
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </CardActions>
      </Card>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="error">
          {sncakBarMessage}
        </MuiAlert>
      </Snackbar>
      {showPaymentPopup && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "100px",
            backgroundColor: "rgba(141, 211, 187, 0.5)",
            borderRadius: "10px",
            color: "black",
            textAlign: "center",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          {showConfetti && (
            <Confetti
              width={Box.width}
              height={Box.innerHeight}
              recycle={false}
              numberOfPieces={1000}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
              onComplete={() => setShowConfetti(false)}
            />
          )}
          <Box
            sx={{
              width: "40px",
              height: "40px",
              overflow: "hidden",
              flexShrink: 0,
              marginRight: 5,
              marginLeft: 4,
              marginBottom: 2,
            }}>
            <img
              src={tick}
              alt="tick img"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Typography variant="h4" sx={{ opacity: 1 }}>
            <strong>Payment Successful</strong>
          </Typography>
        </Box>
      )}
    </>
  );
}
export default BookingCard;
