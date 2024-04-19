import React from "react";
import { useState, useEffect } from "react";
import { Snackbar, Alert, Grid, Typography } from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { IconButton } from "@mui/material";
import location from "../../../assets/icons/location-icon/location.svg";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  EmailIcon,
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

const HotelDetailHeader = ({ data }) => {
  // hooks
  const currentURL = window.location.href;
  const [selectedId, setSelectedId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [sharingMessage, setSharingMessage] = useState("room relish");

  // supportive methods
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
  const checkLoggedInStatus = async () => {
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
          console.log("User is not logged in.");
        }
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  const favouriteHotels = async () => {
    const url = "http://localhost:3200/auth/users/favourites";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const res = await response.json();
        return res.some((fav) => fav._id === selectedId);
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // useEffect hooks
  useEffect(() => {
    if (data) {
      setSelectedId(data._id);
    }
  }, [data, selectedId]);

  useEffect(() => {
    if (loggedIn && selectedId !== null) {
      favouriteHotels().then((valueToCheck) => setIsFav(valueToCheck));
    }
  }, [loggedIn, selectedId]);

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  // handlers
  const handleShareClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleFavoriteClick = () => {
    if (!loggedIn) {
      setSnackbarOpen(true);
      return;
    }
    const newFav = !isFav;
    setIsFav(newFav);
    const url = `http://localhost:3200/auth/users/favourites/${selectedId}`;
    const method = newFav ? "POST" : "DELETE";
    const fetchOptions = {
      method: method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    fetch(url, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("PUT request succeeded with response:", data);
      })
      .catch((error) => {
        console.error("There was a problem with the PUT request:", error);
      });
  };
  const handleShare = async (platform) => {
    const sharingURL = currentURL;
    const sharingText = sharingMessage;
    let message = sharingText ? `${sharingText}\n\n` : "";

    if (navigator.share) {
      try {
        await navigator.share({
          title: sharingText,
          text: { sharingURL },
          url: sharingURL,
        });
        setSharingMessage(sharingURL);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      message +=
        platform === "mail" ? sharingURL : `${sharingText} ${sharingURL}`;

      switch (platform) {
        case "mail":
          const subject = "Check out this link";
          const body = sharingText
            ? `${sharingText}\n\n${sharingURL}`
            : sharingURL;
          window.open(
            `mailto:?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(body)}`
          );
          break;
        case "whatsapp":
          const encodedMessage = encodeURIComponent(
            sharingText ? `${sharingText}: ${sharingURL}` : sharingURL
          );
          window.open(
            `https://api.whatsapp.com/send?text=${encodedMessage}`,
            "_blank"
          );
          break;
        case "telegram":
          window.open(
            `https://t.me/share/url?url=${encodeURIComponent(
              sharingURL
            )}&text=${encodeURIComponent(sharingText)}`
          );
          break;
        case "linkedin":
          window.open(
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              sharingURL
            )}&title=${encodeURIComponent(sharingText)}`
          );
          break;
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              sharingURL
            )}&text=${encodeURIComponent(sharingText)}`
          );
          break;
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
              sharingURL
            )}`
          );
          break;
        default:
          break;
      }
    }
  };
  if (data == null) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <Grid
          container
          style={{
            width: "90%",
            margin: "2vh auto 2vh auto",
          }}>
          <Grid item xs={10} container direction="column">
            <Grid item sx={{ height: "5vh" }}>
              <Typography variant="h1" sx={{ fontSize: "24px" }}>
                {data.hotelName}&nbsp;
                <Typography
                  variant="pico"
                  component="span"
                  style={{ display: "inline-flex", alignItems: "center" }}>
                  {renderStars(data.hotelType)}
                  {data.hotelType} Star Hotel
                </Typography>
              </Typography>
            </Grid>
            <div>
              <Grid item style={{ height: "5vh", padding: "1vh 0" }}>
                <Typography variant="pico">
                  <img src={location} alt="location" />
                  {data.location.address}
                </Typography>
              </Grid>
              <Grid
                item
                container
                alignItems="center"
                sx={{ height: "5vh", padding: "1vh 0" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "500", marginLeft: "0.2vw" }}>
                  {data.rating % 1 === 0
                    ? data.rating.toFixed(0)
                    : data.rating.toFixed(1)}
                </Typography>
                &nbsp;
                <Typography variant="body1" sx={{ fontWeight: "700" }}>
                  {data.overallReview}
                </Typography>
                &nbsp;
                <Typography variant="pico">
                  {data.numReviews} reviews
                </Typography>
              </Grid>
            </div>
          </Grid>
          <Grid
            item
            xs={2}
            container
            direction="column"
            sx={{ height: "15vh", marginLeft: "-2px", width: "10vw" }}>
            <Grid
              item
              sx={{
                color: "#FF8682",
                alignItems: "center",
                height: "7.5vh",
                marginTop: "0.5vh",
              }}>
              <Typography variant="h4" align="right">
                Rs {data.priceStartingFrom}
                <Typography variant="body1" style={{ display: "inline" }}>
                  /night
                </Typography>
              </Typography>
            </Grid>

            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}>
              <Grid item>
                <IconButton
                  sx={{
                    height: "32px",
                    color: "red",
                    padding: "5px",
                    border: "1px solid #8DD3BB",
                    borderRadius: "0",
                    marginRight: "12px",
                  }}
                  onClick={handleFavoriteClick}>
                  {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  sx={{
                    height: "32px",
                    color: "#112211",
                    padding: "5px",
                    border: "1px solid #8DD3BB",
                    borderRadius: "0",
                    marginRight: "12px",
                  }}
                  onClick={handleShareClick}>
                  <ShareIcon />
                </IconButton>
                <div>
                  <Dialog open={open} onClose={handleClose} maxWidth="sm">
                    <DialogTitle>Share</DialogTitle>
                    <DialogContent>
                      <TextField
                        value={sharingMessage}
                        onChange={(e) => setSharingMessage(e.target.value)}
                        style={{ fontSize: 14 }}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClose}>
                                <Close />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          style: {
                            shrink: true,
                          },
                        }}
                      />
                    </DialogContent>
                    <DialogActions
                      style={{ display: "flex", justifyContent: "center" }}>
                      <EmailIcon
                        onClick={() => handleShare("mail")}
                        style={{ width: 40, height: 40, cursor: "pointer" }}
                      />
                      <WhatsappIcon
                        onClick={() => handleShare("whatsapp")}
                        style={{ width: 40, height: 40, cursor: "pointer" }}
                      />
                      <TelegramIcon
                        onClick={() => handleShare("telegram")}
                        style={{ width: 40, height: 40, cursor: "pointer" }}
                      />
                      <LinkedinIcon
                        onClick={() => handleShare("linkedin")}
                        style={{ width: 40, height: 40, cursor: "pointer" }}
                      />
                      <TwitterIcon
                        onClick={() => handleShare("twitter")}
                        style={{ width: 40, height: 40, cursor: "pointer" }}
                      />
                      <FacebookIcon
                        onClick={() => handleShare("facebook")}
                        style={{ width: 40, height: 40, cursor: "pointer" }}
                      />
                    </DialogActions>
                  </Dialog>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}>
          <Alert
            elevation={6}
            variant="filled"
            severity="error"
            onClose={() => setSnackbarOpen(false)}>
            Please login to add Hotel to favourites
          </Alert>
        </Snackbar>
      </div>
    );
  }
};

export default HotelDetailHeader;
