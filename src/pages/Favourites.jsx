import React from "react";
import { Grid, Box, Typography, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import favouriteImage from "../assets/images/favourite.svg";
import theme from "../utils/theme/theme";

const Favourites = () => {
  const navigate = useNavigate();

  const [favourites, setFavourites] = useState([]);

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

          if (!responseData.success) {
            // setLoggedIn(true);
            navigate("/404-errror-no-login-status");
          }
        }
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    };

    askLoggedInStatus();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3200/auth/users/favourites",
        { withCredentials: true }
      );
      const data = response.data;

      console.log(data);
      setFavourites(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleFavoriteClick = (hotelId) => {
    const isCurrentlyFavorite = favourites.some((fav) => fav._id === hotelId);
    const method = isCurrentlyFavorite ? "DELETE" : "POST";

    axios({
      method,
      url: `http://localhost:3200/auth/users/favourites/${hotelId}`,
      withCredentials: true,
    })
      .then((response) => {
        console.log("Request successful:", response);
        // Update the list of favorites after successful update
        if (method === "POST") {
          setFavourites([...favourites, response.data]);
        } else {
          setFavourites(favourites.filter((fav) => fav._id !== hotelId));
        }
      })
      .catch((error) => {
        console.error("Error making request:", error);
      });
  };
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <StarOutlinedIcon
          key={i}
          fontSize="small"
          style={{ color: "#FF8682" }}
        />
      );
    }
    return stars;
  };

  const handleFavourite = (id) => {
    const queryString = `?q=${encodeURIComponent(id)}`;
    navigate(`/hotel-details${queryString}`);
  };

  return (
    <div>
      {favourites.length === 0 ? (
        <Box
          sx={{
            width: "80%",
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#504E4D",
          }}>
          {/* <div> */}
          <div style={{ display: "flex", flexDirection: "column", rowGap: 15 }}>
            <h1 style={{ color: "#504E4D", marginBottom: "1rem" }}>Hmmm... </h1>
            <p
              style={{
                fontWeight: "bold",
                color: "#504E4D",
                marginBottom: "1rem",
              }}>
              You don't have any favourites.
            </p>
            <p style={{ color: "#504E4D" }}>
              Please add some favourites to save them here.
            </p>
            <Link to="/">
              <Button variant="contained" color="primary">
                Add Favorites
              </Button>
            </Link>
          </div>
          <div>
            <img src={favouriteImage} alt="favourite" />
          </div>
          {/* </div> */}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            marginLeft: "4.7%",
            marginTop: "20vh",
            marginBottom: "25vh",
          }}>
          <Typography variant="top"> Favourites</Typography>
          <br />
          {favourites.map((feature, index) => (
            <Paper
              elevation={5}
              spacing={2}
              key={index}
              sx={{ width: "90vw", marginBottom: "6vh" }}>
              <Grid
                container
                spacing={0}
                style={{ width: "90vw", height: "44vh" }}>
                <Grid
                  item
                  xs={12}
                  md={4}
                  style={{
                    height: "44vh",
                    objectFit: "cover",
                    overflow: "hidden",
                  }}>
                  <img
                    src={feature.images[0]}
                    alt="Main"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box
                    sx={{
                      height: "28vh",
                      marginLeft: "1vw",
                      marginTop: "3vh",
                      marginRight: "1vw",
                    }}>
                    <Grid
                      item
                      sx={{ marginLeft: "49vw", marginRight: "0.5vw" }}>
                      <Typography variant="price"> Starting from</Typography>
                      <Typography variant="subheading">
                        <subheader> ${feature.priceStartingFrom}</subheader>
                        <Typography
                          variant="caption"
                          style={{ display: "inline", marginTop: "2vh" }}>
                          <b>/night</b>
                        </Typography>
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "13px",
                          marginLeft: 4.5,
                        }}>
                        excl. tax
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        textAlign: "left",
                        marginTop: -6.5,
                        marginBottom: 2,
                      }}>
                      <Typography variant="heading">
                        {feature.hotelName}
                      </Typography>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                      <Grid item sx={{ textAlign: "left" }}>
                        <LocationOnIcon />
                      </Grid>
                      <Grid item sx={{ textAlign: "left", marginBottom: 2 }}>
                        <Typography variant="address">
                          {feature.location["address"]}
                        </Typography>
                      </Grid>
                      <Grid container direction="row">
                        <Grid item sx={{ marginBottom: 3 }}>
                          {" "}
                        </Grid>
                        <Grid
                          item
                          sx={{ flexDirection: "row", marginTop: 0.3 }}>
                          <Typography variant="rating">
                            {" "}
                            {renderStars(feature.hotelType)} {feature.hotelType}{" "}
                            Star Hotel
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            textAlign: "left",
                            marginLeft: 10,
                            fontSize: 14,
                          }}>
                          <FreeBreakfastIcon size="small" />
                          <Grid sx={{ marginLeft: 4, marginTop: -3 }}>
                            <Typography variant="amenities">
                              20+Aminities
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Button
                        variant="outlined"
                        sx={{
                          marginTop: "6px",
                          height: "30px",
                          color: "#112211",
                        }}>
                        {" "}
                        4.2
                      </Button>
                      <Grid item sx={{ marginTop: "6px", width: "9vw", pl: 1 }}>
                        <b>{feature.overallReview} </b>{" "}
                      </Grid>
                      <Grid
                        item
                        sx={{ marginTop: "6px", width: "12vw", pl: 1 }}>
                        {feature.numReviews} Reviews
                      </Grid>
                    </Grid>
                  </Box>
                  <hr
                    style={{
                      width: "57.9vw",
                      marginTop: "1vh",
                      marginLeft: "1vw",
                      border: "0.1px solid #ccc",
                    }}
                  />
                  <Box
                    m={1}
                    display="flex"
                    justifyContent="space-between"
                    sx={{
                      marginLeft: "1vw",
                      marginTop: "3vh",
                      marginRight: "1vw",
                    }}>
                    <Grid item>
                      <Button
                        sx={{ color: "red" }}
                        onClick={() => handleFavoriteClick(feature._id)} 
                      >
                        {favourites.some((fav) => fav._id === feature._id) ? (
                          <FavoriteOutlinedIcon />
                        ) : (
                          <FavoriteBorderOutlinedIcon />
                        )}
                      </Button>
                    </Grid>

                    <Button
                      variant="outlined"
                      onClick={() => handleFavourite(feature._id)}
                      sx={{
                        width: "50vw",
                        height: "38px",
                        backgroundColor: theme.palette.primary.main,
                        "&:hover": { backgroundColor: theme.palette.primary.main },
                      }}>
                      <Typography
                        variant="rating"
                        color={"#ffffff"}
                        sx={{ cursor: "pointer" }}>
                        View Place
                      </Typography>
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      )}
    </div>
  );
};

export default Favourites;
