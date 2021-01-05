import React from "react";
import { NavLink } from "react-router-dom";
import { financial } from "../utils/GenUtils";
import { Table } from "react-bootstrap";
function TagStockTableBody({ stocks }) {
  return (
    <tbody>
      {stocks.map((stock) => (
        <tr>
          <td>{stock.name}</td>
          <td>{stock.symbol}</td>
          <td>{stock.latestPrice}</td>
          <td>{stock.marketCap}</td>
          <td>{stock.userData ? stock.userData.sharesOwned : <p>0</p> }</td>
        </tr>
      ))}
    </tbody>
  );
}

export default TagStockTableBody;
