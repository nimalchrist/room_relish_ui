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
  Snackbar,
  Alert,
  CircularProgress,
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
  const [bookingSuccessfull, setBookingSuccessfull] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("");
  const [showPriceList, setShowPriceList] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

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

  let totalAmountToBePaid = 0;
  if (items.length > 0) {
    totalAmountToBePaid += items.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
  }

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
          navigate("/not_authorised_to_view_this_page");
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
  useEffect(() => {
    if (bookingSuccessfull) {
      setShowPriceList(true);
      setShowRadioButtons(true);
    } else if (bookingSuccessfull !== null) {
      setShowPriceList(false);
      setShowRadioButtons(false);
      setSnackBarOpen(true);
      setSnackBarSeverity("error");
      setSnackBarMessage(
        "Something wrong with your booking....Try again later"
      );
    }
    setBookingSuccessfull(null);
  }, [bookingSuccessfull]);

  // handlers
  const handleContinueYourBookingButtonClick = async () => {
    try {
      setLoading(true);
      const accessToken =
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWRodW1pdGhhQGFiYy5jb20iLCJpYXQiOjE3MTQxOTc1OTUsImV4cCI6MTcxNDI4Mzk5NX0.jtWl83lss78k8aZ7j2qx7y4RlQ5j1W9OC73v4lSZHlg";
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
      const requestBody = {
        _customerId: localStorage.getItem("clientId"),
        _hotelId: hotelId,
        _roomId: roomId,
        customerRoomCount: parseInt(rooms),
        customerDayCount: numberOfDays,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      };

      const response = await fetch(
        "http://localhost:8081/api/v1/booking/bookingDetails",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(requestBody),
        }
      );
      const responseBody = await response.json();
      if (typeof responseBody === "object") {
        setBookingId(responseBody.id);
        const newItems = [
          {
            name: `Base Fare [${responseBody.numOfDays} Days]`,
            price: responseBody.totalAmount,
          },
          { name: "Discount", price: 0 },
          { name: "GST", price: responseBody.gstOfTotalAmount },
          { name: "Service Fee", price: 5 },
        ];
        setBookingSuccessfull(true);
        setItems(newItems);
        setLoading(false);
      } else {
        setLoading(false);
        setBookingSuccessfull(false);
      }
    } catch (error) {
      setLoading(false);
      setBookingSuccessfull(false);
    }
  };
  const handlePayNowButtonClick = async () => {
    try {
      setLoading(true);
      const accessToken =
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWRodW1pdGhhQGFiYy5jb20iLCJpYXQiOjE3MTQxOTc1OTUsImV4cCI6MTcxNDI4Mzk5NX0.jtWl83lss78k8aZ7j2qx7y4RlQ5j1W9OC73v4lSZHlg";
      if (bookingId != "") {
        console.log(bookingId);
        const response = await fetch(
          `http://localhost:8081/api/v1/payment/pay?_bookingId=${bookingId}`,
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
          setLoading(false);
          setShowViewBookingButton(false);
          setShowPaymentPopup(true);
          setShowConfetti(true);
          setTimeout(() => {
            setShowPaymentPopup(false);
            setShowConfetti(false);
            setTimeout(() => {
              setShowViewBookingButton(true);
            }, 300);
          }, 6000);
        } else {
          setLoading(false);
          setSnackBarOpen(true);
          setSnackBarSeverity("error");
          setSnackBarMessage("Booking not found...Try again later");
        }
      }
    } catch (error) {
      setLoading(false);
      setSnackBarOpen(true);
      setSnackBarSeverity("error");
      setSnackBarMessage("Payment unsuccessfull...Try again later");
      console.error("Error in payment:", error);
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
  const handleSnackbarClose = async () => {
    setSnackBarOpen(false);
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
      <Box sx={{ flexBasis: showPriceList ? "48%" : "100%" }}>
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
            ₹{ratePerNight}/day
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
      {showPriceList && (
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
            {items.length > 0 ? (
              items.map((item, index) => (
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
              ))
            ) : (
              <Typography>Loading...</Typography>
            )}
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
      )}
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
                disabled={loading}
                onClick={handleContinueYourBookingButtonClick}>
                {loading ? (
                  <>
                    Continue your Booking <CircularProgress size={26} />
                  </>
                ) : (
                  "Continue Your Booking"
                )}
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
              disabled={loading}
              onClick={handlePayNowButtonClick}>
              {loading ? (
                <>
                  Complete Your Payment <CircularProgress size={26} />
                </>
              ) : (
                "Complete Your Payment"
              )}
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
                <strong>
                  Payment Successful...₹ {totalAmountToBePaid.toFixed(2)} paid
                </strong>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}>
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackBarSeverity}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default BookingDetails;
