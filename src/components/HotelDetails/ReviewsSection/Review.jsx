import React from "react";
import {Box, Typography, Avatar, CircularProgress} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

const Review = ({user, guestRating, comment}) => {

    //   supportive methods
    const getRatingMessage = (rating) => {
        if (rating >= 1 && rating < 2) return "Very Bad";
        if (rating >= 2 && rating < 3) return "Bad";
        if (rating >= 3 && rating < 4) return "Satisfactory";
        if (rating >= 4 && rating < 5) return "Very Good";
        if (rating === 5) return "Amazing";
    };

    const parsedGuestRating = parseFloat(guestRating).toFixed(1);
    const ratingMessage = getRatingMessage(parsedGuestRating);

    if (!user) {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "200px",
                }}
            >
                <CircularProgress/>
            </Box>
        );
    } else {
        return (
            <>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                        maxWidth: 1232,
                    }}
                >
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <Avatar
                            alt={user.userName}
                            src={user.profilePicture}
                            sx={{width: 64, height: 64, mr: 2, ml: 1}}
                        />
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                                <Typography variant="h6">{user.userName} | </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ml: 1, fontWeight: "bold", color: "black"}}
                                >
                                    {parsedGuestRating}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ml: 1, color: "black", fontWeight: "bold"}}
                                >
                                    {ratingMessage}
                                </Typography>
                            </Box>
                            <Typography align="left" variant="body1">
                                {comment}
                            </Typography>
                        </Box>
                    </Box>
                    <VerifiedIcon fontSize="small"/>
                </Box>
            </>
        );
    }
};

export default Review;

