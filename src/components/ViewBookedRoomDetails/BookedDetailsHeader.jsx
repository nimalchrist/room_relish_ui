//import React from 'react'
import { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import { Grid, Typography, Box } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { Button, IconButton } from "@mui/material";
import location from "../../assets/icons/Payment-icons/location.svg";
import { Close } from "@mui/icons-material";
import theme from "../../utils/theme/theme";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  EmailIcon,
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import axios from "axios";

const BookedDetailsHeader = () => {
  const commonIconButtonStyle = {
    height: "32px",
    color: theme.palette.primary.main,
    padding: "5px",
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: "0",
    marginRight: "12px",
  };
  // hooks
  const [address, setAddress] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [isDownloaded, setIsDownloaded] = useState(false);

  const qparams = new URLSearchParams(window.location.search);
  const hotelId = qparams.get("hid");
  const roomId = qparams.get("rid");
  const rate = qparams.get("rupees");
  const [open, setOpen] = useState(false);
  const [sharingMessage, setSharingMessage] = useState("");

  // handlers
  const handleDownloadClick = () => {
    const content = document.getElementById("pageContent");
    const originalStyles = content.getAttribute("style");
    content.style.fontSize = "5px";

    content.style.width = "100%";
    content.style.height = "100vh";
    content.style.pageBreakAfter = "always";
    content.style.pageOrientation = "landscape";

    const opt = {
      margin: 10,
      filename: `RoomRelish_Booking_Confirmation${roomId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };
    html2pdf().from(content).set(opt).save();
    content.setAttribute("style", originalStyles);
    setIsDownloaded(true);
  };
  const handleShareClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleShare = async (platform) => {
    const sharingURL = currentURL;
    const sharingText = sharingMessage;
    let message = sharingText ? `${sharingText}\n\n` : "";

    if (navigator.share) {
      try {
        await navigator.share({
          title: sharingText,
          text: " ",
          url: sharingURL,
        });
        setSharingMessage("");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      message +=
        platform === "mail" ? sharingURL : `${sharingText} ${sharingURL}`;

      let subject = "";
      let body = "";
      let encodedMessage = "";

      switch (platform) {
        case "mail":
          subject = "Check out this link";
          body = sharingText ? `${sharingText}\n\n${sharingURL}` : sharingURL;
          window.open(
            `mailto:?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(body)}`
          );
          break;
        case "whatsapp":
          encodedMessage = encodeURIComponent(
            sharingText ? `${sharingText}: ${sharingURL}` : sharingURL
          );
          window.open(
            `https://api.whatsapp.com/send?text=${encodedMessage}`,
            "_blank"
          );
          break;
        case "telegram":
          window.open(
            `https://t.me/share/url?url=${encodeURIComponent(
              sharingURL
            )}&text=${encodeURIComponent(sharingText)}`
          );
          break;
        case "linkedin":
          window.open(
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              sharingURL
            )}&title=${encodeURIComponent(sharingText)}`
          );
          break;
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              sharingURL
            )}&text=${encodeURIComponent(sharingText)}`
          );
          break;
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
              sharingURL
            )}`
          );
          break;
        default:
          break;
      }
    }
  };

  // supportive methods
  const fetchHotelDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3200/hotels/${hotelId}`
      );
      const data = response.data;
      setAddress(data.location.address);
      setHotelName(data.hotelName);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  useEffect(() => {
    fetchHotelDetails();
  }, []);

  useEffect(() => {
    if (isDownloaded) {
      const content = document.getElementById("pageContent");
      content.style.fontSize = null;
    }
  }, [isDownloaded]);

  const currentURL = window.location.href;

  return (
    <Box
      style={{
        padding: "8px",
        margin: "20px auto",
      }}>
      <Box
        style={{
          height: "auto",
          width: "100%",
        }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} sm={12} md={9} container direction="column">
            <Typography
              variant="h1"
              sx={{
                fontSize: "24px",
              }}>
              {hotelName}&nbsp;
            </Typography>
            <Typography
              sx={{
                width: "100%",
                height: "auto",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}>
              <img src={location} alt="location" />
              {address}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} md={3} direction="column">
            <Grid item sx={{ color: "#FF8682", marginBottom: "10px" }}>
              <Typography variant="h4" align="right">
                Rs. {rate}
                <Typography
                  variant="body1"
                  style={{ display: "inline" }}></Typography>
              </Typography>
            </Grid>
            <Grid
              item
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                alignItems: "center",
              }}>
              <Grid item>
                <IconButton
                  sx={commonIconButtonStyle}
                  onClick={handleShareClick}>
                  <ShareIcon />
                </IconButton>

                <Dialog open={open} onClose={handleClose} maxWidth="sm">
                  <DialogTitle>Share</DialogTitle>
                  <DialogContent>
                    <TextField
                      value={sharingMessage}
                      onChange={(e) => setSharingMessage(e.target.value)}
                      style={{ fontSize: 14 }}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClose}>
                              <Close />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        style: {
                          shrink: true,
                        },
                      }}
                    />
                  </DialogContent>
                  <DialogActions
                    style={{ display: "flex", justifyContent: "center" }}>
                    <EmailIcon
                      onClick={() => handleShare("mail")}
                      style={{ width: 40, height: 40, cursor: "pointer" }}
                    />
                    <WhatsappIcon
                      onClick={() => handleShare("whatsapp")}
                      style={{ width: 40, height: 40, cursor: "pointer" }}
                    />
                    <TelegramIcon
                      onClick={() => handleShare("telegram")}
                      style={{ width: 40, height: 40, cursor: "pointer" }}
                    />
                    <LinkedinIcon
                      onClick={() => handleShare("linkedin")}
                      style={{ width: 40, height: 40, cursor: "pointer" }}
                    />
                    <TwitterIcon
                      onClick={() => handleShare("twitter")}
                      style={{ width: 40, height: 40, cursor: "pointer" }}
                    />
                    <FacebookIcon
                      onClick={() => handleShare("facebook")}
                      style={{ width: 40, height: 40, cursor: "pointer" }}
                    />
                  </DialogActions>
                </Dialog>
              </Grid>

              <Grid item>
                {isDownloaded ? (
                  <Button variant="contained" color="secondary" disabled>
                    Downloaded
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      color: "#ffffff",
                      lineHeight: "normal",
                      borderRadius: "4px",
                      padding: "7px",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                      },
                      width: "auto",
                    }}
                    onClick={handleDownloadClick}>
                    Download
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BookedDetailsHeader;
