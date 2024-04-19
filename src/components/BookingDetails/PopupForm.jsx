import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import theme from "../../utils/theme/theme";

//validation logic
const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  expirationDate: Yup.string()
    .required("Expiration date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid format (MM/YY)")
    .test("futureDate", "Expired card", function (value) {
      if (!value) return false;
      const today = new Date();
      const currentYear = today.getFullYear() % 100;
      const currentMonth = today.getMonth() + 1;
      const [expMonth, expYear] = value.split("/").map(Number);
      if (expYear < currentYear) {
        return false;
      } else if (expYear === currentYear) {
        return expMonth >= currentMonth;
      } else {
        return true;
      }
    }),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d{3}$/, "Invalid CVV"),
  cardHolder: Yup.string()
    .required("Name on card is required")
    .matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces are allowed"),
});

const PopupForm = ({ open, handleClosePopup, fetchCards }) => {
  const handleCardSubmitButtonClick = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:3200/auth/users/user/cards/saveCard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardHolder: values.cardHolder,
            cardNumber: values.cardNumber,
            expirationDate: values.expirationDate,
            cvv: values.cvv,
          }),
          credentials: "include",
        }
      );

      const responseData = await response.json();
      console.log("Card added successfully:", responseData);
    } catch (error) {
      console.error("Error adding card:", error.message);
    }
    fetchCards();
  };

  return (
    <Dialog open={open} onClose={handleClosePopup} fullWidth maxWidth="sm">
      <DialogContent>
        <Typography variant="n1">
          <strong>Add New Card</strong>
        </Typography>
        <Formik
          initialValues={{
            cardHolder: "",
            cardNumber: "",
            expirationDate: "",
            cvv: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleClosePopup();
            handleCardSubmitButtonClick(values);
            handleClosePopup();
          }}>
          {({ errors, touched, isValid }) => (
            <Form>
              <Field
                as={TextField}
                name="cardNumber"
                label="Card Number"
                fullWidth
                sx={{ mb: 2, mt: 3 }}
                error={touched.cardNumber && Boolean(errors.cardNumber)}
                helperText={touched.cardNumber && errors.cardNumber}
              />
              <Field
                as={TextField}
                name="expirationDate"
                label="Expiry Date (MM/YY)"
                fullWidth
                sx={{ width: "250px", mb: 2 }}
                error={touched.expirationDate && Boolean(errors.expirationDate)}
                helperText={touched.expirationDate && errors.expirationDate}
              />
              <Field
                as={TextField}
                name="cvv"
                label="CVV"
                fullWidth
                sx={{ width: "250px", mb: 2, ml: 6 }}
                error={touched.cvv && Boolean(errors.cvv)}
                helperText={touched.cvv && errors.cvv}
                type="password"
              />
              <Field
                as={TextField}
                name="cardHolder"
                label="Card Holder"
                fullWidth
                sx={{ mb: 2 }}
                error={touched.cardHolder && Boolean(errors.cardHolder)}
                helperText={touched.cardHolder && errors.cardHolder}
              />
              <Button
                variant="contained"
                style={{
                  bgcolor: theme.palette.primary.main,
                  marginTop: "15px",
                  marginBottom: "25px",
                }}
                fullWidth
                type="submit"
                disabled={!isValid}
                onClick={handleCardSubmitButtonClick}>
                Add Card
              </Button>
              <Typography variant="d" lineHeight="1">
                By confirming your subscription, you allow Room Relish Limited
                to charge your card for this payment and future payments in
                accordance with their terms. You can always cancel your
                subscription.
              </Typography>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
export default PopupForm;
