import React, { useEffect, useState } from "react";
import { useAuth } from "../context/use-auth";
import { useLocation } from "react-router-dom";
import { isoId } from "../utils/GenUtils";
import StockFormContainer from "./StockFormContainer";

function StockCard() {
  let auth = useAuth();
  const location = isoId(useLocation());
  let [stock, setStock] = useState({});

  useEffect(() => {
    (auth.stocks) && setStock(auth.stocks?.find((s) => s.symbol === location));
  }, [auth]);

  return (
    <>
      {console.log(stock)}
      {stock ? (
        <>
          <h3>
            {stock.name}({stock.symbol}){" "}
          </h3>
          <h3>Price/Earnings Ratio: {stock.peRatio} </h3>
          <h3>Market Cap: ${stock.marketCap} </h3>
          <h3>Year High: ${stock.yearHigh} </h3>
          <h3>Year Low: ${stock.yearLow} </h3>
          <h3>Year To Date Change: {stock.ytdChange}%</h3>
          <h3>Current Price: ${stock.latestPrice} </h3>
          <hr />
          User Buying Power: {auth.user && auth.user?.usdBalance}
          {stock.userData && (
            <>
              <h3>Owned Shares: {stock.userData?.sharesOwned}</h3>
              <h3>Total Cost: ${stock.userData?.totalCost}</h3>
              <h3>Average Cost: ${stock.userData?.averageCost }</h3>
              <h3></h3>
            </>
          )}
          <StockFormContainer
            auth={auth}
            stock={stock}
            userOwned={stock.userData}
          />
          <hr />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default StockCard;
