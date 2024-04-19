import { Card, Grid, Container, Box } from "@mui/material";
import React from "react";
import ImageContainer from "./ImageContainer";
import FavouriteAndViewHotelButton from "./FavouriteAndViewHotelButton";
import ContentContainer from "./ContentContainer";

function MainCardsContainer({ listOfHotels, showAllHotels, In, Out, rooms }) {
  return (
    <>
      <Container sx={{ overflowY: "auto" }}>
        {showAllHotels
          ? listOfHotels.map((hotel) => (
              <Card
                key={hotel._id}
                sx={{
                  width: "100%",
                  height: "320px",
                  elevation: 4,
                  marginBottom: "50px",
                  borderRadius: "12px",
                  margin: "55px auto",
                  display: "flex",
                }}>
                <ImageContainer imageUrl={hotel.images[0]} />
                <Box sx={{ flexBasis: "58%" }}>
                  <Grid item xs={12}>
                    <ContentContainer hotel={hotel} />
                  </Grid>
                  <Grid item xs={12}>
                    <FavouriteAndViewHotelButton
                      hotelId={hotel._id}
                      In={In}
                      Out={Out}
                      rooms={rooms}
                    />
                  </Grid>
                </Box>
              </Card>
            ))
          : listOfHotels
              .slice(0, Math.min(4, listOfHotels.length))
              .map((hotel) => (
                <Card
                  key={hotel._id}
                  sx={{
                    width: "100%",
                    height: "320px",
                    elevation: 4,
                    marginBottom: "50px",
                    borderRadius: "12px",
                    margin: "55px auto",
                    display: "flex",
                  }}>
                  <ImageContainer imageUrl={hotel.images[0]} />
                  <Box sx={{ flexBasis: "58%" }}>
                    <Grid item xs={12}>
                      <ContentContainer hotel={hotel} />
                    </Grid>
                    <Grid item xs={12}>
                      <FavouriteAndViewHotelButton
                        hotelId={hotel._id}
                        In={In}
                        Out={Out}
                        rooms={rooms}
                      />
                    </Grid>
                  </Box>
                </Card>
              ))}
      </Container>
    </>
  );
}
export default MainCardsContainer;
