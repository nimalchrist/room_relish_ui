import { Typography, Box, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import expand from "../../../assets/icons/drop-icons/expand.svg";
import drop from "../../../assets/icons/drop-icons/drop.svg";
import { useDropdown } from "./useDropDown.jsx";

export default function HotelRatingFilter({ ratingValue, changeRating }) {
  const ratingValues = [2, 3, 4];

  // custom hook
  const { isExpanded, toggleDropdown } = useDropdown();

  // customised button
  const ButtonStyle = styled(Box)(({ theme }) => ({
    width: 35,
    height: 35,
    borderRadius: 5,
    border: "2px solid",
    borderColor: theme.palette.primary.main,
    padding: "4px",
    alignItems: "center",
    textAlign: "center",
    margin: "6px",
    color: theme.palette.text.primary,
  }));

  // handlers
  const handleBoxMouseEnter = (e) => {
    e.target.style.backgroundColor = "#d9d9d9";
    e.target.style.cursor = "pointer";
  };

  const handleBoxMouseLeave = (e) => {
    e.target.style.backgroundColor = "white";
  };

  return (
    <Box sx={{ margin: "24px 8px 24px 16px" }}>
      <Grid container alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item xs={10}>
          <Typography gutterBottom variant="h13">
            Rating
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton>
            <img
              src={isExpanded ? drop : expand}
              onClick={toggleDropdown}
              style={{ cursor: "pointer" }}
            />
          </IconButton>
        </Grid>
      </Grid>
      <Typography color="text.secondary" variant="body2">
        {isExpanded && (
          <div style={{ display: "flex" }}>
            {ratingValues.map((value) => (
              <ButtonStyle
                key={value}
                value={value}
                onClick={() => changeRating(value)}
                onMouseEnter={handleBoxMouseEnter}
                onMouseLeave={handleBoxMouseLeave}>
                <Typography variant="value">{`${value}+`}</Typography>
              </ButtonStyle>
            ))}
          </div>
        )}
      </Typography>
    </Box>
  );
}
