import {Button} from "@mui/material";
import Image from "../assets/images/header-images/logo.png";
import {useNavigate} from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
    function handleSignUp() {
        navigate('/signup');
    }
    function handleLogin() {
        navigate('/login');
    }
    function handleHomeClick() {
        navigate('/');
    }
    return (
        <div className="nav-bar">
            <div className="nav-title" onClick={handleHomeClick} style={{cursor: "pointer"}}>
                <h1>Room Relish</h1>
            </div>
            <div className="nav-logo" onClick={handleHomeClick} style={{cursor: "pointer"}}>
                <img src={Image} alt={Image} width={70} height={50}/>
            </div>
            <div>
                <Button className="navbar-button" id="signup-btn" onClick={handleSignUp}>Sign up</Button>
                <Button className="navbar-button" id="login-btn" onClick={handleLogin}>Login</Button>
            </div>
        </div>
    );
}
export default Navbar;