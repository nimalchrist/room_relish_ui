import HotelCard from "../components/hotel-list-section/HotelCard";
import "../assets/styles/HotelListPage.css";
import {useEffect, useState} from "react";
import StyledButton from "../components/customised/StyledButton";

function HotelList() {
    const queryParameter = new URLSearchParams(window.location.search);
    const [hotels, setHotels] = useState([]);
    const [displayHotels, setDisplayHotels] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [noData, setNoData] = useState(false);

    useEffect( () => {
        fetchHotelListData();
    }, []);
    const fetchHotelListData = async () => {
        try {
            const response = await fetch(`http://localhost:3200/hotels/search?${queryParameter}`);
            if (!response.ok) {
                setNoData(true);
                return;
            }
            const data = await response.json();
            if(Array.isArray(data)){
                setHotels(data);
                setDisplayHotels(data.slice(0, 4));
            }else{
                setNoData(true);
            }
        } catch (e) {
            console.error(e);
            setNoData(true);
        }
    }

    const handleShowMoreClick = () => {
        if (showMore) {
            setDisplayHotels(hotels);
            setShowMore(false);
        } else {
            setDisplayHotels(hotels.slice(0, 4));
            setShowMore(true);
        }
    }
    return (
        <>
            <div className="hotel-list-page">
                <h4>Showing the {displayHotels.length} of {hotels.length}  results</h4>
                {noData ? <div> <h1>No data found</h1></div> :
                    displayHotels.map((hotel)=>{
                        return <HotelCard
                            hotelName={hotel.hotelName}
                            hotelAddress={hotel.location.address}
                            hotelRating={hotel.rating}
                            totalReviews={hotel.numReviews}
                            basePrice={hotel.ratePerNight}
                            hotelImage={hotel.images[0]}
                            hotelId={hotel._id}
                            checkIn={queryParameter.get('checkIn')}
                            checkOut={queryParameter.get('checkOut')}
                            rooms={queryParameter.get('rooms')}
                        />
                    })}
                {displayHotels.length > 3 &&
                <StyledButton className="show-more-button" onClick={handleShowMoreClick}>{(showMore) ? "Show More" : "Hide"}</StyledButton>}
            </div>
        </>

    );
}

export default HotelList;