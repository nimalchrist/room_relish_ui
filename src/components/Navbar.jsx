import {Button} from "@mui/material";
import Image from "../assets/images/header-images/logo.png";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState(false);
    const queryParameters = new URLSearchParams(window.location.search);

    const checkLogin = () => {
        console.log("i am called at initial render");
        if (queryParameters.get('set') === 'true') {
            setLoginStatus(true);
        }
    };
    const handleLogin = () => {
        navigate('/login');
    }
    const handleSignUp = () => {
        navigate('/signup');
    }
    const handleHomeClick = () => {
        navigate('/');
    }

    useEffect(() => {
        checkLogin();
    }, [checkLogin, handleLogin, handleSignUp]);


    return (
        <div className="nav-bar">
            <div className="nav-title" onClick={handleHomeClick} style={{cursor: "pointer"}}>
                <h1>Room Relish</h1>
            </div>
            <div className="nav-logo" onClick={handleHomeClick} style={{cursor: "pointer"}}>
                <img src={Image} alt={Image} width={70} height={50}/>
            </div>
            {
                !loginStatus
                    ?
                        <div>
                            <Button className="navbar-button" id="signup-btn" onClick={handleSignUp}>Sign up</Button>
                            <Button className="navbar-button" id="login-btn" onClick={handleLogin}>Login</Button>
                        </div>
                    :
                    <div>
                        <h4>User profile</h4>
                    </div>
            }
        </div>
    );
}
export default Navbar;