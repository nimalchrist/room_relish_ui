import { Outlet, useLocation} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
function Layout({id, name}) {
    const location = useLocation();
    console.log(location);
    const excludeNavbarAndFooter = ["/login", "/signup"].includes(location.pathname);
    return(
        <>
            {!excludeNavbarAndFooter && <Navbar/>}
            <Outlet/>
            {!excludeNavbarAndFooter && <Footer/>}
        </>
    );
}
export default Layout;