import React, { useState, useEffect } from "react";
import StockLink from "./StockLink";
import { useAuth } from "../context/use-auth";
import { Form } from "react-bootstrap";
import {
  sortAlphaAsc,
  sortAlphaDesc,
  sortNumDesc,
  sortNumAsc,
} from "../utils/SortUtils";

export default function Sort({ setSortedStocks, sortBy, sortCheck, stocks }) {
  //make comp starting on line below (props - setSortedStocks, sortBy, sortCheck, userStocks)
  let [lastSort, setLastSort] = useState("");
  let [sortCount, setSortCount] = useState(0);

  useEffect(() => {
    setLastSort(sortBy);
    if (sortBy != null) {
      //sort and change sortedStocks
      //setSortedStocks(sortFunction(sortBy-value))
      // if(lastSort !== sortBy) setSortCount(1)
      sortBy == "symbol" || sortBy == "name"
        ? lastSort == sortBy && sortCount % 2 == 0
          ? setSortedStocks(sortAlphaAsc(sortBy, stocks))
          : setSortedStocks(sortAlphaDesc(sortBy, stocks))
        : lastSort == sortBy && sortCount % 2 == 0
        ? setSortedStocks(sortNumAsc(sortBy, stocks))
        : setSortedStocks(sortNumDesc(sortBy, stocks));
    }
    lastSort == sortBy ? setSortCount(sortCount + 1) : setSortCount(0);
    // if(sortCount > 3) setSortCount(0)
  }, [sortBy, sortCheck]);

  return <></>;
}
