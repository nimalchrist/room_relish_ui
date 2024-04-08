import {Button, Menu, MenuItem} from "@mui/material";
import Image from "../assets/images/header-images/logo.png";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Navbar = () => {
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState(false);
    const [userName, setUserName] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const queryParameters = new URLSearchParams(window.location.search);

    const checkLogin = async () => {
        try {
            const clientId = queryParameters.get('clientId');
            if (clientId) {
                // const response = await fetch('http://localhost:8081/users', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         query: `
                //         query FirstQuery($id: ID!) {
                //           user(id: $id) {
                //             id
                //             profilePicture
                //             email
                //             userName
                //           }
                //         }`,
                //         variables: {
                //             id: clientId
                //         },
                //     }),
                // });

                // if (response.ok) {
                //     const { data } = await response.json();
                //     const user = data.user;
                //     if (user) {
                //         setUserName(user.userName);
                //         setLoginStatus(true);
                //     } else {
                //         setLoginStatus(false);
                //     }
                // } else {
                //     setLoginStatus(false);
                //     console.error(`Failed to fetch user data. Status: ${response.status}`);
                // }
                setUserName("chiristo Nimal");
                setLoginStatus(true);
            } else {
                setLoginStatus(false);
            }
        } catch (error) {
            console.error(`An error occurred: ${error}`);
            setLoginStatus(false);
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

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Close menu
    };


    useEffect(() => {
        checkLogin();
    }, []);

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
                        <Box sx={{ display: 'flex', alignItems: 'center', margin: '2%' }}>
                            <Avatar src="//" alt="J" sx={{ width: 40, height: 40 }} onClick={handleAvatarClick} />
                            <Typography variant="body1" sx={{ marginLeft: '8px', cursor: 'pointer' }} onClick={handleAvatarClick}>
                                {userName}
                            </Typography>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem onClick={handleMenuClose}>Bookings</MenuItem>
                            </Menu>
                        </Box>
                    </div>
            }
        </div>
    );
}
export default Navbar;
