import React, { useState } from "react";
import SearchStock from "../components/SearchStocks";
import TagStockTableBody from "../components/TagStockTable";
import { Table } from "react-bootstrap";
import { useAuth } from "../context/use-auth";
import Sort from "../components/Sort";

function AllStocksPage() {
  let { stocks } = useAuth();
  let [sortedStocks, setSortedStocks] = useState(false);
  let [sortBy, setSortBy] = useState(null);
  let [sortCheck, setSortCheck] = useState(false);

  return (
    <>
      <h2>Explore Todays Market!</h2>
      <Sort
        setSortedStocks={setSortedStocks}
        sortBy={sortBy}
        sortCheck={sortCheck}
        stocks={stocks}
      />
      <SearchStock stocks={stocks} />
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
            stocks={
              sortedStocks
                ? sortedStocks
                : stocks.filter((s) => s.symbol !== "DASH")
            }
          />
        ) : (
          <p>Loading..</p>
        )}
      </Table>
    </>
  );
}

export default AllStocksPage;
