import { Box } from "@mui/material";
import React from "react";

function ImageContainer({ imageUrl }) {
  return (
    <Box sx={{flexBasis: "40%"}}>
        <img
          src={imageUrl}
          alt="Hotel"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
    </Box>
  );
}
export default ImageContainer;
