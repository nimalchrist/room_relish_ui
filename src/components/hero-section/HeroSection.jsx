import HeroContent from ".//HeroContent";
import HeroSearch from "./HeroSearch";

function HeroSection() {
    return (
        <>
            <div className="hero-section">
                <HeroContent/>
                <HeroSearch/>
            </div>
        </>
    );
}

export default HeroSection;