import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import img from "../../assets/icons/footer-icons/image.svg";

function Footer() {
  // suppportive methods
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const currentDate = new Date();

  const checkInDate = new Date(currentDate);
  checkInDate.setDate(currentDate.getDate() + 1);

  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkInDate.getDate() + 2);

  const formattedCheckIn = formatDate(checkInDate);
  const formattedCheckOut = formatDate(checkOutDate);

  const tirunelveli = `http://localhost:5173/hotel-list?q=Tirunelveli&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&rooms=1`;
  const chennai = `http://localhost:5173/hotel-list?q=Chennai&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&rooms=1`;
  const cochin = `http://localhost:5173/hotel-list?q=Cochin&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&rooms=1`;
  const bangalore = `http://localhost:5173/hotel-list?q=Bangalore&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&rooms=1`;

  return (
    <footer
      style={{
        backgroundColor: "#3d68f3",
        padding: "20px 0px",
        height: "auto",
        width: "100%",
      }}>
      <Grid
        container
        xs={12}
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0px auto",
          width: "80%",
        }}>
        <Grid lg={6} md={6} xs={12} item style={{ margin: "50px auto" }}>
          <Box
            style={{
              width: "100%",
              textAlign: "left",
            }}>
            <Typography variant="foot">Visit Places</Typography>
          </Box>

          <ul
            style={{
              listStyleType: "none",
              margin: "10px auto",
              textAlign: "left",
            }}>
            <li style={{ margin: "20px" }}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to={tirunelveli}>
                Tirunelveli
              </Link>
            </li>
            <li style={{ margin: "20px" }}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to={chennai}>
                Chennai
              </Link>
            </li>
            <li style={{ margin: "20px" }}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to={cochin}>
                Cochin
              </Link>
            </li>
            <li style={{ margin: "20px" }}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to={bangalore}>
                Bangalore
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid lg={4} md={4} xs={12} item>
          <img src={img} style={{ margin: "0px auto" }} />
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
