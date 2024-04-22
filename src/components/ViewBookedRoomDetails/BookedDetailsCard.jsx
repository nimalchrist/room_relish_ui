//import React from 'react';
import { Box, Typography, Avatar, Grid } from "@mui/material";
import Building from "../../assets/icons/Payment-icons/building.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import theme from "../../utils/theme/theme";

const BookedDetailsCard = () => {
  // hooks
  const [type, setRoomType] = useState("");
  const [image, setImage] = useState("");
  const qparams = new URLSearchParams(window.location.search);
  const checkIn = qparams.get("ckeckIn");
  const checkOut = qparams.get("checkOut");
  const rooms = qparams.get("rooms");
  const [userName, setUserName] = useState("");

  // supportive methods
  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  const getUserData = async () => {
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
          if (responseData.info) {
            setUserName(responseData.info.userName);
          } else {
            setUserName("not supposed to see");
          }
        }
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  const fetchBookingDetails = async () => {
    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get("hid");
    const roomId = params.get("rid");
    const index = params.get("rii");

    try {
      const response = await axios.get(
        `http://localhost:3200/hotels/${hotelId}`
      );
      const data = response.data;
      setImage(data.images[0]);
      setRoomType(data.rooms[index].roomType);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  useEffect(() => {
    getUserData();
    fetchBookingDetails();
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
      <Box
        style={{
          display: "flex",
          flexBasis: "17%",
          height: "auto",
          padding: "1.5rem",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          alignSelf: "stretch",
          backgroundColor: theme.palette.primary.main,
          borderStartStartRadius: "16px",
          borderEndStartRadius: "16px",
        }}>
        <Grid item>
          <Typography variant="h6" style={{ color: "white" }}>
            <b>{formatDate(checkIn)}</b>
          </Typography>
          <Typography variant="caption" style={{ color: "white" }}>
            Check-in
          </Typography>
        </Grid>

        <Grid item>
          <img src={Building} />
        </Grid>

        <Grid item>
          <Typography variant="h6" style={{ color: "white" }}>
            <b>{formatDate(checkOut)}</b>
          </Typography>
          <Typography variant="caption" style={{ color: "white" }}>
            Check-out
          </Typography>
        </Grid>
      </Box>
      <Box
        style={{
          flexBasis: "45%",
          marginBottom: 16,
          flexDirection: "column",
          borderEndEndRadius: "16px",
        }}>
        <Grid
          container
          flexBasis="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          style={{
            padding: "1rem",
            backgroundColor: theme.palette.primary.main,
            borderStartEndRadius: "16px",
          }}>
          <Grid item>
            <Typography
              variant="body1"
              style={{ margin: "10px auto", color: "white" }}>
              <b>{userName}</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              style={{ margin: "10px auto", color: "white" }}>
              <b>{type}</b>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "30px auto",
          }}>
          <Grid item style={{ marginRight: "3rem" }}>
            <Typography variant="caption">Number of Rooms</Typography>
            <Typography variant="body2">
              <b>{rooms}</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Room no</Typography>
            <Typography variant="body2">
              <b>Onarrival</b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{
          width: "23rem",
          height: "16.3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
        }}>
        <img
          style={{ width: "23rem", height: "16.3rem", borderRadius: "16px" }}
          src={image}
          alt="hotel image"
        />
      </Box>
    </Box>
  );
};

export default BookedDetailsCard;
