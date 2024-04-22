import React, { useState, useEffect } from "react";
import AfterSearchContainer from "../components/Search/AfterSearchContainer.jsx";
import FilterSection from "../components/HotelList/FilterSection.jsx";
import HotelsViewport from "../components/HotelList/HotelsViewport.jsx";
import DataNotFound from "../components/HotelList/Components/NoResult.jsx";
import { CircularProgress } from "@mui/material";
import theme from "../utils/theme/theme.jsx";

const HotelList = () => {
  // query parameters
  const queryParameters = new URLSearchParams(window.location.search);
  const destination = queryParameters.get("q");
  const checkInDate = queryParameters.get("checkIn");
  const checkOutDate = queryParameters.get("checkOut");
  const numberOfRooms = parseInt(queryParameters.get("rooms"));

  // state variables
  const [dest, setDest] = useState(destination);
  const [In, setIn] = useState(checkInDate);
  const [Out, setOut] = useState(checkOutDate);
  const [rooms, setRooms] = useState(numberOfRooms);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState([]);

  // filter state variables
  const [selectedPrice, setSelectedPrice] = useState([599, 20000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [amenities, setAmenities] = useState([
    { id: 1, label: "Airport shuttle", checked: false },
    { id: 2, label: "Restaurant", checked: false },
    { id: 3, label: "Family rooms", checked: false },
    { id: 4, label: "Good breakfast", checked: false },
  ]);
  const [extraAmenities, setExtraAmenities] = useState([
    { id: 5, label: "Free Wi-Fi", checked: false },
    { id: 6, label: "Room service", checked: false },
    { id: 7, label: " Free-parking ", checked: false },
    { id: 8, label: "Spa and wellness centre", checked: false },
    { id: 9, label: "Non-smoking rooms ", checked: false },
    { id: 10, label: "Facilities for disabled guests", checked: false },
  ]);

  // handlers
  const handleSelectedPrice = (e, newValue) => {
    setSelectedPrice(newValue);
  };
  const handleSelectedRating = (value) => {
    setSelectedRating(value);
  };

  const handleAmenitiesChange = (id) => (event) => {
    const updatedAmenities = amenities.map((amenity) =>
      amenity.id === id
        ? { ...amenity, checked: event.target.checked }
        : amenity
    );
    setAmenities(updatedAmenities);
  };
  const handleExtraAmenitiesChange = (id) => (event) => {
    const updatedAmenities = extraAmenities.map((amenity) =>
      amenity.id === id
        ? { ...amenity, checked: event.target.checked }
        : amenity
    );
    setExtraAmenities(updatedAmenities);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const selectedAmenitiesIds = [...amenities, ...extraAmenities]
        .filter((amenity) => amenity.checked)
        .map((amenity) => amenity.label);

      const url = `http://localhost:3200/hotels/search?q=${encodeURIComponent(
        dest
      )}&checkIn=${encodeURIComponent(In)}&checkOut=${encodeURIComponent(
        Out
      )}&rooms=${encodeURIComponent(rooms)}&amenities=${encodeURIComponent(
        selectedAmenitiesIds.join(",")
      )}&priceRanges=${encodeURIComponent(
        JSON.stringify(selectedPrice)
      )}&rating=${encodeURIComponent(selectedRating)}`;

      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred during fetch:", error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    handleSearch();
  }, [selectedPrice, selectedRating, amenities, extraAmenities]);

  return (
    <div
      style={{
        height: "auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}>
      <AfterSearchContainer
        destination={dest}
        checkIn={In}
        checkOut={Out}
        rooms={rooms}
        setDestination={setDest}
        setCheckIn={setIn}
        setCheckOut={setOut}
        setRooms={setRooms}
        handleSearch={handleSearch}
      />
      <FilterSection
        amenities={amenities}
        extraAmenities={extraAmenities}
        selectedPrice={selectedPrice}
        selectedRating={selectedRating}
        handleSelectedPrice={handleSelectedPrice}
        handleSelectedRating={handleSelectedRating}
        handleAmenitiesChange={handleAmenitiesChange}
        handleExtraAmenitiesChange={handleExtraAmenitiesChange}
      />
      {loading ? (
        <div
          style={{
            margin: "0px auto",
            width: "50%",
            "@media (max-width: 600px)": {
              width: "100%",
            },
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <CircularProgress
            style={{
              color: theme.palette.primary.main,
              width: "60px",
              height: "60px",
            }}
          />
        </div>
      ) : !Array.isArray(searchResults) ? (
        <DataNotFound />
      ) : (
        <HotelsViewport
          listOfHotels={searchResults}
          checkIn={In}
          checkOut={Out}
          rooms={rooms}
        />
      )}
    </div>
  );
};

export default HotelList;
