import React, { useEffect } from "react";
import { Box } from "@mui/material";
import BookedDetailsHeader from "../components/ViewBookedRoomDetails/BookedDetailsHeader";
import BookedDetailsCard from "../components/ViewBookedRoomDetails/BookedDetailsCard";
import TermsAndConditions from "../components/ViewBookedRoomDetails/TermsAndConditions";
import { useNavigate } from "react-router-dom";

const ViewBookedRoomDetailsPage = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/");
  };
  // supportive method
  const checkLoginStatus = async () => {
    try {
      const response = await fetch(
        "http://localhost:3200/auth/users/user/islogined",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (!responseData.success) {
          navigate("/not_authorised_to_view_this_page");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(() => {
    console.log("I am called");
    checkLoginStatus();

    window.addEventListener("popstate", handleBackButton);
    return () => {
      console.log("I am called d");
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div id="pageContent">
      <Box sx={{ width: "80%", margin: "100px auto" }}>
        <BookedDetailsHeader />
        <BookedDetailsCard />
        <TermsAndConditions />
      </Box>
    </div>
  );
};

export default ViewBookedRoomDetailsPage;
