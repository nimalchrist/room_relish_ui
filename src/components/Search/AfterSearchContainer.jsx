import React, { useState } from "react";
import {
  Paper,
  TextField,
  InputAdornment,
  Grid,
  FormControl,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import theme from "../../utils/theme/theme";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/material/styles";

import search from "../../assets/icons/search-icons/search.svg";
import car from "../../assets/icons/search-icons/car.svg";
import location from "../../assets/icons/search-icons/location.svg";
import { RemoveCircle } from "@mui/icons-material";

// customised text field
const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#1C1B1F",
  },
  "& .MuiFormLabel-root": {
    fontSize: "19px",
    fontFamily: "Montserrat, sans-serif",
    color: "#1C1B1F",
  },
  width: "220px",
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
  },
});

// styled button
const StyledButton = styled(Button)({
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.primary.main,
  },
  boxShadow: "none",
  color: "black",
});

const AfterSearchContainer = ({
  destination,
  checkIn,
  checkOut,
  rooms,
  handleSearch,
  setDestination,
  setCheckIn,
  setCheckOut,
  setRooms,
}) => {
  // hooks
  const [loading, setLoading] = useState(false);
  // handlers
  const handleClick = () => {
    setLoading(true);
    handleSearch();
    setLoading(false);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        alignSelf: "center",
        zIndex: 5,
        flexBasis: "80%",
        height: "auto",
        borderRadius: "16px",
        margin: "100px auto 40px auto",
      }}>
      <FormControl>
        <Grid
          container
          direction="row"
          spacing={1}
          sx={{ margin: "20px auto" }}>
          <Grid item>
            <StyledTextField
              variant="outlined"
              label="Enter Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
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
              InputLabelProps={{ shrink: true }}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}></StyledTextField>
          </Grid>

          <Grid item>
            <StyledTextField
              type="date"
              label="Check Out"
              id="checkout"
              variant="outlined"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              InputLabelProps={{ shrink: true }}></StyledTextField>
          </Grid>

          <Grid item>
            <StyledTextField
              label="Rooms"
              id="rooms"
              value={rooms}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={car} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <AddCircleIcon onClick={(e) => setRooms(rooms + 1)} />
                    </IconButton>
                    <IconButton>
                      <RemoveCircle
                        onClick={(e) => {
                          if (rooms > 0) {
                            setRooms(rooms - 1);
                          }
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}></StyledTextField>
          </Grid>
          <Grid item>
            <StyledButton>
              <IconButton onClick={handleClick}>
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      verticalAlign: "middle",
                      ml: 1,
                      color: "white",
                      width: "1.5rem",
                    }}
                  />
                ) : (
                  <img src={search}></img>
                )}
              </IconButton>
            </StyledButton>
          </Grid>
        </Grid>
      </FormControl>
    </Paper>
  );
};

export default AfterSearchContainer;
