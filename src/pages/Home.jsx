import React from "react";
import Hero from "../components/Header/Hero";
import HomeContent from "../components/Search/HomeContent";

const Home = () => {
  return (
    <div style={{ marginBottom: "120px" }}>
      <Hero />
      <HomeContent />
    </div>
  );
};

export default Home;
