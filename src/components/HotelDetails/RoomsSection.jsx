import React from "react";
import { useNavigate } from "react-router-dom";
import theme from "../../utils/theme/theme";
import { Box, Typography, Paper, Grid, Snackbar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const RoomsSection = () => {
  // hooks
  const [loggedIn, setLoggedIn] = useState(false);
  const [images, setImages] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [totalRooms, setTotalRooms] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const hotelId = params.get("q");
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const rooms = params.get("rooms");

  useEffect(() => {
    checkLoginStatus();
    fetchData();
  }, []);

  // handlers
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleBookNowButtonClick = async (roomId, index, event) => {
    event.stopPropagation();
    try {
      if (loggedIn) {
        const query = `?hid=${encodeURIComponent(
          hotelId
        )}&rid=${encodeURIComponent(roomId)}&rii=${encodeURIComponent(
          index
        )}&checkin=${encodeURIComponent(checkIn)}&checkout=${encodeURIComponent(
          checkOut
        )}&rooms=${encodeURIComponent(rooms)}`;
        navigate(`/booking-details${query}`);
      } else {
        setSnackbarOpen(true);
        console.log("User is not logged in.");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // supportive methods
  const calculateTotalRooms = (roomsArray) => {
    let totalRooms = 0;
    for (const room of roomsArray) {
      totalRooms += room.roomCount;
    }
    return totalRooms;
  };
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
        if (responseData.success) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  const fetchData = async () => {
    try {
      const url = `http://localhost:3200/hotels/${hotelId}`;
      const response = await axios.get(url);
      const data = response.data;
      if (data) {
        setImages(data.images.slice(1, 8));
        const totalRooms = calculateTotalRooms(data.rooms);
        setRoomTypes(data.rooms);
        setTotalRooms(totalRooms ? totalRooms : "");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const minImageLength = Math.min(images.length, roomTypes.length);

  return (
    <div style={{ width: "90%" }}>
      <Box sx={{ margin: "11vh auto 2vh auto" }}>
        <Typography variant="A">Available Rooms ({totalRooms})</Typography>{" "}
        <br />
        <div
          style={{
            height: "auto",
            padding: "20px 0px",
          }}>
          {images.slice(0, minImageLength).map((image, index) => (
            <Grid container xs={12} direction="row">
              <Grid item xs={8} sx={{ margin: "10px auto" }}>
                <Paper
                  style={{
                    display: "flex",
                    boxShadow: "none",
                  }}>
                  <img
                    src={image}
                    alt={`Room ${index + 1}`}
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ flex: 1, padding: "0 16px" }}>
                    <Typography variant="B">
                      {roomTypes[index]?.roomType} -{" "}
                      {roomTypes[index]?.roomSpecification} (
                      {roomTypes[index]?.roomCount})
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={4} sx={{ margin: "10px auto" }}>
                <Paper
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    boxShadow: "none",
                  }}>
                  <Typography variant="C">
                    {roomTypes[index]?.roomRate}
                  </Typography>
                  <Typography variant="D">/night</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      width: "150px",
                      height: "48px",
                      backgroundColor: theme.palette.primary.main,
                    }}
                    onClick={(event) =>
                      handleBookNowButtonClick(
                        roomTypes[index]?._id,
                        index,
                        event
                      )
                    }>
                    <Typography variant="E" style={{ color: "white" }}>
                      Book now
                    </Typography>
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          ))}
        </div>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="You need to be logged in to book a room."
      />
    </div>
  );
};
export default RoomsSection;
