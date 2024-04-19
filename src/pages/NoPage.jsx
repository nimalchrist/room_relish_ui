import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <>
      <Link to="/">
        <img
          src="https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-template-12.png"
          alt=""
          style={{ width: "100%", height: "100%", zIndex: -10 }}
        />
      </Link>
    </>
  );
};

export default NoPage;
