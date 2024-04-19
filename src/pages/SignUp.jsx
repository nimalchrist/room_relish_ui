import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import theme from "../utils/theme/theme";

export default function SignInSide() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleRegistrationSuccess = (message) => {
    setSnackbarSeverity("success");
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    navigate("/login");
  };

  const handleRegistrationFailure = (message) => {
    setSnackbarSeverity("error");
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const phoneNumber = data.get("phone");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    // Basic validation checks
    if (!firstName.trim()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Firstname is required");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }

    if (!lastName.trim()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Lastname is required");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Email address is required");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please enter a valid Email Address.");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Phone number must be 10 digits");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Password is required");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Passwords do not match");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }
    const apiUrl = "http://localhost:3200/auth/register";
    const requestData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    };
    try {
      const response = await axios.post(apiUrl, requestData);
      handleRegistrationSuccess(response.data.message);
    } catch (error) {
      console.error("API error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        handleRegistrationFailure(
          "Registration failed: " + error.response.data.message
        );
      } else {
        handleRegistrationFailure(
          "Registration failed. Please check your credentials."
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box sx={{ height: "auto" }}>
        <Grid container component="main" height="auto">
          <CssBaseline />
          <Grid
            item
            xs={6}
            sx={{
              margin: "0px auto",
            }}
            component={Paper}
            elevation={1}
            square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                padding: "5px",
              }}>
              <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                Sign up
              </Typography>

              <Typography sx={{ mb: 2 }}>
                Let's get you all set up so that you can access your own account
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}>
                <Grid container spacing={1.4}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      InputLabelProps={{ style: { color: "black" } }}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      InputLabelProps={{ style: { color: "black" } }}
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      InputLabelProps={{ style: { color: "black" } }}
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      InputLabelProps={{ style: { color: "black" } }}
                      autoComplete="phone"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      InputLabelProps={{ style: { color: "black" } }}
                      id="password"
                      autoComplete="new-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handlePasswordVisibility}>
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      InputLabelProps={{ style: { color: "black" } }}
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      autoComplete="new-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleConfirmPasswordVisibility}>
                              {showConfirmPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: theme.palette.primary.main }}
                  disabled={loading}>
                  {!loading ? "Signup" : <CircularProgress size={26} />}
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    Already have an account?{" "}
                    <Link to="/login" variant="body2">
                      Login
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
