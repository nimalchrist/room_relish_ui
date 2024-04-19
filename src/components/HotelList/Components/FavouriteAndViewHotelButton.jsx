import React from "react";
import { Grid } from "@mui/material";
import ViewButton from "./ViewButton";
import FavIcon from "./FavIcon";

function FavouriteAndViewHotelButton({ hotelId, In, Out, rooms }) {
  return (
    <>
      <Grid container xs={12} direction="row" alignItems="baseline">
        <Grid item xs={2}>
          <FavIcon hotelId={hotelId} />
        </Grid>
        <Grid item xs={8}>
          <ViewButton hotelId={hotelId} In={In} Out={Out} rooms={rooms} />
        </Grid>
      </Grid>
    </>
  );
}
export default FavouriteAndViewHotelButton;
