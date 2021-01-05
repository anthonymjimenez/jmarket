import React from "react";
import { NavLink } from "react-router-dom";
import { financial } from "../utils/GenUtils";
import { Table } from "react-bootstrap";
function TagStockTableBody({ stocks }) {
  return (
    <tbody>
      {stocks.map((stock) => (
        <tr>
          <td>
            <NavLink to={{ pathname: `/stocks/${stock.symbol}` }}>
              {stock.name}
              {stock.userData ? (
                <>
                  {" "}
                  <br />
                  <small>&#10003; {stock.userData.sharesOwned} Shares</small>
                </>
              ) : null}
            </NavLink>
          </td>
          <td>{stock.symbol}</td>
          <td>{stock.latestPrice}</td>
          <td>{stock.dailyChangePercent}</td>
          <td>{stock.marketCap}</td>
          <td>{}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default TagStockTableBody;
