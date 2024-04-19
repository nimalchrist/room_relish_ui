import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import theme from "../../../utils/theme/theme";

const Container = styled(Box)(({ theme }) => ({
  flexBasis: "70%",
  "@media (max-width: 600px)": {
    flexBasis: "100%",
  },
  height: "auto",
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
}));

const Illustration = styled("img")({
  width: "20%",
  margin: "-30px auto 0px auto"
});

const DataNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Illustration
        src="https://static.vecteezy.com/system/resources/thumbnails/006/208/684/small/search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
        alt="Data Not Found"
      />
      <Typography variant="h4" align="center" gutterBottom>
        Oops! Data Not Found
      </Typography>
      <Typography variant="body1" align="center">
        The destination you entered is currently unavailable. Please wait for future updates
      </Typography>
      <Button
        sx={{
          margin: "16px auto",
          "&:hover": { backgroundColor: theme.palette.primary.main },
        }}
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          navigate(`/`);
        }}>
        Go Back To Search
      </Button>
    </Container>
  );
};

export default DataNotFound;
