import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../assets/styles/BookingPage.css";
import bookingIcon from "../assets/icons/Booking-icons/checking.png";
import StyledButton from "../components/customised/StyledButton";

function BookingPage() {
    const queryParameter = new URLSearchParams(window.location.search);
    const roomId = queryParameter.get('q');

    // hooks
    const [hotelData, setHotelData] = useState(null);
    const [roomData, setRoomData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetchHotelData()
    }, []);
    const {hotelId} = useParams();

    // supportive methods
    const numberOfDays = (checkIn, checkOut) => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        const timeDifference = checkOutDate.getTime() - checkInDate.getTime();

        return Math.max(Math.ceil(timeDifference / (1000 * 3600 * 24)), 1);
    }
    const computeTotal = () => {
        if (!roomData || !queryParameter.get('checkIn') || !queryParameter.get('checkOut') || !queryParameter.get('rooms')) {
            return 0;
        }
        const baseFare = roomData.roomRate;
        const numberOfRooms = parseInt(queryParameter.get('rooms'), 10);
        const days = numberOfDays(queryParameter.get('checkIn'), queryParameter.get('checkOut'));

       return baseFare * numberOfRooms * days;
    };
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

    async function handlePaymentButtonClick() {
        const response = await fetch("http://localhost:8081/book",{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "_userId": queryParameter.get("userId"),
                "_hotelId": hotelId,
                "_roomId": roomId,
                "numOfRooms": queryParameter.get("rooms"),
                "numOfDays": numberOfDays(queryParameter.get('checkIn'), queryParameter.get('checkOut'))
            })
        });
        if (response.status === 200){
            const queryString = `?days=${encodeURIComponent(
                numberOfDays(queryParameter.get('checkIn'), queryParameter.get('checkOut'))
            )}&rooms=${encodeURIComponent(
                queryParameter.get('rooms')
            )}&amount=${computeTotal()}`;
            navigate(`/hotel-list/${hotelId}/booking/${roomId}${queryString}`);
        }else{

        }
    }

    // jsx layout
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
                                <StyledButton className='payment-button' onClick={handlePaymentButtonClick}>
                                    Confirm Booking
                                </StyledButton>

                            </div>
                            <div className="payment-details">
                                <img src={hotelData.images[0]} alt={roomData.roomType}/>
                                <h2>{roomData.roomType}</h2>
                                <div className='line'></div>
                                <h3>Your booking is protected by <i style={{fontWeight: "bold"}}>Room Relish</i></h3>
                                <div className='line'></div>
                                <div>
                                    <h3 style={{fontWeight: "bold"}}>Price details</h3>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>Base Fare</td>
                                            <td className='second'>Rs. {roomData.roomRate}</td>
                                        </tr>
                                        <tr>
                                            <td>Number of days</td>
                                            <td className='second'>{numberOfDays(queryParameter.get('checkIn'), queryParameter.get('checkOut'))}</td>
                                        </tr>
                                        <tr>
                                            <td>Rooms count</td>
                                            <td className='second'>{queryParameter.get('rooms')}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='line'></div>
                                <div>
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td>Total</td>
                                            <td className='result'>Rs. {computeTotal()}</td>
                                        </tr>
                                        </tbody>
                                    </table>
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