import StyledButton from "../customised/StyledButton";
import {useNavigate} from "react-router-dom";
import {Rating} from "@mui/material";

function HotelCard({hotelName, hotelImage, hotelAddress, hotelRating,totalReviews, basePrice, hotelId,checkIn,checkOut,rooms}) {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        const queryString = `?checkIn=${encodeURIComponent(
            checkIn
        )}&checkOut=${encodeURIComponent(
            checkOut
        )}&rooms=${encodeURIComponent(rooms)}`;

        navigate(`/hotel-list/${hotelId}${queryString}`);
    }
    return(
        <>
            <div className="hotel-card">
                <div className="hotel-card-image">
                    <img src={hotelImage} alt={hotelName}/>
                </div>
                <div className="hotel-card-content">
                    <h2>{hotelName}</h2>
                    <h4>{hotelAddress}</h4>
                    <span><Rating value={hotelRating} readOnly/>({totalReviews})</span>
                    <p>Starting from <i>Rs. {basePrice}</i></p>
                    <StyledButton onClick={handleButtonClick}>View Hotel</StyledButton>
                </div>
            </div>
        </>
    );
}

export default HotelCard;