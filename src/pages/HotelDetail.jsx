import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CircularProgress, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import "../assets/styles/HotelDetailsPage.css";
import StyledButton from "../components/customised/StyledButton";


function HotelDetail() {
    const [hotelData, setHotelData] = useState(null);
    const {hotelId} = useParams();
    const navigate = useNavigate()
    const queryParameter = new URLSearchParams(window.location.search);
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
        const queryString = `?q=${encodeURIComponent(
            roomId
        )}&checkIn=${encodeURIComponent(
            queryParameter.get('checkIn')
        )}&checkOut=${encodeURIComponent(
            queryParameter.get('checkOut')
        )}&rooms=${encodeURIComponent(
            queryParameter.get('rooms')
        )}`;
        navigate(`/hotel-list/${hotelId}/booking${queryString}`);
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
