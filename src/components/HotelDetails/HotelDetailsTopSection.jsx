import React from "react";
import { useState, useEffect } from "react";
import StaticBreadCrumbs from "./TopSection/StaticBreadCrumbs";
import HotelDetailHeader from "./TopSection/HotelDetailHeader";
import HotelImagesContainer from "./TopSection/HotelImagesContainer";
import { Box } from "@mui/material";
import axios from "axios";

const HotelDetailsTopSection = () => {
  const [hotelData, setHotelData] = useState(null);
  const [hotelId, setHotelId] = useState("");

  const fetchHotelData = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      setHotelId(params.get("q"));

      const url = `http://localhost:3200/hotels/${params.get("q")}`;
      const response = await axios.get(url);

      const data = await response.data;
      setHotelData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "20vh auto 10px auto",
        }}>
        <StaticBreadCrumbs data={hotelData} />
      </Box>
      <HotelDetailHeader data={hotelData} />
      <HotelImagesContainer data={hotelData} id={hotelId} />
    </div>
  );
};

export default HotelDetailsTopSection;
