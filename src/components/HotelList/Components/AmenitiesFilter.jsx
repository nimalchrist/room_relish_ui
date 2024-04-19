import {
  Typography,
  Box,
  Grid,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDropdown } from "./useDropDown.jsx";
import { useState } from "react";
import expand from "../../../assets/icons/drop-icons/expand.svg";
import drop from "../../../assets/icons/drop-icons/drop.svg";
import theme from "../../../utils/theme/theme.jsx";

export default function AmenitiesFilter({
  amenities,
  extraAmenities,
  handleAmenitiesChange,
  handleExtraAmenitiesChange,
}) {
  // custom hook
  const { isExpanded, toggleDropdown } = useDropdown();

  // custom components
  const FormStyle = styled(FormControlLabel)({
    "& .MuiFormControlLabel-label": { color: theme.palette.text.primary },
    "& .MuiSvgIcon-root": { fontSize: 30, color: theme.palette.text.primary },
  });
  const TextButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: 16,
  }));

  // hooks
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  // handlers
  const handleTextButtonClick = () => {
    setShowCheckboxes(!showCheckboxes);
  };
  const handleToggleAmenities = () => {
    toggleDropdown();
    setShowCheckboxes(false);
  };

  return (
    <Box sx={{ margin: "24px 8px 24px 16px" }}>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <Typography gutterBottom variant="h13" component="div">
            Amenities
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton>
            <img
              src={isExpanded ? drop : expand}
              onClick={handleToggleAmenities}
              style={{ cursor: "pointer" }}
            />
          </IconButton>
        </Grid>
      </Grid>
      {isExpanded && (
        <FormGroup sx={{ marginTop: 1 }}>
          {amenities.map(({ id, label, checked }) => (
            <FormStyle
              key={id}
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleAmenitiesChange(id)}
                />
              }
              label={<Typography variant="check">{label}</Typography>}
            />
          ))}
        </FormGroup>
      )}
      <div>
        <Box>
          {!showCheckboxes && isExpanded && (
            <TextButton onClick={handleTextButtonClick}>+6 more</TextButton>
          )}
        </Box>
        {showCheckboxes && isExpanded && (
          <div>
            <FormGroup sx={{ marginTop: 1.5 }}>
              {extraAmenities.map(({ id, label, checked }) => (
                <FormStyle
                  key={id}
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleExtraAmenitiesChange(id)}
                    />
                  }
                  label={<Typography variant="check">{label}</Typography>}
                />
              ))}
            </FormGroup>
          </div>
        )}
      </div>
    </Box>
  );
}
