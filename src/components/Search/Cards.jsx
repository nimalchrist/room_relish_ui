import React from "react";

import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

const Cards = () => {
  // hooks
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  // popular list of hotels
  const popularPlaces = [
    {
      id: 1,
      imageUrl:
        "https://media.istockphoto.com/id/499644827/photo/indian-temple.jpg?s=612x612&w=0&k=20&c=mSRsr-98K_qcg6dBkmFGothhswnPAp5i21G34Q6kDZw=",
      title: "Madurai",

      description: "Magnificient Temples",
    },
    {
      id: 2,
      imageUrl: "https://www.holidify.com/images/bgImages/TUTICORIN.jpg",
      title: "Tuticorin",

      description: "Beautiful Seashore",
    },
    {
      id: 3,
      imageUrl:
        "https://media.istockphoto.com/id/518174579/photo/night-traffic-in-bangalore.jpg?s=612x612&w=0&k=20&c=zgAH6jkXNuFGao2PpqSGyMsYmqfs4DpwIM6ccB7ivjE=",
      title: "Bangalore",

      description: "Amazing streets",
    },
    {
      id: 4,
      imageUrl:
        "https://as2.ftcdn.net/v2/jpg/00/47/49/01/1000_F_47490128_JLClMTbZyVdxl3OW2m8H4vJHW7hDZ8Jj.jpg",
      title: "Hyderabad",

      description: "Hyderabad Adventure",
    },
    {
      id: 5,
      imageUrl:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      title: "Trivandrum",

      description: "Piece of Paradise",
    },
    {
      id: 6,
      imageUrl:
        "https://media.istockphoto.com/id/470913348/photo/lighthouse-mamallapuram.jpg?s=612x612&w=0&k=20&c=KnPAZiRI4-iCnQhpNash9J7n1qliud-HN-OkaUkbXOw=",
      title: "Pondicherry",

      description: "Enchanting Journey",
    },
    {
      id: 7,
      imageUrl:
        "https://media.istockphoto.com/id/1094387460/photo/night-beach-party-in-goa.jpg?s=612x612&w=0&k=20&c=90oHFh3klXfMASU5t0za7OyFde5FMLA9i_kB3mi37sM=",
      title: "Goa",
      description: "Happiness in waves",
    },
    {
      id: 8,
      imageUrl:
        "https://c1.wallpaperflare.com/preview/904/465/140/1913-architecture-building-chennai.jpg",
      title: "Chennai",
      description: "Gateway South",
    },
  ];

  // handler functions
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  function handleBookingButtonClick(title) {
    const rooms = 1;

    const currentDate = new Date();
    const checkInDate = new Date(currentDate);
    checkInDate.setDate(currentDate.getDate() + 1);

    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkInDate.getDate() + 2);

    const formattedCheckIn = formatDate(checkInDate);
    const formattedCheckOut = formatDate(checkOutDate);
    const queryString = `?q=${encodeURIComponent(
      title
    )}&checkIn=${encodeURIComponent(
      formattedCheckIn
    )}&checkOut=${encodeURIComponent(
      formattedCheckOut
    )}&rooms=${encodeURIComponent(rooms)}`;
    navigate(`/hotel-list${queryString}`);
  }

  // supportive methods
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <Grid
        container
        sx={{ height: "auto", width: "80%", margin: "60px auto"}}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Typography variant="h4n" component="h6">
              Fall Into Travel!
            </Typography>
            <Button
              variant="outlined"
              sx={{ color: "black" }}
              disabledElevation
              onClick={handleShowMore}>
              {showMore ? "Show less" : "Show more"}
            </Button>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography variant="body1" component="h6" sx={{ margin: 2 }}>
              Going somewhere to celebrate the season? Whether you're going home
              or somewhere to roam! We have got the travel tools to get you to
              your destination
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}>
            {popularPlaces
              .slice(0, showMore ? popularPlaces.length : 3)
              .map((place, index) => (
                <>
                  <Card
                    sx={{
                      flexBasis: "30%",
                      backgroundImage: `url(${place.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      objectFit: "cover",
                      overflow: "hidden",
                      borderRadius: "14px",
                      margin: "25px auto",
                      "@media (max-width: 600px)": {
                        flexBasis: "100%",
                      },
                    }}
                    key={index}>
                    <CardContent
                      sx={{
                        margin: "70% auto 1% auto",
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                      }}>
                      <Typography
                        color="white"
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ whiteSpace: "nowrap", marginLeft: 0.5 }}>
                        {place.title}
                      </Typography>
                      <Typography
                        color="white"
                        gutterBottom
                        variant="caption"
                        component="div"
                        sx={{ whiteSpace: "nowrap", marginLeft: 0.5 }}>
                        {place.description}
                      </Typography>
                      <Button
                        variant="contained"
                        disableElevation
                        disableRipple
                        sx={{ padding: "4px 20px" }}
                        onClick={() => handleBookingButtonClick(place.title)}>
                        <Typography variant="btntext">Book a hotel</Typography>
                      </Button>
                    </CardContent>
                  </Card>
                </>
              ))}
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Cards;
