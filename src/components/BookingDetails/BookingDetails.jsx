import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Paper,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PopupForm from "./PopupForm";
import check from "../../assets/icons/Booking-icons/checking.png";
import tick from "../../assets/icons/Booking-icons/tick.png";
import axios from "axios";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import theme from "../../utils/theme/theme";

const BookingDetails = () => {
  // hooks
  const navigate = useNavigate();
  const [cardList, setCardList] = useState([]);
  const [location, setLocation] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [hotelImage, setHotelImage] = useState("");
  const [room, setRoom] = useState("");
  const [ratePerNight, setRatePerNight] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isRadioButtonClicked, setIsRadioButtonClicked] = useState(false);
  const [showViewBookingButton, setShowViewBookingButton] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const qparams = new URLSearchParams(window.location.search);

  // parameter values
  const checkIn = qparams.get("checkin");
  const checkOut = qparams.get("checkout");
  const rooms = qparams.get("rooms");
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const roomId = qparams.get("rid");
  const roomIndex = qparams.get("rii");

  const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
  let numberOfDays = 0;
  if (timeDiff == 0) {
    numberOfDays = 1;
  } else {
    numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }

  const totalAmount = numberOfDays * ratePerNight;
  const items = [
    {
      name: `Base Fare [Days: ${numberOfDays}]`,
      price: ratePerNight * numberOfDays,
    },
    { name: "Discount", price: 0 },
    { name: "Taxes", price: 0 },
    { name: "Service Fee", price: 5 },
  ];

  const totalAmountToBePaid = items.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  // supportive methods
  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  const fetchUserCardDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3200/auth/users/user/cards",
        { withCredentials: true }
      );
      const cardsData = response.data;
      setCardList(cardsData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const fetchHotelSpecificData = async () => {
    try {
      const hotelId = qparams.get("hid");

      // Fetch hotel details
      const hotelUrl = `http://localhost:3200/hotels/${hotelId}`;
      const hotelResponse = await axios.get(hotelUrl);
      const hotelData = hotelResponse.data;

      setHotelId(hotelData._id);
      setLocation(hotelData.location.address);
      setHotelName(hotelData.hotelName);
      setHotelImage(hotelData.images[0]);
      setRoom(hotelData.rooms[roomIndex].roomType);
      setRatePerNight(hotelData.rooms[roomIndex].roomRate);
    } catch (error) {
      console.error("Error in fetching:", error);
    }
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

        if (!responseData.success) {
          navigate("/*");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  // useEffect hooks
  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    fetchHotelSpecificData();
  }, []);

  useEffect(() => {
    fetchUserCardDetails();
  }, []);

  // handlers
  const handleContinueYourBookingButtonClick = () => {
    // need to call the booking api
    if (true) {
      setShowRadioButtons(true);
    } else {
      // booking faild message
    }
  };
  const handleSelectedCardChange = (event) => {
    setSelectedCard(event.target.value);
    setIsRadioButtonClicked(true);
  };
  const handleOpenPopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handlePayNowButtonClick = async () => {
    try {
      const response = await fetch(`http://localhost:3200/payment/${hotelId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          hotelId: hotelId,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error in payment:", error);
    }
    if (true) {
      setShowViewBookingButton(false);
      setShowPaymentPopup(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowPaymentPopup(false);
        setShowConfetti(false);
        setTimeout(() => {
          setShowViewBookingButton(true);
        }, 500);
      }, 4000);
    } else {
      //need to add some other logic
    }
  };
  const handleViewBookingButtonClick = () => {
    const query = `?hid=${encodeURIComponent(hotelId)}&rid=${encodeURIComponent(
      roomId
    )}&rii=${encodeURIComponent(roomIndex)}&rupees=${encodeURIComponent(
      totalAmountToBePaid
    )}&ckeckIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(
      checkOut
    )}&roomamt=${encodeURIComponent(totalAmount)}&rooms=${encodeURIComponent(
      rooms
    )}`;
    navigate(`/view-booking${query}`);
  };

  return (
    <Box
      sx={{
        width: "95%",
        height: "auto",
        margin: "160px auto 70px auto",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}>
      <Box sx={{ flexBasis: "48%" }}>
        <Box
          textAlign="center"
          sx={{
            width: "100%",
            display: "flex",
            textAlign: "left",
            justifyContent: "space-between",
          }}>
          <Typography variant="a">
            <strong>{room}</strong>
          </Typography>
          <Typography variant="b" sx={{ color: "#FF8682" }}>
            ₹{ratePerNight}/night
          </Typography>
        </Box>
        <Box
          sx={{
            margin: "40px auto",
            textAlign: "center",
          }}>
          <Box>
            <Typography variant="c">{hotelName}</Typography>
          </Box>
          <Box>
            <LocationOnIcon fontSize="small" />
            <Typography variant="d">{location}</Typography>
          </Box>
          <Box>
            <Typography variant="e">
              <strong>{formatDate(checkIn)}</strong>
            </Typography>
            <Box>
              <img src={check} alt="checkIng img" />
            </Box>
            <Typography variant="f">
              <strong>{formatDate(checkOut)}</strong>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ flexBasis: "48%" }}>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            alignItems: "center",
            borderRadius: "10px",
            padding: "10px",
          }}>
          <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between">
            <Box
              sx={{
                flexBasis: "25%",
                height: "auto",
                border: "1px solid #ccc",
                borderRadius: 4,
                overflow: "hidden",
              }}>
              <img
                src={hotelImage}
                alt="Hotel Image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box style={{ flexBasis: "70%" }}>
              <Typography variant="z">
                <strong>{room}</strong>
              </Typography>
            </Box>
          </Box>
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "grey",
              marginTop: "18px",
            }}
          />
          <Typography variant="y">
            Your booking is protected by<strong> Room Relish</strong>
          </Typography>
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "grey",
              marginTop: "3px",
              marginBottom: "10px",
            }}
          />
          <Typography variant="x">
            <strong>Price Details</strong>
          </Typography>
          {items.map((item, index) => (
            <Grid container key={index}>
              <Grid item xs={6}>
                <Typography variant="w">{item.name}</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="v">
                  <strong>{`₹${item.price}`}</strong>
                </Typography>
              </Grid>
            </Grid>
          ))}
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "grey",
              marginRight: "10px",
              marginBottom: "9px",
              marginTop: "10px",
            }}
          />
          {/* Total Price */}
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="w">Total</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography variant="v">
                <strong>{`₹${totalAmountToBePaid.toFixed(2)}`}</strong>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box sx={{ flexBasis: "100%" }}>
        <Box
          sx={{
            margin: "20px auto",
            height: "wrap",
            width: "80%",
          }}>
          {!showRadioButtons ? (
            <React.Fragment>
              <Button
                variant="contained"
                style={{ zIndex: 1 }}
                fullWidth
                onClick={handleContinueYourBookingButtonClick}>
                Continue Your Booking
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <RadioGroup
                value={selectedCard}
                onChange={handleSelectedCardChange}>
                {cardList.message === "No saved cards." ? (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      style={{ zIndex: 1 }}
                      fullWidth
                      onClick={handleContinueYourBookingButtonClick}>
                      No Cards added yet !
                    </Button>
                  </React.Fragment>
                ) : (
                  cardList.map((card, index) => (
                    <Box
                      key={index}
                      sx={{
                        borderRadius: "10px",
                        bgcolor: theme.palette.primary.main,
                        marginTop: "5px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}>
                      <Typography style={{ color: "white" }}>
                        Card Number - {card.cardNumber} / Expiry Date -{" "}
                        {card.expirationDate}
                      </Typography>
                      <FormControl>
                        <FormControlLabel
                          key={index}
                          value={`${index}`}
                          control={<Radio color="secondary" />}
                          labelPlacement="start"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        />
                      </FormControl>
                    </Box>
                  ))
                )}
              </RadioGroup>
              <Box
                border="2px dashed"
                borderRadius="10px"
                borderColor={theme.palette.primary.main}
                margin="20px auto"
                padding={2}
                width="100%"
                height="auto"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                onClick={handleOpenPopup}
                style={{ cursor: "pointer" }}>
                <Box flex={1}>
                  <AddCircleOutlineIcon
                    style={{ fontSize: 40, color: theme.palette.primary.main }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6" color="grey">
                    Add New Card
                  </Typography>
                </Box>
              </Box>
              <PopupForm
                open={showPopup}
                handleClosePopup={handleClosePopup}
                fetchCards={fetchUserCardDetails}
              />
            </React.Fragment>
          )}
        </Box>
        <Box
          sx={{
            width: "80%",
            alignItems: "center",
            margin: "100px auto 20px auto",
          }}>
          {isRadioButtonClicked && !showConfetti && !showViewBookingButton && (
            <Button
              variant="contained"
              style={{
                zIndex: 1,
                width: "100%",
              }}
              onClick={handlePayNowButtonClick}>
              Complete Your Payment
            </Button>
          )}
          {!showConfetti && showViewBookingButton && (
            <Button
              variant="contained"
              fullWidth
              style={{
                marginTop: "15px",
                width: "100%",
              }}
              onClick={() => handleViewBookingButtonClick()}>
              View Booking
            </Button>
          )}
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
                <strong>Payment Successful !!!</strong>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default BookingDetails;
