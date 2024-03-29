import {styled} from "@mui/material/styles";
import {TextField} from "@mui/material";

const StyledTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#1C1B1F"
    },
    "& .MuiFormLabel-root": {
        fontSize: '19px', fontFamily: "Montserrat, sans-serif", color: '#1C1B1F'
    },
    "&.Mui-focused": {
        backgroundColor: "white",
    },
    "&::placeholder": {
        color: "white",
    },
    width: "220px",
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "gray"
        }
    }
});
export default StyledTextField;