import {NavLink} from "react-router-dom";
import Logo from "../assets/images/header-images/logo.png";
import instagram from '../assets/icons/footer-icons/instagram.svg';
import facebook from '../assets/icons/footer-icons/facebook.svg';
import twitter from '../assets/icons/footer-icons/twitter.svg';
function Footer()
{
    return (
        <div className="footer-section">
            <div className="locations">
                <h3>Top Locations</h3>
                <NavLink to='/hotel-list'>Chennai</NavLink><br/>
                <NavLink to='/hotel-list'>Bangalore</NavLink><br/>
                <NavLink to='/hotel-list'>Madurai</NavLink><br/>
                <NavLink to='/hotel-list'>Coimbatore</NavLink><br/>
            </div>
            <div className="follow">
                <h3>Follow Us</h3>
                <img src={instagram} alt={Logo}/>
                <img src={facebook} alt={Logo}/>
                <img src={twitter} alt={Logo}/>
            </div>
            <div className="footer-logo">
                <img src={Logo} alt={Logo}/>
            </div>
        </div>
    )
}
export default Footer;