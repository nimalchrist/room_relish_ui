import React from "react";
import PriceRangeFilter from "./Components/PriceRangeFilter.jsx";
import HotelRatingFilter from "./Components/HotelRatingFilter.jsx";
import AmenitiesFilter from "./Components/AmenitiesFilter.jsx";
import { Typography, Divider, Grid } from "@mui/material";

export default function FilterSection({
  amenities,
  extraAmenities,
  selectedPrice,
  selectedRating,
  handleSelectedRating,
  handleAmenitiesChange,
  handleExtraAmenitiesChange,
  handleSelectedPrice,
}) {
  return (
    <Grid
      container
      xs={12}
      lg={3}
      md={3}
      sx={{
        bgcolor: "background.paper",
        marginBottom: "160px",
        height: "400px",
        overflowY: "auto",
      }}>
      <Typography
        width="100%"
        gutterBottom
        variant="fill"
        component="div"
        sx={{ margin: "10px 10px 10px 10px" }}>
        Filters
      </Typography>
      <Grid item xs={12}>
        <PriceRangeFilter
          value={selectedPrice}
          changePrice={handleSelectedPrice}
        />
      </Grid>
      <Divider variant="middle" />
      <Grid item xs={12}>
        <HotelRatingFilter
          ratingValue={selectedRating}
          changeRating={handleSelectedRating}
        />
      </Grid>
      <Divider variant="middle" />
      <Grid item xs={12}>
        <AmenitiesFilter
          amenities={amenities}
          extraAmenities={extraAmenities}
          handleAmenitiesChange={handleAmenitiesChange}
          handleExtraAmenitiesChange={handleExtraAmenitiesChange}
        />
      </Grid>
    </Grid>
  );
}
