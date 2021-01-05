import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { financial } from "../utils/GenUtils";
import { Table } from "react-bootstrap";
import { useAuth } from "../context/use-auth";
import UserStockTableBody from "../components/UserStockTableBody";
import Sort from "../components/Sort";
function UserStockTableContainer() {
  let { stocks } = useAuth();
  let userStocks = () => stocks && stocks.filter((s) => s.userData) 
  let [sortedStocks, setSortedStocks] = useState(false);
  let [sortBy, setSortBy] = useState(null);
  let [sortCheck, setSortCheck] = useState(false);



  
  
  return (
    <>
      <Sort setSortedStocks={setSortedStocks} sortBy={sortBy} sortCheck={sortCheck} stocks={userStocks()}/>

      <h3>Owned Stocks</h3>
      <Table striped bordered hover>
        <thead>
          <tr onClick={() => setSortCheck(!sortCheck)}>
            <th onClick={() => setSortBy("name")}>Company Name</th>
            <th onClick={() => setSortBy("symbol")}>Symbol</th>
            <th onClick={() => setSortBy("sharesOwned")}>Shares Owned</th>
            <th onClick={() => setSortBy("latestPrice")}>Current Price</th>
            <th onClick={() => setSortBy("averageCost")}>Average Cost</th>
            <th onClick={() => setSortBy("totalReturn")}>Total Return</th>
            <th onClick={() => setSortBy("totalCost")}>Total Cost</th>
          </tr>
        </thead>
        {stocks ? (
          <UserStockTableBody stocks={sortedStocks ? sortedStocks : userStocks()} />
        ) : (
          <p>Loading..</p>
        )}
      </Table>
    </>
  );
}

export default UserStockTableContainer;
