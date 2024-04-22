import React, { useEffect } from "react";
import BookingDetails from "../components/BookingDetails/BookingDetails";

const BookingDetailsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <BookingDetails />
    </div>
  );
};

export default BookingDetailsPage;
