import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "../assets/styles/PaymentPage.css";
import StyledButton from "../components/customised/StyledButton";
function PaymentsPage() {

    const queryParameters = new URLSearchParams(window.location.search);

    // hooks
    const [hotelData, setHotelData] = useState(null);
    const [roomData, setRoomData] = useState(null);
    const {hotelId, roomId} = useParams();
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
        fetchHotelData();
    }, []);
    return (
        <>
            <div className='payment-container'>
                {
                    (roomData && hotelData)
                        ?
                        <div className='payment-div'>
                            <div className='payment-column1'>
                                <div className='row-element'>
                                    <h1>Hotel</h1>
                                    <h4>{hotelData.hotelName}</h4>
                                    <h4>{hotelData.location.address}</h4>
                                    <h4>Rs. {hotelData.ratePerNight}</h4>
                                </div>
                                <div className='row-element'>
                                    <h1>Booking Info</h1>
                                    <h4>{roomData.roomType}</h4>
                                    <h4>Rs. {roomData.roomRate}</h4>
                                    <h4>Number of days: {queryParameters.get('days')}</h4>
                                    <h4>Number of rooms: {queryParameters.get('rooms')}</h4>
                                </div>
                            </div>
                            <div className='payment-column2'>
                                <StyledButton onClick={()=>{
                                    alert("Booking successfull");
                                    navigate('/');
                                }}>Click to Pay</StyledButton>
                            </div>
                        </div>
                        :
                        <div></div>
                }
            </div>
        </>
    );
}

export default PaymentsPage;