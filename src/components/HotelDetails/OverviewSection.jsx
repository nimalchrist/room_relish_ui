import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import axios from "axios";
import { useState, useEffect } from "react";
import theme from "../../utils/theme/theme";

const OverviewSection = () => {
  // hooks
  const [overview, setOverview] = useState();
  const [numReviews, setnumReviews] = useState();
  const [rating, setRating] = useState();
  const [overallReview, setoverallReview] = useState();
  const [locationFeatures, setlocationFeatures] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // supportive methods
  const fetchData = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const hotelId = params.get("q");
      const url = `http://localhost:3200/hotels/${hotelId}`;
      const response = await axios.get(url);
      const data = response.data;
      if (data) {
        setOverview(data.overview);
        setnumReviews(data.numReviews);
        const ratings = data.rating;
        const rate =
          ratings % 1 === 0 ? ratings.toFixed(0) : ratings.toFixed(1);
        setRating(rate);
        setoverallReview(data.overallReview);
        setlocationFeatures(data.locationFeatures);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  
  return (
    <div>
      <Grid
        container
        style={{ height: "auto", width: "90%", margin: "0px auto" }}>
        <Grid
          item
          xs={12}
          style={{
            margin: "20px auto 0px auto",
            height: "auto",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1.25rem",
            fontWeight: 700,
            lineHeight: "1.57875rem",
          }}>
          Overview
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            height: "auto",
            overflow: "auto",
            margin: "20px auto 0px auto",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: "1.21875rem",
          }}>
          {overview}
        </Grid>
        <Grid
          container
          sx={12}
          style={{
            height: "auto",
            display: "flex",
            justifyContent: "space-evenly",
            margin: "20px auto",
          }}>
          <Paper
            style={{
              height: "145px",
              width: "160px",
              overflow: "hidden",
              backgroundColor: theme.palette.primary.main,
              border: "1px  #000",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}>
            <Paper
              elevation={0}
              style={{
                backgroundColor: theme.palette.primary.main,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}>
              <Typography variant="element3" sx={{ color: "white" }}>
                {rating}
              </Typography>
              <Typography variant="element4" sx={{ color: "white" }}>
                {overallReview}
              </Typography>
              <Typography variant="element5" sx={{ color: "white" }}>
                {numReviews} Reviews
              </Typography>
            </Paper>
          </Paper>
          {locationFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <div>
                <Paper
                  style={{
                    height: "145px",
                    width: "160px",
                    overflow: "hidden",
                    marginLeft: "40px",
                    border: "2px solid",
                    borderColor: theme.palette.primary.main,
                    borderRadius: "12px",
                  }}>
                  <AutoAwesomeIcon
                    style={{
                      fontSize: 40,
                      marginLeft: "10px",
                      marginTop: "10px",
                    }}
                  />
                  <br />
                  <br />
                  <br />
                  <Grid
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      lineHeight: "1.21875rem",
                      marginLeft: "1.25rem",
                      alignItems: "center",
                    }}>
                    {feature}
                  </Grid>
                </Paper>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default OverviewSection;
