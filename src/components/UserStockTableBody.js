import React from "react";
import { NavLink } from "react-router-dom";
import { financial } from "../utils/GenUtils";
import { Table } from "react-bootstrap";
function UserStockTableBody({ stocks }) {
  return (
    <tbody>
      {stocks.map((stock) => (
        <tr>
          <td>{stock.name}</td>
          <td>{stock.symbol}</td>
          <td>{stock?.userData.sharesOwned}</td>
          <td>{stock.latestPrice}</td>
          <td>{stock?.userData.averageCost}</td>
          <td>{stock?.userData.totalReturn}</td>
          <td>{stock?.userData.totalReturn + stock?.userData.totalCost}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default UserStockTableBody;
