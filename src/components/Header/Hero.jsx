import React from "react";
import bg from "../../assets/images/bg-stays.jpg";
import { Box, Container, Stack, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <img
        src={bg}
        alt="background"
        style={{
          position: "absolute",
          zIndex: -10,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: -5,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(90deg, rgba(61,104,243, 0.83) 0%, rgba(236,239,255,0.00) 100%)",
          backgroundPosition: "lightgray 0px -211.032px",
          backgroundSize: "100.279% 170.94%",
          backgroundRepeat: "no-repeat",
        }}
      />

      <Container maxWidth="lg">
        <Stack
          sx={{
            position: "relative",
            height: "100vh",
            justifyContent: "center",
          }}
          spacing={2}
          alignItems="left"
          textAlign="left">
          <Typography variant="hero" color="white">
            Make your travel
          </Typography>
          <Typography variant="hero" color="white">
            wishlist, we’ll do
          </Typography>
          <Typography variant="hero" color="white">
            the rest
          </Typography>
          <Typography variant="navbar" color="white">
            Special Offers to suit your plan
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
