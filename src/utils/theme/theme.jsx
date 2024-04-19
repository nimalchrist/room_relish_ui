import { createTheme } from "@mui/material/styles";
import typography from "./typography";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3d68f3",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "rgba(0,0,0,1)",
      secondary: "#FF8682",
    },
  },
  typography,
});

export default theme;
