import React, {useEffect} from "react";
import OverviewSection from "../components/HotelDetails/OverviewSection";
import {Box} from "@mui/material";
import RoomsSection from "../components/HotelDetails/RoomsSection";
import FullReview from "../components/HotelDetails/FullReview.jsx";
import HotelDetailsTopSection from "../components/HotelDetails/HotelDetailsTopSection";

const HotelDetails = () => {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    }, []);
    return (
        <Box
            sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <HotelDetailsTopSection/>
            <hr
                style={{
                    width: "90%",
                    marginTop: "11vh",
                    border: "0.1px solid #ccc",
                }}
            />
            <OverviewSection/>
            <hr
                style={{
                    width: "90.1vw",
                    marginTop: "11vh",
                    border: "0.1px solid #ccc",
                }}
            />
            <RoomsSection/>
            <hr
                style={{
                    width: "90.1vw",
                    marginTop: "11vh",
                    border: "0.1px solid #ccc",
                }}
            />
            <FullReview/>
        </Box>
    );
};

export default HotelDetails;
