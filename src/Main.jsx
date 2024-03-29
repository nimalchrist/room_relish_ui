import Home from "./pages/Home";
import "./assets/styles/Main.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./Layout";
import HotelList from "./pages/HotelList";
import HotelDetail from "./pages/HotelDetail";
import BookingPage from "./pages/BookingPage";
import PaymentsPage from "./pages/PaymentsPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <div>404 Not found</div>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/hotel-list',
                element: <HotelList/>
            },
            {
                path: '/hotel-list/:hotelId',
                element: <HotelDetail/>
            },
            {
                path: '/hotel-list/:hotelId/booking',
                element: <BookingPage/>
            },
            {
                path: '/hotel-list/:hotelId/booking/:roomId',
                element: <PaymentsPage/>
            },
            {
                path: '/login',
                element: <HotelList/>
            },
            {
                path: '/signup',
                element: <HotelList/>
            }
        ]
    }
]);

function Main() {
    return (
        <div className="App">
            <RouterProvider router={router}/>
            {/*<BrowserRouter>*/}
            {/*    <Routes>*/}
            {/*        <Route path="/" element={<Layout/>}>*/}
            {/*            <Route index element={<Home/>}/>*/}
            {/*            <Route path="hotel-list" element={<HotelList/>}></Route>*/}
            {/*        </Route>*/}
            {/*    </Routes>*/}
            {/*</BrowserRouter>*/}
        </div>
    );
}

export default Main;
