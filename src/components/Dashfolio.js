import React from "react";
import TagLink from "./TagLink";
import StockLinks from "../container/StockLinks";
import {
  findPopularStocks,
  findUpComingStocks,
  findPopularTags,
  extractShuffle,
} from "../utils/GenUtils";
import { userStocks } from "../utils/UserUtils"
import { useAuth } from "../context/use-auth";
import { NavLink } from "react-router-dom";
function Dashfolio() {
  let { stocks, user } = useAuth();

  // consider adding to utils
  let togTags = extractShuffle(findPopularTags(stocks), 5);
  let popularStocks = extractShuffle(findPopularStocks(stocks), 7);
  let upComingStocks = extractShuffle(findUpComingStocks(stocks), 7);
  return (
    <>
      User Stocks
      <StockLinks stocks={stocks ? userStocks(stocks) : false} />
      Explore Popular Tags
      <hr />
      {togTags.map((t) => (
        <TagLink title={t[0]} />
      ))}
      Explore Popular Stocks
      <StockLinks stocks={stocks ? popularStocks : null} />
      Explore Up and Coming Stocks
      <StockLinks stocks={stocks ? upComingStocks : null} />
      <hr />
      <strong>
        {" "}
        <NavLink to={{ pathname: "/allStocks" }}>View All Stocks</NavLink>{" "}
      </strong>
    </>
  );
}

export default Dashfolio;
