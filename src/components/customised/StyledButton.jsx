import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";

const StyledButton = styled(Button)({
    backgroundColor: "#3d68f3",
    "&:hover": {
        background: "#3d68f3"
    },
    boxShadow: "none",
    color: 'white'
});

export default StyledButton;