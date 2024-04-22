import { Box, Typography, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function TermsAndConditions() {
  return (
    <>
      <Container variant="outlined" style={{ maxWidth: 1232, marginTop: 64 }}>
        <Box>
          <Typography variant="h4" style={{ marginBottom: 34 }}>
            Terms and Conditions
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flexstart",
            alignself: "stretch",
          }}>
          <Typography variant="h6" style={{ marginBottom: 16 }}>
            <b>Payments</b>
          </Typography>
        </Box>
        <Box sx={{ alignSelf: "stretch" }}>
          <ul style={{ marginLeft: 30, textAlign: "justify" }}>
            <li>
              <Typography variant="body2">
                If you are purchasing your ticket using a debit or credit card
                via the Website, we will process these payments via the
                automated secure common payment gateway which will be subject to
                fraud screening purposes. <br />
                <br />
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                If you do not supply the correct card billing address and/or
                cardholder information, your booking will not be confirmed and
                the overall cost may increase. We reserve the right to cancel
                your booking if payment is declined for any reason or if you
                have supplied incorrect card information. If we become aware of,
                or is notified of, any fraud or illegal activity associated with
                the payment for the booking, the booking will be cancelled and
                you will be liable for all costs and expenses arising from such
                cancellation, without prejudice to any action that may be taken
                against us. <br />
                <br />
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                RoomRelish may require the card holder to provide additional
                payment verification upon request by either submitting an online
                form or visiting the nearest Golobe office, or at the airport at
                the time of check-in. Golobe reserves the right to deny boarding
                or to collect a guarantee payment (in cash or from another
                credit card) if the card originally used for the purchase cannot
                be presented by the cardholder at check-in or when collecting
                the tickets, or in the case the original payment has been
                withheld or disputed by the card issuing bank. Credit card
                details are held in a secured environment and transferred
                through an internationally accepted system.
              </Typography>
            </li>
          </ul>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flexstart",
            alignself: "stretch",
          }}>
          <Typography variant="h6" style={{ marginBottom: 16, marginTop: 34 }}>
            <b>Contact Us</b>
          </Typography>
        </Box>
        <Box alignSelf="stretch" style={{ marginBottom: "3rem" }}>
          <Typography variant="body2">
            If you have any questions about our Website or our Terms of Use,
            please contact:
            <br />
            Room Relish Q.C.S.C
            <br />
            Room Relish Tower
            <br />
            Chennai One IT SEZ
            <br />
            Chennai, Tamil Nadu, India
            <br />
            Further contact details can be found at{" "}
            <Link to="/" style={{ color: "black" }}>
              roomrelish.com/help
            </Link>
            <br />
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default TermsAndConditions;
