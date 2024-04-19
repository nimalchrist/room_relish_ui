import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import findstays from "../../assets/icons/navbar-icons/find-stays.svg";
import logo from "../../assets/icons/navbar-icons/logo.png";
import heart from "../../assets/icons/navbar-icons/heart.svg";
import UserDropdown from "./UserDropdown";
import { styled } from "@mui/material/styles";
import theme from "../../utils/theme/theme";
import { Link, useNavigate } from "react-router-dom";

const FancyButton = styled(Button)({
  background: "black",
  border: 0,
  borderRadius: 10,
  boxShadow: "0 3px 5px 2px rgba(0,0,0,0.25)",
  color: "white",
  height: 48,
  padding: "0 3.5vh",
  marginLeft: "8px",
  "&:hover": {
    background: "white",
    color: "black",
  },
});

const HoverableBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4%",
  cursor: "default",
  "&:hover": {
    cursor: "pointer",
  },
});

const Navbar = () => {
  // useState hooks
  const navigate = useNavigate();
  const [showIndicator, setShowIndicator] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  // handler function
  const handleUserNameClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
  };
  const handleFav = () => {
    navigate("/favourites");
  };
  const handleLogoClick = () => {
    setShowIndicator(!showIndicator);
    navigate("/");
  };
  const handleScroll = () => {
    const isTop = window.scrollY < 100;
    setShowIndicator(isTop);
  };
  const handleLogout = () => {
    fetch("http://localhost:3200/auth/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    navigate("/");
  };

  const logoText = "Room Relish";

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

        if (responseData.success) {
          setLoggedIn(true);
          console.log("User is logged in.");
          if (responseData.info) {
            console.log("User data:", responseData.info);
            setProfilePicture(responseData.info.profilePicture);
            setUserName(responseData.info.userName);
          } else {
            console.log("No user data available.");
          }
        } else {
          setLoggedIn(false);
          console.log("User is not logged in.");
        }
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const processName = (name) => {
    if (name.includes(" ")) {
      return name.split(" ")[0];
    } else if (name.length > 9) {
      return name.substring(0, 9) + "...";
    } else {
      return name;
    }
  };

  // useEffect hooks
  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      style={{
        zIndex: 1000,
        backgroundColor: "white",
        padding: "10px 6%",
      }}>
      <Toolbar>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={findstays} alt="" />

          <Typography
            variant="body1"
            component="div"
            onClick={handleLogoClick}
            style={{ cursor: "pointer", marginLeft: "6px", color: "black" }}>
            {logoText}
          </Typography>

          {showIndicator && (
            <div
              style={{
                height: 7,
                width: "9%",
                backgroundColor: "#3d68f3",
                position: "absolute",
                bottom: -10,
                left: 28,
                transition: "left 1s",
              }}
            />
          )}
        </div>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            justifyContent: "center",
          }}>
          <img src={logo} alt="Logo" width={70} height={60} />
        </Box>
        <div style={{ marginLeft: "auto" }}>
          {loggedIn ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: "7%" }}>
              <HoverableBox
                onClick={handleFav}
                sx={{ display: "flex", alignItems: "center", gap: "4%" }}>
                <img src={heart} />
                <Typography sx={{ color: "black" }}>Favourites</Typography>
              </HoverableBox>
              <span>|</span>
              <Box sx={{ display: "flex", alignItems: "center", margin: "2%" }}>
                {profilePicture !== null || profilePicture !== "" ? (
                  <Avatar
                    src={profilePicture}
                    alt="User Avatar"
                    sx={{
                      width: 35,
                      height: 35,
                    }}
                  />
                ) : (
                  <Avatar src="//" alt="J" sx={{ width: 40, height: 40 }} />
                )}
                <Typography
                  variant="body1"
                  sx={{ marginLeft: "8px", cursor: "pointer", color: "black" }}
                  onClick={handleUserNameClick}>
                  {processName(userName)}
                </Typography>
              </Box>
            </Box>
          ) : (
            <>
              <Link to="/signup">
                <Button
                  onClick={() => setLoggedIn(true)}
                  sx={{ color: theme.palette.text.primary }}>
                  SignUp
                </Button>
              </Link>
              <Link to="/login">
                <FancyButton>Login</FancyButton>
              </Link>
            </>
          )}
          <UserDropdown
            anchorEl={anchorEl}
            onClose={handleDropdownClose}
            onLogout={() => {
              handleDropdownClose();
              setLoggedIn(false);
              handleLogout();
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
