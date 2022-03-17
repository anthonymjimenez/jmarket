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
          <td>
            {stock.dailyChangePercent * 100 > 0 ? <>&#8593;</> : <> &#8595;</>}{" "}
            {Math.abs(financial(stock.dailyChangePercent * 100))}%{" "}
          </td>
          <td>{stock.marketCap}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default TagStockTableBody;
