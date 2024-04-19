import React from "react";
import { useState, useEffect } from "react";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const InteriorImages = () => {
  const [lefttop, setLefttop] = useState(null);
  const [righttop, setRighttop] = useState([]);
  const [leftbot, setLeftbot] = useState([]);
  const [rightbot, setRightbot] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const hotelId = params.get("q");
      const url = `http://localhost:3200/hotels/${hotelId}`;
      const response = await axios.get(url);
      const data = response.data;

      const images = data.images;
      setLefttop(images[0]);
      setRighttop(images.slice(1, 5));
      setLeftbot(images.slice(5, 9));
      setRightbot(images[9]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "12vh",
        }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: "fixed",
            top: "17vh",
            left: "2vw",
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            "&:hover": { backgroundColor: "white", transform: "scale(1.1)" },
          }}>
          <ArrowBackIcon />
        </IconButton>
        <Grid
          container
          spacing={0.5}
          sx={{ height: "100vh", width: "85vw", marginBottom: "1vh" }}>
          <Grid item xs={6} sx={{ height: "100%", overflow: "hidden" }}>
            <img
              src={lefttop}
              style={{
                width: "100%",
                height: "100%",
                margin: 0,
                padding: 0,
                marginLeft: "-3px",
                marginRight: "-4px",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={0.5} sx={{ height: "100vh" }}>
              {righttop.map((image, index) => (
                <Grid
                  key={index}
                  item
                  xs={6}
                  sx={{ width: "50%", height: "50%" }}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0.5}
          sx={{
            height: "100vh",
            width: "85vw",
            alignItems: "stretch",
            justifyContent: "flex-start",
            marginBottom: "20vh",
          }}>
          <Grid item xs={6}>
            <Grid
              container
              spacing={0.5}
              sx={{
                height: "100vh",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "stretch",
              }}>
              {leftbot.map((image, index) => (
                <Grid
                  key={index}
                  item
                  xs={6}
                  sx={{ width: "50%", height: "50%", position: "relative" }}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      flexShrink: 0,
                      margin: 0,
                      padding: 0,
                      marginLeft: "-3px",
                      marginRight: "-4px",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{ height: "100%", overflow: "hidden" }}>
            <img src={rightbot} style={{ width: "100%", height: "100%" }} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default InteriorImages;
