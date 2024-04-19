import React from "react";
import theme from "../../utils/theme/theme.jsx";
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  Grid,
  FormControl,
  Typography,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import build from "../../assets/icons/search-icons/build.svg";
import car from "../../assets/icons/search-icons/car.svg";
import location from "../../assets/icons/search-icons/location.svg";
import { useNavigate } from "react-router-dom";
import { RemoveCircle } from "@mui/icons-material";

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#1C1B1F",
  },
  "& .MuiFormLabel-root": {
    fontSize: "19px",
    fontFamily: "Montserrat, sans-serif",
    color: "#1C1B1F",
  },
  "&.Mui-focused": {
    backgroundColor: "white",
  },
  "&::placeholder": {
    color: "white",
  },

  width: "220px",
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.primary.main,
  },
  boxShadow: "none",
  color: "white",
});

const SearchContainer = () => {
  // hooks
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [date, setDate] = useState(true);

  // handlers
  const handleDest = (e) => {
    setDestination(e.target.value);
  };
  const handleCheckIn = (e) => {
    setCheckInDate(e.target.value);
  };
  const handleCheckOut = (e) => {
    setCheckOutDate(e.target.value);
  };
  const handleAddRooms = () => {
    setNumberOfRooms(numberOfRooms + 1);
  };
  const handleRemoveRooms = () => {
    if (numberOfRooms > 0) {
      setNumberOfRooms(numberOfRooms - 1);
    }
  };
  const handleClick = () => {
    if (destination && checkInDate && checkOutDate && numberOfRooms) {
      if (new Date(checkInDate) > new Date(checkOutDate)) {
        setDate(false);
        setSnackbarOpen(true);
        return;
      }
      const queryString = `?q=${encodeURIComponent(
        destination
      )}&checkIn=${encodeURIComponent(
        checkInDate
      )}&checkOut=${encodeURIComponent(
        checkOutDate
      )}&rooms=${encodeURIComponent(numberOfRooms)}`;
      setDate(true);
      console.log("Query string", queryString);
      navigate(`/hotel-list${queryString}`);
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        margin: "-10px auto 60px auto",
        width: "80%",
        height: "auto",
        borderRadius: "16px",
        padding: "0px 0px 20px 0px",
      }}>
      <Box sx={{ paddingTop: "20px", marginLeft: 4 }}>
        <Typography variant="sideheading">Where are you staying?</Typography>
      </Box>
      <FormControl>
        <Grid
          container
          direction="row"
          spacing={2}
          sx={{ margin: "20px 20px 0px 0px" }}>
          <Grid item>
            <StyledTextField
              variant="outlined"
              label="Enter Destination"
              id="destination"
              value={destination}
              onChange={handleDest}
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={location} />
                  </InputAdornment>
                ),
              }}></StyledTextField>
          </Grid>

          <Grid item>
            <StyledTextField
              type="date"
              label="Check In"
              variant="outlined"
              id="checkin"
              InputLabelProps={{ shrink: true }}
              value={checkInDate}
              onChange={handleCheckIn}></StyledTextField>
          </Grid>

          <Grid item>
            <StyledTextField
              type="date"
              label="Check Out"
              id="checkout"
              variant="outlined"
              value={checkOutDate}
              onChange={handleCheckOut}
              InputLabelProps={{ shrink: true }}></StyledTextField>
          </Grid>

          <Grid item>
            <StyledTextField
              label="Rooms"
              id="rooms"
              value={numberOfRooms}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={car} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <AddCircleIcon onClick={handleAddRooms} />
                    </IconButton>
                    <IconButton>
                      <RemoveCircle onClick={handleRemoveRooms} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}></StyledTextField>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}>
              <Alert
                elevation={6}
                variant="filled"
                severity="error"
                onClose={handleSnackbarClose}>
                {date
                  ? "Please fill in all the required fields"
                  : "Please enter the date correctly"}
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "3%",
          padding: "0% 4%",
        }}>
        <StyledButton
          variant="outlined"
          disableRipple
          startIcon={<img src={build} alt="Build Icon" />}
          onClick={handleClick}>
          Show Places
        </StyledButton>
      </Box>
    </Paper>
  );
};

export default SearchContainer;
