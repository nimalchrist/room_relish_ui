import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../../../utils/theme/theme";

function ViewButton({ hotelId, In, Out, rooms }) {
  // hooks
  const navigate = useNavigate();

  // handlers
  const handleIconClick = async () => {
    const queryString = `?q=${encodeURIComponent(
      hotelId
    )}&checkIn=${encodeURIComponent(In)}&checkOut=${encodeURIComponent(
      Out
    )}&rooms=${encodeURIComponent(rooms)}`;

    //add the hotel to recent list
    const url = `http://localhost:3200/auth/users/recent/${hotelId}`;
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };

    try {
      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("PUT request succeeded with response:", data);
    } catch (error) {
      console.error("There was a problem with the PUT request:", error);
    }
    navigate(`/hotel-details${queryString}`);
  };

  return (
    <Button
      size="large"
      onClick={handleIconClick}
      variant="outlined"
      disabledRipple
      sx={{
        width: "100%",
        height: "38px",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
        },
      }}>
      <Typography
        color="white"
        sx={{
          fontFamily: "Montserrat",
          fontSize: "16px",
          lineHeight: "normal",
          fontWeight: 500,
          fontStyle: "normal",
        }}>
        View Place
      </Typography>
    </Button>
  );
}

export default ViewButton;
