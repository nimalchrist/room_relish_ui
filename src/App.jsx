import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import HotelDetails from "./pages/HotelDetails";
import InteriorImages from "./pages/InteriorImages";
import HotelList from "./pages/HotelList";
import BookingDetailsPage from "./pages/BookingDetailsPage";
import Profile from "./pages/Profile";
import ViewBookedRoomDetailsPage from "./pages/ViewBookedRoomDetailsPage";
import NoPage from "./pages/NoPage";
import Favourites from "./pages/Favourites";
import { ThemeProvider } from "@emotion/react";
import theme from "./utils/theme/theme";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />}></Route>
              <Route path="signup" element={<Signup />}></Route>
              <Route path="hotel-list" element={<HotelList />}></Route>
              <Route path="hotel-details" element={<HotelDetails />} />
              <Route path="interior-images" element={<InteriorImages />} />
              <Route
                path="booking-details"
                element={<BookingDetailsPage />}></Route>
              <Route
                path="view-booking"
                element={<ViewBookedRoomDetailsPage />}></Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="favourites" element={<Favourites />}></Route>
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
