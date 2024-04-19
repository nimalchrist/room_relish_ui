/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import {
    TextField,
    Typography,
    Button,
    Box,
    Grid,
    CircularProgress,
} from "@mui/material";
import theme from "../../../utils/theme/theme.jsx";

const ReviewForm = ({onReviewSubmit, loading}) => {
    // useState hooks
    const [guestRating, setGuestRating] = useState(0);
    const [comment, setComment] = useState("");

    // handlers
    const handleSubmit = (event) => {
        event.preventDefault();
        const newReview = {
            guestRating,
            comment,
        };
        onReviewSubmit(newReview);
        setGuestRating(0);
        setComment("");
    };

    return (
        <Box sx={{maxWidth: 400, mx: "auto"}}>
            <Typography variant="h6" gutterBottom>
                Write a Review
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="number"
                    label="Rating (1-5)"
                    value={guestRating}
                    onChange={(e) => {
                        let value = parseFloat(e.target.value);
                        if (value < 1) {
                            value = 1;
                        } else if (value > 5) {
                            value = 5;
                        }
                        setGuestRating(value);
                    }}
                    fullWidth
                    required
                    inputProps={{
                        min: 1,
                        max: 5,
                        step: 0.1,
                    }}
                    sx={{
                        my: 2,
                    }}
                />
                <TextField
                    label="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    multiline
                    required
                />
                <Grid container justifyContent="center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{mt: 2, background: theme.palette.primary.main}}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                Submit Review{" "}
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        verticalAlign: "middle",
                                        ml: 1,
                                        color: "white",
                                        width: "1.5rem",
                                    }}
                                />
                            </>
                        ) : (
                            "Submit Review"
                        )}
                    </Button>
                </Grid>
            </form>
        </Box>
    );
};

export default ReviewForm;