//import React from 'react';
import { Box, Typography, Avatar, Grid } from "@mui/material";
import Building from "../../assets/icons/Payment-icons/building.svg";
import Room from "../../assets/icons/Payment-icons/room.svg";
import { useState, useEffect } from "react";
import axios from "axios";

const BookedDetailsCard = () => {
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [Profilepic, setProfilepic] = useState(
    "https://s3-alpha-sig.figma.com/img/de42/3158/13dc5b2e20dc60002c5ebc10bec549e3?Expires=1691971200&Signature=ZHzAq5Bk5EtbGxurRfqS~zdOjE-gM~MqPhIhiy4~0oZeKBZuXxWQ5wO7oSi~GlRdCULMNOa3~PbJVxvkGF4uWBht40SUWPLZBpZGSdDV-BPFdE-Dm-isnLYdlFQDoRT~3w-ZAlKnAwkI6P93dDJiQhap2ud5nDX5utE5xFfx9Rn03Pub8acxrz7Tvc0kUjTdMzQujBNeSQ6xIMQzfd~bNipy04UMDozckMvKQg4GWJUWWXOYL6WSPubSADq0jvNXSEh5uYDCeXacb0cYslL1LtgbLPScjtJ2Cjyql~0hHZS2YBG4d6fly77Fit~d7k~zouNqX-G4CvfhN4PFkA8h-Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
  );
  const qparams = new URLSearchParams(window.location.search);
  const checkIn = qparams.get("ckeckIn");
  const checkOut = qparams.get("checkOut");
  const rooms = qparams.get("rooms");

  const [userName, setUserName] = useState("");
  const [hasProfilePicture, setHasProfilePicture] = useState(true);

  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const askLoggedInStatus = async () => {
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
            console.log("User is logged in.");
            if (responseData.info) {
              console.log("User data:", responseData.info);
              setProfilepic(responseData.info.profilePicture);
              setUserName(responseData.info.userName);
            } else {
              console.log("No user data available.");
            }
          } else {
            setLoggedIn(false);
            console.log("User is not logged in.");
          }
        } else {
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    };

    askLoggedInStatus();

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
        setHotelId(data._id);
        setImage(data.images[0]);
        setType(data.rooms[index].roomType);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, []);

  const boxStyle = {
    display: "flex",
    width: "100%",
    maxWidth: "76.9375rem",
    maxHeight: "19.3rem",
    alignItems: "center",
    marginTop: "1rem",
  };

  return (
    <Box style={boxStyle}>
      <Box
        style={{
          display: "flex",
          width: "13.4rem",
          height: "16.3rem",
          padding: "1.5rem",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          alignSelf: "stretch",
          backgroundColor: "#EBF6F2",
          borderStartStartRadius: "16px",
          borderEndStartRadius: "16px",
        }}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography variant="h6">
              <b>{formatDate(checkIn)}</b>
            </Typography>
            <Typography variant="caption">Check-in</Typography>
          </Grid>

          <Grid item>
            <img src={Building} />
          </Grid>

          <Grid item>
            <Typography variant="h6">
              <b>{formatDate(checkOut)}</b>
            </Typography>
            <Typography variant="caption">Check-out</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box
        style={{
          width: "38.1rem",
          height: "16.3rem",
          marginBottom: 16,
          flexDirection: "column",
          borderEndEndRadius: "16px",
        }}>
        <Grid
          container
          alignItems="center"
          style={{
            padding: "1.0rem",
            backgroundColor: "#8DD3BB",
            borderStartEndRadius: "16px",
          }}>
          {loggedIn ? (
            <>
              {hasProfilePicture ? (
                <Avatar
                  style={{ width: "3rem", height: "3rem" }}
                  src={Profilepic}
                  alt="image"
                />
              ) : (
                <Avatar
                  style={{ width: "3rem", height: "3rem" }}
                  src="//"
                  alt="J"
                />
              )}
              <Typography variant="body1" style={{ marginLeft: "1rem" }}>
                <b>{userName}</b>
              </Typography>
            </>
          ) : null}

          <Grid
            item
            xs={true}
            style={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="body2">
              <b>{type}</b>
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          display="flex"
          spacing={3}
          style={{ padding: "1.5rem" }}>
          <Grid item sx={{ marginTop: 1, marginLeft: "3rem" }}>
            <img src={Room} />
          </Grid>

          <Grid item style={{ marginRight: "3rem" }}>
            <Typography variant="caption">Number of Rooms</Typography>

            <Typography variant="body2">
              <b>{rooms}</b>
            </Typography>
          </Grid>

          <Grid item sx={{ marginTop: 1 }}>
            <img src={Room} />
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
          border: "1px solid #EAEAEA",
          width: "23rem",
          height: "16.3rem",
          marginBottom: 16,
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
