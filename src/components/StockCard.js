import React, { useEffect, useState } from "react";
import { useAuth } from "../context/use-auth";
import { useLocation } from "react-router-dom";
import { isoId } from "../utils/utils";
import StockForm from "./StockForm";

function StockCard() {
  let auth = useAuth();
  const location = isoId(useLocation());
  console.log(auth.stocks, location);
  if (auth.stocks) {
    var stock = auth.stocks?.find((s) => s.symbol == location);
    var userData =
      stock.user_owned_stocks.length == 1 ? stock.user_owned_stocks[0] : false;
  }
  return (
    <>
      {stock ? (
        <>
          <h3>
            {stock.name}({stock.symbol}){" "}
          </h3>
          <h3>Price/Earnings Ratio: {stock.peRatio} </h3>
          <h3>Market Cap: {stock.marketCap} </h3>
          <h3>Year High: {stock.yearHigh} </h3>
          <h3>Year Low: {stock.yearLow} </h3>
          <hr />
          {stock.user_owned_stocks.length == 1 ? (
            <>
              <h3>Owned Shares: {userData.sharesOwned}</h3>
              <StockForm auth ={auth} stock_id = {stock.id} user_stock_id ={userData.id} userOwned={true}/>
            </>
          ) : <StockForm auth ={auth} stock_id = {stock.id} userOwned={false}/>
          }
            <hr />

        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default StockCard;
