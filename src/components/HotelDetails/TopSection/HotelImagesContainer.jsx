import React from "react";
import { Grid, Button } from "@mui/material";
import { useState, useEffect } from "react";
import theme from "../../../utils/theme/theme";
import { useNavigate } from "react-router-dom";

const HotelImagesContainer = ({ data, id }) => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [otherImages, setOtherImages] = useState([]);

  useEffect(() => {
    if (data) {
      const images = data.images;
      setMainImage(images[0]);
      setOtherImages(images.slice(1, 5));
    }
  }, [data]);

  const handleImages = () => {
    const queryString = `?q=${encodeURIComponent(id)}`;
    navigate(`/interior-images${queryString}`);
  };

  return (
    <div>
      <Grid
        container
        spacing={0.5}
        sx={{
          height: "100vh",
          marginTop: "2vh",
          margin: "1px auto",
          width: "90%",
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}>
        <Grid item xs={6} sx={{ height: "100%", overflow: "hidden" }}>
          <img
            src={mainImage}
            alt="Main"
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
          <Grid
            container
            spacing={0.5}
            sx={{
              height: "100vh",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "stretch",
            }}>
            {otherImages.map((image, index) => (
              <Grid
                key={index}
                item
                xs={6}
                sx={{ width: "50%", height: "50%", position: "relative" }}>
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100%", height: "100%" }}
                />
                {index === otherImages.length - 1 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleImages}
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      backgroundColor: theme.palette.primary.main,
                      right: "16px",
                      borderRadius: "4px",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                      },
                    }}>
                    View all photos
                  </Button>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default HotelImagesContainer;
