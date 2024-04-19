import React from "react";
import { Box, IconButton, Typography, Slider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDropdown } from "./useDropDown.jsx";
import expand from "../../../assets/icons/drop-icons/expand.svg";
import drop from "../../../assets/icons/drop-icons/drop.svg";
import theme from "../../../utils/theme/theme.jsx";

export default function PriceRangeFilter({ value, changePrice }) {
  // custom hook
  const { isExpanded, toggleDropdown } = useDropdown();

  // customised slider
  const PriceSlider = styled(Slider)(() => ({
    width: "220px",
    margin: "0px auto",
    color: theme.palette.text.primary,
    "& .MuiSlider-thumb": {
      height: 20,
      width: 20,
      backgroundColor: theme.palette.primary.main,
      border: "2px solid theme.palette.primary.main",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
  }));

  return (
    <>
      <Box alignItems="center" sx={{ margin: "24px 16px", display: "flex" }}>
        <Box sx={{ flex: 2, marginTop: 3 }}>
          <Typography gutterBottom variant="h13" component="div">
            Price
          </Typography>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <IconButton>
            <img
              src={isExpanded ? drop : expand}
              onClick={toggleDropdown}
              style={{ cursor: "pointer" }}
            />
          </IconButton>
        </Box>
      </Box>
      <Box>
        <Typography variant="body2" sx={{ margin: "20px" }}>
          {isExpanded && (
            <Box>
              <PriceSlider
                size="small"
                value={value}
                onChange={changePrice}
                defaultValue={899}
                min={599}
                max={20000}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Typography gutterBottom variant="value">
                  Rs.{value[0]}
                </Typography>
                <Typography variant="value">Rs.{value[1]}</Typography>
              </Box>
            </Box>
          )}
        </Typography>
      </Box>
    </>
  );
}
