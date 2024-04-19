import { Typography, Box } from "@mui/material";
import React from "react";

import { useState, useEffect } from "react";
const RecentSearch = () => {
  // hooks
  const [recentVisits, setRecentVisits] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  // static data when the user is not logged in
  const popularList = [
    {
      id: 1,
      Hotel: "Taj Club House",
      location: "Chennai",
      imgUrl:
        " https://content3.jdmagicbox.com/comp/chennai/v3/044p1230715671n6w3v3/catalogue/taj-club-house-mount-road-chennai-5-star-hotels-3qitv8p.jpg",
    },
    {
      id: 2,
      Hotel: "Abad Green Forest",
      location: "Thekkady",
      imgUrl:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/fd/c1/aa/abad-green-forest-resort.jpg?w=700&h=-1&s=1",
    },
    {
      id: 3,
      Hotel: "Hotel President",
      location: "Madurai",
      imgUrl:
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/flyfish/raw/NH7321443869726/QS1042/QS1042-Q1/IMG_20191222_215135.jpg",
    },
  ];

  // suppportive methods
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

        if (responseData.success) {
          setLoggedIn(true);
          console.log("User is logged in.");
        } else {
          setLoggedIn(false);
          console.log("User is not logged in.");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  const fetchData = async () => {
    try {
      const url = "http://localhost:3200/auth/users/recent";
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      console.log("recent data", data);
      setRecentVisits(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // use effect hooks
  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      fetchData();
    }
  }, [loggedIn]);

  return (
    <Box sx={{ width: "80%", margin: "80px auto" }}>
      <Box>
        <Typography variant="h4n" component="h6">
          {recentVisits.length > 0 ? "Your Recent Searches" : "Popular Hotels"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}>
        {recentVisits.length > 0
          ? recentVisits.slice(0, 4).map((recent, index) => (
              <Box
                sx={{
                  flexBasis: "30%",
                  display: "flex",
                  m: 2,
                  p: 1,
                  "@media (max-width: 600px)": {
                    flexBasis: "100%",
                  },
                }}>
                <Box width="35%">
                  <img
                    src={recent.images[0]}
                    alt={recent.hotelName}
                    width="90%"
                    height="100%"
                    style={{ objectFit: "cover", borderRadius: "16px" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 500,
                      maxWidth: "150px",
                      whiteSpace: "normal",
                    }}>
                    {recent.hotelName}
                  </Typography>
                  <Typography variant="body2">
                    {recent.location["cityName"]}
                  </Typography>
                </Box>
              </Box>
            ))
          : popularList.map((popular, index) => (
              <Box
                sx={{
                  flexBasis: "30%",
                  display: "flex",
                  m: 2,
                  p: 1,
                  "@media (max-width: 600px)": {
                    flexBasis: "100%",
                  },
                }}>
                <Box width="35%">
                  <img
                    src={popular.imgUrl}
                    alt={popular.location}
                    width="90%"
                    height="100%"
                    style={{ objectFit: "cover", borderRadius: "16px" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 500,
                      maxWidth: "150px",
                      whiteSpace: "normal",
                    }}>
                    {popular.Hotel}
                  </Typography>
                  <Typography variant="body2">{popular.location}</Typography>
                </Box>
              </Box>
            ))}
      </Box>
    </Box>
  );
};

export default RecentSearch;
