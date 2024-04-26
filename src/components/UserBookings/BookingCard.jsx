import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BookingCard({ booking, fetchBookingsOfUser }) {
  const navigate = useNavigate();
  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWRodW1pdGhhQGFiYy5jb20iLCJpYXQiOjE3MTQxMzEwNzIsImV4cCI6MTcxNDIxNzQ3Mn0.DoMst2eFvZs_Z_RKOMAbphAF39Attc3AHNEOv8JZHXQ";

  // handlers
  const handleDeleteButtonClick = async (bookingId) => {
    try {
      const apiUrl = `http://localhost:8081/api/v1/payment/deleteMyBooking?_bookingId=${bookingId}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("booking deleted");
        fetchBookingsOfUser();
      } else {
        console.log("booking not found");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const handlePayNowButtonClick = async () => {
    try {
      if (booking.id != "") {
        const response = await fetch(
          `http://localhost:8081/api/v1/payment/pay/${booking._bookingId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const responseBody = await response.json();
        if (typeof responseBody == "object") {
          fetchBookingsOfUser();
        } else {
          alert("no booking found");
        }
      }
    } catch (error) {
      alert("no booking found");
      console.log(error);
    }
  };
  const handleViewBookingButtonClick = () => {
    console.log("view booking called");
    const query = `?hid=${encodeURIComponent(
      booking._hotelId
    )}&rid=${encodeURIComponent(booking._roomdId)}&rii=${encodeURIComponent(
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
          <span style={{ fontWeight: "bold" }}> Rs. {booking.totalAmount}</span>
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
          onClick={
            booking.paymentStatus
              ? handleViewBookingButtonClick
              : handlePayNowButtonClick
          }>
          {booking.paymentStatus ? "View booking" : "Pay Now"}
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            handleDeleteButtonClick(booking._bookingId);
          }}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
export default BookingCard;
