import React from "react";
import { MenuItem, Menu } from "@mui/material";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({ anchorEl, onClose, onLogout }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/profile");
  };
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}>
      <MenuItem onClick={handleNavigation} sx={{ py: 2 }}>
        <Typography variant="body" sx={{ color: "black" }}>
          My Account
        </Typography>
      </MenuItem>
      <MenuItem onClick={onLogout} sx={{ py: 2 }}>
        <Typography variant="body">Logout</Typography>
      </MenuItem>
    </Menu>
  );
};

export default UserDropdown;
