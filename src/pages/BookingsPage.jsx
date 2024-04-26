import { useEffect, useState } from "react";
import BookingCard from "../components/UserBookings/BookingCard";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BookingsPage() {
  const navigate = useNavigate();
  const [bookingList, setBookingList] = useState(null);

  // supportive methods
  const checkLoginStatus = async () => {
    try {
      const response = await fetch(
        "http://localhost:3200/auth/users/user/islogined",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (!responseData.success) {
          navigate("/not_authorised_to_view_this_page");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  const fetchBookingsOfUser = async () => {
    try {
      const userId = localStorage.getItem("clientId");
      const accessToken =
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWRodW1pdGhhQGFiYy5jb20iLCJpYXQiOjE3MTQxMzEwNzIsImV4cCI6MTcxNDIxNzQ3Mn0.DoMst2eFvZs_Z_RKOMAbphAF39Attc3AHNEOv8JZHXQ";
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const apiUrl = `http://localhost:8081/api/v1/payment/myBookings?_userId=${userId}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
      });

      const responseBody = await response.json();
      console.log(responseBody);
      console.log(typeof responseBody);
      setBookingList(responseBody);
    } catch (error) {
      setBookingList([]);
      console.log(error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchBookingsOfUser();
  }, []);

  return (
    <Box sx={{ border: "1px solid black" }}>
      {bookingList == null ? (
        <Box
          sx={{
            width: "90%",
            height: "400px",
            margin: "100px auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <CircularProgress />
        </Box>
      ) : bookingList !== null && bookingList.length !== 0 ? (
        <Box
          sx={{
            width: "90%",
            height: "400px",
            overflowY: "auto",
            margin: "100px auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}>
          {bookingList.map((booking) => (
            <BookingCard
              booking={booking}
              fetchBookingsOfUser={fetchBookingsOfUser}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            width: "90%",
            height: "400px",
            margin: "100px auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Typography variant="h3">No booking history.</Typography>
        </Box>
      )}
    </Box>
  );
}

export default BookingsPage;
