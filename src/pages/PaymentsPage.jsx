// import {useNavigate, useParams} from "react-router-dom";
// import {useEffect, useState} from "react";
// import "../assets/styles/PaymentPage.css";
// import StyledButton from "../components/customised/StyledButton";
// function PaymentsPage() {
//
//     const queryParameters = new URLSearchParams(window.location.search);
//
//     // hooks
//     const [hotelData, setHotelData] = useState(null);
//     const [roomData, setRoomData] = useState(null);
//     const {hotelId, roomId} = useParams();
//     const navigate = useNavigate();
//     const fetchHotelData = async () => {
//         try {
//             const url = `http://localhost:3200/hotels/${hotelId}`;
//             console.log(url)
//             const response = await fetch(url);
//             const data = await response.json();
//             setHotelData(data);
//
//             const room = data.rooms.find(room => room._id === roomId);
//             setRoomData(room);
//
//         } catch (error) {
//             console.error("Error fetching data: ", error);
//         }
//     }
//
//     useEffect(() => {
//         fetchHotelData();
//     }, []);
//     return (
//         <>
//             <div className='payment-container'>
//                 {
//                     (roomData && hotelData)
//                         ?
//                         <div className='payment-div'>
//                             <div className='payment-column1'>
//                                 <div className='row-element'>
//                                     <h1>Hotel</h1>
//                                     <h4>{hotelData.hotelName}</h4>
//                                     <h4>{hotelData.location.address}</h4>
//                                     <h4>Rs. {hotelData.ratePerNight}</h4>
//                                 </div>
//                                 <div className='row-element'>
//                                     <h1>Booking Info</h1>
//                                     <h4>{roomData.roomType}</h4>
//                                     <h4>Rs. {roomData.roomRate}</h4>
//                                     <h4>Number of days: {queryParameters.get('days')}</h4>
//                                     <h4>Number of rooms: {queryParameters.get('rooms')}</h4>
//                                 </div>
//                             </div>
//                             <div className='payment-column2'>
//                                 <StyledButton onClick={()=>{
//                                     alert("Booking successfull");
//                                     navigate('/');
//                                 }}>Click to Pay</StyledButton>
//                             </div>
//                         </div>
//                         :
//                         <div></div>
//                 }
//             </div>
//         </>
//     );
// }
//
// export default PaymentsPage;
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "../assets/styles/PaymentPage.css";
import StyledButton from "../components/customised/StyledButton";
import {FaCreditCard} from "react-icons/fa";
import {FaPaypal} from "react-icons/fa";
import Confetti from "react-confetti";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function PaymentsPage() {

    const queryParameters = new URLSearchParams(window.location.search);

    // hooks
    const [hotelData, setHotelData] = useState(null);
    const [roomData, setRoomData] = useState(null);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [cardNumber, setCardNumber] = useState(null);
    const [cvv, setCVV] = useState(null);

    const [isCardValid, setIsCardValid] = useState(true);
    const [isCVVValid, setIsCVVValid] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
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
    const validateCardNumber = () => {
        setIsCardValid(/^\d{16}$/.test(cardNumber));
    };

    const validateCVV = () => {
        setIsCVVValid(/^\d{3}$/.test(cvv));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        validateCardNumber();
        validateCVV();
        const nameRegex = /^[a-zA-Z ]+$/;

        if (!selectedPaymentMethod) {
            setSnackbarMessage("Please choose a payment method.");
            setSnackbarOpen(true);
            return;
        }

        if (!name.match(nameRegex)) {
            setSnackbarMessage("Name field must contain only letters.");
            setSnackbarOpen(true);
            return;
        }

        if (!isCardValid) {
            setSnackbarMessage("Please enter a valid 16-digit card number.");
            setSnackbarOpen(true);
            return;
        }

        if (!isCVVValid) {
            setSnackbarMessage("Please enter a valid 3-digit CVV.");
            setSnackbarOpen(true);
            return;
        }

        if (!date) {
            setSnackbarMessage("Please enter expiration date.");
            setSnackbarOpen(true);
            return;
        }
        setShowConfetti(true);
        setShowPaymentSuccess(true);
        setTimeout(() => {
            setShowConfetti(false);
            setShowPaymentSuccess(false);
            navigate('/');
        }, 5000);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

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
                                    <h4>Total amount to be paid: {queryParameters.get('amount')}</h4>
                                </div>
                            </div>
                            <div className='payment-column2'>
                                <h1>Payment Info</h1>
                                <div className="payment-method">
                                    <h2>Payment Method</h2>
                                    <div className="radio-button">
                                        <input type="radio" id="credit-card" name="payment-method" value="credit-card"
                                               checked={selectedPaymentMethod === "credit-card"}
                                               onChange={() => setSelectedPaymentMethod("credit-card")}/>
                                        <label htmlFor="credit-card">
                                            <FaCreditCard className="icon"/> Credit Card
                                        </label>
                                    </div>
                                    <div className="radio-button">
                                        <input type="radio" id="paypal" name="payment-method" value="paypal"
                                               checked={selectedPaymentMethod === "paypal"}
                                               onChange={() => setSelectedPaymentMethod("paypal")}/>
                                        <label htmlFor="paypal">
                                            <FaPaypal className="icon"/>PayPal
                                        </label>
                                    </div>

                                </div>
                                <div className="card-details">
                                    <h2>Name on Card</h2>
                                    <input type="text" placeholder="Enter Name" value={name} autoComplete="off"
                                           onChange={(e) => setName(e.target.value)}/>
                                    <h2>Card Number</h2>
                                    <input type="password" placeholder="Enter 16-digit Card Number" value={cardNumber}
                                           autoComplete="off"
                                           onChange={(e) => setCardNumber(e.target.value)}/>
                                    <h2>Expiration Date</h2>
                                    <input type="text" placeholder="MM/YYYY" value={date}
                                           onChange={(e) => setDate(e.target.value)}/>
                                    <h2>CVV</h2>
                                    <input type="text" placeholder="Enter 3-digit CVV" value={cvv}
                                           onChange={(e) => setCVV(e.target.value)}/>
                                    <div className='checkout'>
                                        <StyledButton onClick={handleSubmit}>Pay Now</StyledButton>


                                    </div>
                                </div>

                            </div>
                        </div>
                        :
                        <div>
                            <h1>Loading...</h1>
                        </div>
                }
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity="warning"
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
            {showConfetti && <Confetti/>}
            {showPaymentSuccess && (
                <div className="payment-success-popup">
                    <h2>Payment successful!</h2>
                </div>)}
        </>
    );
}

export default PaymentsPage;