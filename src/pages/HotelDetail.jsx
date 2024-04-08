import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Alert,
    CircularProgress,
    Paper,
    Rating,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from "@mui/material";
import "../assets/styles/HotelDetailsPage.css";
import StyledButton from "../components/customised/StyledButton";
import * as React from "react";


function HotelDetail() {
    const [hotelData, setHotelData] = useState(null);
    const {hotelId} = useParams();
    const navigate = useNavigate()
    const queryParameter = new URLSearchParams(window.location.search);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const fetchHotelSpecificData = async () => {
        try {
            const url = `http://localhost:3200/hotels/${hotelId}`;
            const response = await fetch(url);
            const data = await response.json();
            setHotelData(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
    const handleButtonClick = (roomId) => {
        let queryString = "";
        let userId = queryParameter.get('userId');

        if(userId !== 'null'){
            queryString = `?q=${encodeURIComponent(
                roomId
            )}&checkIn=${encodeURIComponent(
                queryParameter.get('checkIn')
            )}&checkOut=${encodeURIComponent(
                queryParameter.get('checkOut')
            )}&rooms=${encodeURIComponent(
                queryParameter.get('rooms').trim()
            )}&userId=${encodeURIComponent(
                userId.trim()
            )}`;
            // go to booking page
            navigate(`/hotel-list/${hotelId}/booking${queryString}`);
        }
        else{
            setSnackBarOpen(true);
        }

    }
    const handleCloseSnackbar = (event, reason) =>{
        if (reason === 'clickaway'){
            return;
        }
        setSnackBarOpen(false);
    }

    useEffect(() => {
        fetchHotelSpecificData();
    }, []);
    return (
        <>
            <div className="hotel-detail-container">
                {hotelData !== null ? (
                    <>
                        <div className="title-section">
                            <h1>{hotelData.hotelName}</h1>
                            <h5>{hotelData.location.address}</h5>
                            <h5><Rating name="hotel-rating" value={hotelData.hotelType} readOnly/></h5>
                        </div>
                        <div className="image-section">
                            <div className="image-grid">
                                {hotelData.images.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image} alt={`${index}`}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="content-section">
                            <h5>Overview</h5>
                            <p>{hotelData.overview}</p>
                        </div>
                        <div className="available-rooms-section">
                            <h5>Available rooms [{hotelData.totalRooms}]</h5>
                            <TableContainer component={Paper} className="rooms-table">
                                <Table>
                                    <TableBody>
                                        {hotelData.rooms.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{row.roomType}</TableCell>
                                                <TableCell>{row.roomSpecification}</TableCell>
                                                <TableCell>{row.roomCount}</TableCell>
                                                <div className="last-cell">
                                                    <TableCell>Rs. {row.roomRate} per night</TableCell>
                                                    <StyledButton onClick={() => {handleButtonClick(row._id)}}>Book room</StyledButton>
                                                </div>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                            <Alert onClose={handleCloseSnackbar} severity='error'>Please login to continue</Alert>
                        </Snackbar>
                    </>
                ) : (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                        <CircularProgress/>
                    </div>
                )}
            </div>
        </>
    );
}

export default HotelDetail;
