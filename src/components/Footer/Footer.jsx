import React, {useState} from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
    Card,
    Box,
} from "@mui/material";
import instagram from "../../assets/icons/footer-icons/instagram.svg";
import facebook from "../../assets/icons/footer-icons/facebook.svg";
import twitter from "../../assets/icons/footer-icons/twitter.svg";
import logo from "../../assets/icons/navbar-icons/logo.png";
import img from "../../assets/icons/footer-icons/image.svg";

function Footer() {
    // hooks
    const [email, setEmail] = useState("");
    const [validEmail, setvalidEmail] = useState(true);

    // handlers
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubscribe = () => {
        const emailPattern = /^[a-z][a-z0-9]*@[a-z]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(email)) {
            setvalidEmail(false);
            return;
        }
        alert("Thankyou for your Subscription");
        setEmail("");
        setvalidEmail(true);
    };

    // suppportive methods
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const currentDate = new Date();

    const checkInDate = new Date(currentDate);
    checkInDate.setDate(currentDate.getDate() + 1);

    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkInDate.getDate() + 2);

    const formattedCheckIn = formatDate(checkInDate);
    const formattedCheckOut = formatDate(checkOutDate);

    const tirunelveli = `http://localhost:5173/hotel-list?q=Tirunelveli&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&rooms=1`;
    const chennai = `http://localhost:5173/hotel-list?q=Chennai&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&rooms=1`;
    const cochin = `http://localhost:5173/hotel-list?q=Cochin&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&rooms=1`;
    const bangalore = `http://localhost:5173/hotel-list?q=Bangalore&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&rooms=1`;

    return (
        <footer
            style={{
                backgroundColor: "#3d68f3",
                padding: "20px 0px",
                bottom: 0,
                left: 0,
                right: 0,
                height: "370px",
                maxWidth: "100%",
                border: "1px solid black",
                position: "relative",
            }}>
            <Container
                maxWidth="md"
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                }}>
                <Card
                    style={{
                        maxWidth: "1500px",
                        maxHeight: "200px",
                        padding: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexDirection: "row",
                        marginBottom: "80px",
                        width: "100%",
                        borderRadius: "16px",
                        backgroundColor: "#85A3FF",
                    }}>
                    <Box display="flex" style={{width: "120rem"}}>
                        <Grid
                            container
                            xs={6}
                            sm={6}
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing="{2}">
                            <Grid item xs={6}>
                                <Typography variant="foot">Subscribe Newsletter</Typography>
                                <TextField
                                    label="Email"
                                    variant="filled"
                                    size="small"
                                    value={email}
                                    onChange={handleEmailChange}
                                    fullWidth
                                    style={{
                                        display: "flex",
                                        flex: "1 0 0",
                                        backgroundColor: "white",
                                        marginTop: "10px ",
                                        width: "30rem",
                                        alignItems: "flex-start",
                                    }}
                                    error={!validEmail}
                                    helperText={!validEmail ? "Invalid email format " : ""}
                                />
                            </Grid>
                        </Grid>
                        <Grid container></Grid>
                        <Grid item style={{marginTop: "6.5rem", marginRight: "2.8rem"}}>
                            <Button
                                variant="contained"
                                size="large"
                                style={{backgroundColor: "#112211", color: "#FFFFFF"}}
                                onClick={handleSubscribe}
                                fullWidth>
                                Subscribe
                            </Button>
                        </Grid>
                    </Box>
                    <Grid
                        container
                        display="flex"
                        alignItems="flex-end"
                        justifyContent="flex-end"
                        style={{marginBottom: "2rem", height: "20rem"}}>
                        <Box
                            display="flex"
                            direction="row"
                            style={{
                                width: "16rem",
                                height: "12rem",
                                marginBottom: "20rem",
                            }}>
                            <img src={img} alt="image"/>
                        </Box>
                    </Grid>
                </Card>
            </Container>
        </footer>
    );
}

export default Footer;
