import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../assets/styles/BookingPage.css";
import bookingIcon from "../assets/icons/Booking-icons/checking.png";
import StyledButton from "../components/customised/StyledButton";

function BookingPage() {
    const queryParameter = new URLSearchParams(window.location.search);
    const {hotelId} = useParams();
    const roomId = queryParameter.get('q');
    const [hotelData, setHotelData] = useState(null);
    const [roomData, setRoomData] = useState(null);
    const navigate = useNavigate();

    const fetchHotelData = async () => {
        try {
            const url = `http://localhost:3200/hotels/${hotelId}`;
            console.log(url)
            const response = await fetch(url);
            const data = await response.json();
            setHotelData(data);

            const room = data.rooms.find(room => room._id === roomId);
            setRoomData(room);

        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    useEffect(() => {
        fetchHotelData()
    }, []);

    function handlePaymentButtonClick() {
        navigate(`/hotel-list/${hotelId}/booking/${roomId}`);
    }

    return (
        <>
            <div className="booking-container">
                {
                    (roomData && hotelData)
                        ?
                        <>
                            <div className="booking-overview">
                                <h1>{roomData.roomType}</h1>
                                <h1 id='price'>Rs. {roomData.roomRate}/day</h1>
                                <div>
                                    <h2>{hotelData.location.address}</h2>
                                    <h4><span>{queryParameter.get('checkIn')}</span> <img src={bookingIcon}
                                                                                          alt='booking'/>
                                        <span>{queryParameter.get('checkOut')}</span></h4>
                                </div>
                                <StyledButton className='payment-button' onClick={handlePaymentButtonClick}>Proceed with
                                    Payment</StyledButton>

                            </div>
                            <div className="payment-details">
                                <img src={hotelData.images[0]} alt={roomData.roomType}/>
                                <h2>{roomData.roomType}</h2>
                                <div className='line'></div>
                                <h3>Your booking is protected by <i style={{fontWeight: "bold"}}>Room Relish</i></h3>
                                <div className='line'></div>
                                <div>
                                    <h3>Price details</h3>
                                </div>
                            </div>
                        </>
                        :
                        <h1>Loading...</h1>
                }
            </div>
        </>
    );
}

export default BookingPage;