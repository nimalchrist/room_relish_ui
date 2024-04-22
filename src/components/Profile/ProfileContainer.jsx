import React, { useState, useRef, useEffect } from "react";
import { Typography, Paper, Grid, Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Edit from "../../assets/icons/profilepage-icons/Edit.svg";
import pen from "../../assets/icons/profilepage-icons/Pen.svg";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import profile from "../../assets/images/profile-images/Profile.png";
import cover from "../../assets/images/profile-images/CoverPicture.png";
import { useNavigate } from "react-router-dom";

const ProfileContainer = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(profile);
  const [coverImage, setCoverImage] = useState(cover);
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const profileInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isPhoneNumberEditing, setIsPhoneNumberEditing] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [isDateOfBirthEditing, setIsDateOfBirthEditing] = useState(false);

  const [originalName, setOriginalName] = useState(userName);
  const [originalEmail, setOriginalEmail] = useState(email);
  const [originalPhoneNumber, setOriginalPhoneNumber] = useState(phoneNumber);
  const [originalAddress, setOriginalAddress] = useState(address);
  const [originalDateOfBirth, setOriginalDateOfBirth] = useState(dateOfBirth);
  const [selectedImageType, setSelectedImageType] = useState(null);

  const StyledTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#1C1B1F",
    },
    "& .MuiFormLabel-root": {
      fontSize: "19px",
      fontFamily: "Montserrat, sans-serif",
      color: "#1C1B1F",
    },

    width: "220px",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "gray",
      },
    },
  });

  // handlers
  const handleError = (error) => {
    setSnackbarOpen(true);
    setSnackbarSeverity("error");
    setSnackbarMessage(error);
  };
  const handleSuccess = (message) => {
    setSnackbarOpen(true);
    setSnackbarSeverity("success");
    setSnackbarMessage(message);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleCancel = () => {
    setName(originalName);
    setEmail(originalEmail);
    setPhoneNumber(originalPhoneNumber);
    setAddress(originalAddress);
    setDateOfBirth(originalDateOfBirth);
    setIsNameEditing(false);
    setIsPhoneNumberEditing(false);
    setIsAddressEditing(false);
    setIsDateOfBirthEditing(false);
  };
  const handleImageChange = async (e, imageType) => {
    setSelectedImageType(imageType);
    const file = e.target.files[0];

    if (file && isJpgFile(file)) {
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("type", imageType);
      try {
        const response = await axios.post(
          "http://localhost:3200/auth/users/user/profile/upload",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Image upload response:", response.data.message);
        const reader = new FileReader();
        reader.onloadend = () => {
          if (imageType === "profile") {
            setProfileImage(reader.result);
          } else if (imageType === "cover") {
            setCoverImage(reader.result);
          }
        };
        reader.readAsDataURL(file);
        handleSuccess(response.data.message);
      } catch (error) {
        console.error("Image upload error:", error);
        handleError(error.response.data.message);
      }
    } else {
      handleError("Please select a JPG image file");
    }
  };
  const handleSave = async (event) => {
    event.preventDefault();
    if (isNameEditing && userName.length <= 0) {
      handleError("Username can't be empty");
      setName(originalName);
      setIsNameEditing(false);
      return false;
    }
    if (isPhoneNumberEditing && !/^[0-9]{10}$/.test(phoneNumber)) {
      handleError("Phone number is not valid");
      setPhoneNumber(originalPhoneNumber);
      setIsPhoneNumberEditing(false);
      return false;
    }
    if (isAddressEditing && address === null) {
      handleError("Address can't be empty");
      setAddress(originalAddress);
      setIsAddressEditing(false);
      return false;
    }
    if (isDateOfBirthEditing && !isValidDate(dateOfBirth)) {
      handleError("date of birth is not valid");
      setDateOfBirth(originalDateOfBirth);
      setIsDateOfBirthEditing(false);
      return false;
    }

    setName(userName);
    setPhoneNumber(phoneNumber);
    setDateOfBirth(dateOfBirth);
    setAddress(address);

    const apiUrl = "http://localhost:3200/auth/users/user/profile/update";
    const requestData = {
      userName: userName,
      phoneNumber: phoneNumber,
      address: address,
      dateOfBirth: dateOfBirth,
    };
    try {
      const response = await axios.post(apiUrl, requestData, {
        withCredentials: true,
      });
      handleSuccess(response.data.message);
      setIsNameEditing(false);
      setIsPhoneNumberEditing(false);
      setIsAddressEditing(false);
      setIsDateOfBirthEditing(false);
      await fetchUserData();
      await fetchProfileImage();
      await fetchCoverImage();
      console.log("API response:", response.data);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        handleError(error.response.data.message);
        console.error("API error:", error);
      }
    }
  };
  const handleCoverImageReset = () => {
    coverImageInputRef.current.value = null;
    coverImageInputRef.current.click();
  };

  // supportive methods
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
        if (!responseData.success) {
          navigate("/*");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3200/auth/users/user/profile",
        { withCredentials: true }
      );

      const userData = response.data;
      setName(userData.userName);
      setEmail(userData.email);
      setPhoneNumber(userData.phoneNumber);
      setAddress(userData.address);
      if (userData.dateOfBirth != null) {
        const parsedDate = new Date(userData.dateOfBirth);
        const formattedDate = parsedDate.toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        setDateOfBirth(formattedDate);
        setOriginalDateOfBirth(formattedDate);
      } else {
        setDateOfBirth("");
        setOriginalDateOfBirth("");
      }

      setOriginalName(userData.userName);
      setOriginalEmail(userData.email);
      setOriginalPhoneNumber(userData.phoneNumber);
      setOriginalAddress(userData.address);
    } catch (error) {
      console.error("API error:", error);
      handleError(error);
    }
  };

  const fetchProfileImage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3200/auth/users/user/profile/getpicture",
        { type: "profile" },
        { withCredentials: true }
      );
      const imageUrl = response.data.picture;
      if (imageUrl != null) {
        setProfileImage(imageUrl);
      }
    } catch (error) {
      console.error("Fetch profile image error:", error);
      handleError(error);
    }
  };
  const fetchCoverImage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3200/auth/users/user/profile/getpicture",
        { type: "cover" },
        { withCredentials: true }
      );

      const imageUrl = response.data.picture;
      if (imageUrl != null) {
        setCoverImage(imageUrl);
      }
    } catch (error) {
      console.error("Fetch cover image error:", error);
      handleError(error);
    }
  };
  const isJpgFile = (file) => {
    return file.type === "image/jpeg";
  };
  const isValidDate = (dateString) => {
    const currentDate = new Date();
    const enteredDate = new Date(dateString);
    return enteredDate < currentDate;
  };

  useEffect(() => {
    checkLoginStatus()
      .then(fetchUserData)
      .then(fetchCoverImage)
      .then(fetchProfileImage)
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <form onSubmit={handleSave}>
        <Box style={{ width: "100%" }}>
          <Box
            margin="70px auto"
            sx={{
              width: "90%",
              height: "auto",
              position: "relative",
            }}>
            <div
              style={{
                position: "relative",
                height: "50vh",
                margin: "auto",
              }}>
              <img
                src={coverImage}
                alt="cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <input
                ref={coverImageInputRef}
                id="cover-image-input"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleImageChange(e, "cover")}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "-97px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "180px",
                  height: "180px",
                  padding: "5px",
                }}>
                <img
                  src={profileImage}
                  alt="profile"
                  style={{
                    width: "90%",
                    height: "90%",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                    borderRadius: "50%",
                    overflow: "hidden",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "9px",
                    left: "70%",
                    transform: "translateX(-50%)",
                    cursor: "pointer",
                    zIndex: 1,
                  }}
                  onClick={(e) => handleImageChange(e, "profile")}>
                  <Button onClick={() => profileInputRef.current?.click()}>
                    <div
                      style={{
                        borderRadius: "50%",
                        backgroundColor: "#FF8682",
                        padding: "8px", //pen in middle of the round
                        height: "35px",
                        width: "35px",
                        marginLeft: "15px",
                        marginBottom: "0px",
                      }}>
                      <img src={pen} alt="Pen" style={{ width: "20px" }} />
                    </div>
                  </Button>
                </div>
              </div>
              <input
                ref={profileInputRef}
                id="profile-image"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => handleImageChange(e, "profile")}
              />

              <Button
                variant="contained"
                onClick={() => handleCoverImageReset()}
                style={{
                  position: "absolute",
                  bottom: "30px",
                  right: "30px",
                  zIndex: 1,
                  color: "black",
                }}>
                <CloudUploadIcon />
                Upload new cover
              </Button>
            </div>
            <Box sx={{ marginTop: "80px" }}>
              <div style={{ textAlign: "center", paddingTop: "20px" }}>
                <Typography variant="p4">{userName}</Typography>
                <Box sx={{ margin: "10px auto" }}></Box>
                <Typography variant="p2">{email}</Typography>
              </div>
            </Box>
          </Box>
          <Box
            sx={{
              margin: "160px auto",
              height: "auto",
              width: "90%",
            }}>
            <Typography variant="p3">Account</Typography> <br />
            <Paper elevation={2} sx={{ padding: 4, width: "100%", margin: 2 }}>
              <Grid container direction="column" spacing={4}>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  alignItems="center">
                  <Grid item>
                    <Typography variant="p2">Name:</Typography>
                    <br />
                    {isNameEditing ? (
                      <TextField
                        id="userName"
                        lable="userName"
                        name="userName"
                        value={userName}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      <Typography variant="p1">{userName}</Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={() => setIsNameEditing(true)}>
                      <Typography variant="p2">
                        <img src={Edit} />
                        Change
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  alignItems="center">
                  <Grid item>
                    <Typography variant="p2">Email:</Typography>
                    <br />
                    <Typography variant="p1">{email}</Typography>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  alignItems="center">
                  <Grid item>
                    <Typography variant="p2">Password:</Typography>
                    <br />
                    <Typography variant="p1">{"*".repeat(8)}</Typography>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  alignItems="center">
                  <Grid item>
                    <Typography variant="p2">Phone Number:</Typography>
                    <br />

                    {isPhoneNumberEditing ? (
                      <TextField
                        id="phoneNumber"
                        lable="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    ) : (
                      <Typography variant="p1">{phoneNumber}</Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={() => setIsPhoneNumberEditing(true)}>
                      <Typography variant="p2">
                        <img src={Edit} />
                        Change
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  alignItems="center">
                  <Grid item>
                    <Typography variant="p2">Address:</Typography>
                    <br />
                    {isAddressEditing ? (
                      <TextField
                        id="address"
                        lable="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    ) : (
                      <Typography variant="p1">{address}</Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={() => setIsAddressEditing(true)}>
                      <Typography variant="p2">
                        <img src={Edit} />
                        Change
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="space-between"
                  alignItems="center">
                  <Grid item>
                    <Typography variant="p2">Date of Birth:</Typography>
                    <br />
                    {isDateOfBirthEditing ? (
                      <StyledTextField
                        type="date"
                        variant="outlined"
                        id="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) =>
                          setDateOfBirth(e.target.value)
                        }></StyledTextField>
                    ) : (
                      <Typography variant="p1">{dateOfBirth}</Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={() => setIsDateOfBirthEditing(true)}>
                      <Typography variant="p2">
                        <img src={Edit} />
                        Change
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}>
                {isNameEditing ||
                isPhoneNumberEditing ||
                isAddressEditing ||
                isDateOfBirthEditing ? (
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleCancel}
                      sx={{ mr: 2 }}>
                      <Typography variant="p2">Cancel</Typography>
                    </Button>
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      onClick={handleSave}>
                      <Typography variant="p2">Save Profile</Typography>
                    </Button>
                  </Grid>
                ) : null}
              </Box>
            </Paper>
          </Box>
        </Box>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
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
};

export default ProfileContainer;
