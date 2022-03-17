import React, { useState } from "react";
import Dashfolio from "../components/Dashfolio";
import SearchStock from "../components/SearchStocks";
import TagStockTableBody from "../components/TagStockTable";
import { Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import { useAuth } from "../context/use-auth";
import { financial, isoId } from "../utils/GenUtils";
import Sort from "../components/Sort";
function TagPage() {
  let { stocks } = useAuth();
  const tag = isoId(useLocation());
  let [sortedStocks, setSortedStocks] = useState(false);
  let [sortBy, setSortBy] = useState(null);
  let [sortCheck, setSortCheck] = useState(false);

  let stocksByTag = () => stocks && stocks.filter((s) => s.tags.includes(tag));

  return (
    <>
      <h2>{tag}</h2>
      <Sort
        setSortedStocks={setSortedStocks}
        sortBy={sortBy}
        sortCheck={sortCheck}
        stocks={stocksByTag()}
      />
      <SearchStock stocks={stocksByTag()} />
      <Table striped bordered hover>
        <thead>
          <tr onClick={() => setSortCheck(!sortCheck)}>
            <th onClick={() => setSortBy("name")}>Company Name</th>
            <th onClick={() => setSortBy("symbol")}>Symbol</th>
            <th onClick={() => setSortBy("latestPrice")}>Current Price</th>
            <th onClick={() => setSortBy("dailyChangePercent")}>Today (%)</th>
            <th onClick={() => setSortBy("marketCap")}>Market Cap</th>
          </tr>
        </thead>
        {stocks ? (
          <TagStockTableBody
            stocks={sortedStocks ? sortedStocks : stocksByTag()}
          />
        ) : (
          <p>Loading..</p>
        )}
      </Table>
    </>
  );
}

export default TagPage;
