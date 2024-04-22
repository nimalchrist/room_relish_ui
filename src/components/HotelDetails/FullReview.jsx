import React, { useState, useEffect, useCallback } from "react";
import { Container, Typography, Box, Snackbar, Alert } from "@mui/material";
import ListOfReviewsContainer from "./ReviewsSection/ListOfReviewsContainer.jsx";

function FullReview() {
  const params = new URLSearchParams(window.location.search);
  const hotelId = params.get("q");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState("");
  const [ratingMessage, setRatingMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // supportive methods
  function calculateAverageRating() {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce(
      (sum, review) => sum + parseFloat(review.guestRating),
      0
    );
    return (totalRating / reviews.length).toFixed(1);
  }
  function getRatingMessage(rating) {
    if (rating >= 1 && rating < 2) return "Very Bad";
    if (rating >= 2 && rating < 3) return "Bad";
    if (rating >= 3 && rating < 4) return "Satisfactory";
    if (rating >= 4 && rating < 5) return "Very Good";
    if (rating === 5) return "Amazing";
    return "N/A";
  }
  const fetchReviewsData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3200/hotels/${hotelId}/guest-reviews`
      );
      if (!response.ok) {
        setErrorMessage("Failed to fetch reviews data");
        setSnackbarOpen(true);
        return;
      }
      const data = await response.json();
      if (JSON.stringify(data) !== JSON.stringify(reviews)) {
        setReviews(data);
      }
    } catch (error) {
      setErrorMessage(error);
      setSnackbarOpen(true);
      console.error("Error occurred while fetching reviews data:", error);
    }
  };

  // handlers
  const handleReviewSubmit = async (newReview) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3200/hotels/${hotelId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
          credentials: "include",
        }
      );
      const addedReview = await response.json();
      console.log(addedReview);
      if (!response.ok) {
        handleReviewSubmitError(addedReview.message);
        return;
      }
      handleReviewSubmitSuccess(addedReview);
    } catch (error) {
      handleReviewSubmitError(
        error.message || "Failed to add review. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleReviewSubmitSuccess = (addedReview) => {
    setReviews((prevReviews) => [...prevReviews, addedReview]);
  };
  const handleReviewSubmitError = (message) => {
    setErrorMessage(message);
    setSnackbarOpen(true);
  };

  // useEffectHooks
  useEffect(() => {
    fetchReviewsData();
  }, [reviews]);

  useEffect(() => {
    setAverageRating(calculateAverageRating());
    const updatedRatingMessage = getRatingMessage(calculateAverageRating());
    setRatingMessage(updatedRatingMessage);
  }, [reviews]);
  return (
    <>
      <Container
        variant="outlined"
        style={{
          width: "90%",
          margin: "60px auto",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}>
          <Typography variant="h4" gutterBottom>
            Reviews
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h2"
              component="span"
              style={{ fontWeight: "bold" }}>
              {averageRating}
            </Typography>
            <Typography
              variant="h5"
              component="span"
              style={{ marginLeft: "4px", fontWeight: "bold" }}>
              {ratingMessage}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <Typography variant="h6" component="span">
              {reviews.length} verified reviews
            </Typography>
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            width: "100%",
            height: "0.5px",
            backgroundColor: "#112211",
            opacity: 0.25,
            my: "8px",
          }}
        />
        <ListOfReviewsContainer
          reviews={reviews}
          handleReviewSubmit={handleReviewSubmit}
          loading={loading}
        />
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}>
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default FullReview;
