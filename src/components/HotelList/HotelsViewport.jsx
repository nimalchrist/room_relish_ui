import React, { useState, useEffect } from "react";
import MainCardsContainer from "./Components/MainCardsContainer";
import { Box, Button, Typography } from "@mui/material";
import theme from "../../utils/theme/theme";

function HotelsViewport({ listOfHotels, checkIn, checkOut, rooms }) {
  // hooks
  const [showAllHotels, setShowAllHotels] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [display, setDisplay] = useState(true);


  useEffect(() => {
    if (!Array.isArray(listOfHotels)) {
      setShowButton(false);
    }
    if (listOfHotels.length > 4) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  }, [listOfHotels]);

  const handleShowMoreLessClick = () => {
    setShowAllHotels(!showAllHotels);
  };

  return (
    <Box
      sx={{
        flexBasis: "70%",
        "@media (max-width: 696px)": {
          flexBasis: "100%",
        },
        height: "500px",
        overflowY: "auto",
        margin: "0px auto 100px auto",
      }}>
      {showButton && (
        <Box sx={{ height: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography sx={{ fontSize: "14px" }}>
              <b>
                Showing{" "}
                {Math.min(
                  listOfHotels.length,
                  showAllHotels ? listOfHotels.length : 4
                )}{" "}
                of
              </b>
            </Typography>
            <h5
              style={{
                color: theme.palette.text.secondary,
                whiteSpace: "nowrap",
              }}>
              {listOfHotels.length} places
            </h5>
          </Box>
        </Box>
      )}
      <MainCardsContainer
        listOfHotels={listOfHotels}
        showAllHotels={showAllHotels}
        In={checkIn}
        Out={checkOut}
        rooms={rooms}
      />
      {showButton && display && (
        <Box sx={{ marginTop: 3 }}>
          <Button
            onClick={handleShowMoreLessClick}
            disableRipple
            disableElevation
            sx={{
              width: "100%",
              margin: "16px auto",
              height: "48px",
              color: "white",
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
              },
            }}>
            {showAllHotels ? "Show less results" : "Show more results"}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default HotelsViewport;
