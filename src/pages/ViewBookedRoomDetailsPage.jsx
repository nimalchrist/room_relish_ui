import React, { useEffect } from "react";
import { Box } from "@mui/material";
import BookedDetailsHeader from "../components/ViewBookedRoomDetails/BookedDetailsHeader";
import BookedDetailsCard from "../components/ViewBookedRoomDetails/BookedDetailsCard";
import Terms from "../components/ViewBookedRoomDetails/Terms";

const ViewBookedRoomDetailsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div id="pageContent">
      <Box sx={{ width: "80%", margin: "100px auto" }}>
        <BookedDetailsHeader />
        <BookedDetailsCard />
        <Terms />
      </Box>
    </div>
  );
};

export default ViewBookedRoomDetailsPage;
