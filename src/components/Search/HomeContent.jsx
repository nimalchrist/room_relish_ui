import React from "react";
import SearchContainer from "./SearchContainer";
import RecentSearch from "./RecentSearch";
import Cards from "./Cards";
import { Box } from "@mui/material";
const HomeContent = () => {
  return (
    <div>
      <Box>
        <SearchContainer />
        <RecentSearch />
        <Cards />
      </Box>
    </div>
  );
};

export default HomeContent;
