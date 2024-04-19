import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

const Layout = () => {
    const location = useLocation();
    console.log(location)
    const hideNavbarAndFooter = ["/login", "/signup"].includes(location.pathname);

    return (
        <>
            {!hideNavbarAndFooter && <Navbar />}
            <Outlet />
            {!hideNavbarAndFooter && <Footer />}
        </>
    );
};

export default Layout;
