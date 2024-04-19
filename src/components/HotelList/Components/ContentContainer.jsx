import { Box, Grid, CardContent, Button, Typography } from "@mui/material";
import CoffeeIcon from "@mui/icons-material/Coffee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Rating from "@mui/material/Rating";
import { React } from "react";

function ContentContainer({ hotel }) {
  const hotelType = hotel.hotelType;
  const hotelStarRating = parseFloat(hotel.rating.toFixed(1));

  return (
    <Box>
      <CardContent>
        <Grid container xs={12}>
          <Grid item xs={8}>
            <Typography variant="heading">{hotel.hotelName}</Typography>
          </Grid>
          <Grid container xs={4}>
            <Grid item>
              <Typography>Starting from</Typography>
            </Grid>
            <Grid item>
              <Typography variant="nightprice">
                Rs. {hotel.priceStartingFrom}
              </Typography>
              <Typography variant="night">/night</Typography>
            </Grid>
            <Grid>
              <Typography>excl. tax</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={1}>
            <LocationOnIcon />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="address">{hotel.location.address}</Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item>
            <Rating
              sx={{ color: "#FF8682" }}
              name="simple-controlled"
              value={hotelType}
              readOnly
            />
          </Grid>
          <Grid item>
            <Typography variant="rating">
              <b>{hotel.hotelType}</b> Star Hotel
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={1}>
            <CoffeeIcon size="small" />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="amenities">
              {hotel.amenities.length} + Amenities
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12} gap={1}>
          <Grid item xs={2}>
            <Button variant="outlined">{hotelStarRating}</Button>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="review">
              {hotel.overallReview} {hotel.numReviews}
              <span>
                <Typography variant="address"> reviews</Typography>
              </span>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Box>
  );
}
export default ContentContainer;
