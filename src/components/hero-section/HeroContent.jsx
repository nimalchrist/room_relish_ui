import bg from "../../assets/images/header-images/bg-stays.jpg";
function HeroContent() {
    return(
        <>
            <div className="hero-content">
                <img className="hero-image" src={bg} alt="content"/>
                <div className="overlay"></div>
                <div className="hero-text">
                    <h1>Make your travel</h1>
                    <h1>wishlist, we’ll do</h1>
                    <h1>the rest</h1>
                    <h3>Special Offers to suit your plan</h3>
                </div>
            </div>
        </>
    );
}

export default HeroContent;