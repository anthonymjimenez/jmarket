import React, { useEffect, useState } from "react";
import { useAuth } from "../context/use-auth";
import { useLocation } from "react-router-dom";
import { isoId, financial } from "../utils/GenUtils";
import StockFormContainer from "./StockFormContainer";
import TagLink from './TagLink';
import CompanyInfo from './CompanyInfo'; 

function StockCard() {
  const location = isoId(useLocation());
  let { findStock, findUserStock} = useAuth();
  let stock = findStock(location)
  let userStock = findUserStock(location)
  
  const renderTags = () =>
    findStock(location)?.tags?.filter(s => !s.split('').includes('/', ',')).map(title => <TagLink title={title}/>)
  //make stockInfo component 
   return (
    <>
      {stock ? (
        <>
          <h3>
            {stock.name}({stock.symbol}){" "}
          </h3>
          <h4>Price/Earnings Ratio: {stock.peRatio} </h4>
          <h4>Market Cap: ${stock.marketCap} </h4>
          <h4>Year High: ${stock.yearHigh} </h4>
          <h4>Year Low: ${stock.yearLow} </h4>
          {/* <h4>Year To Date Change: {financial(findStock(location).ytdChange) * 100}%</h4> */}
          <h4>Current Price: ${stock.latestPrice} </h4>
          <h4>Daily Change: ${stock.dailyChange}</h4>
          <h4>Daily Change(%): {financial(stock.dailyChangePercent) * 100}%</h4>
          <h4>Tags: </h4> {renderTags()} 
          <hr />
          {userStock && (
            <>
              <h3>Owned Shares: {financial(userStock.sharesOwned)}</h3>
              <h3>Total Cost: ${financial(userStock.totalCost)}</h3>
              <h3>Average Cost: ${financial(userStock.averageCost) }</h3>
              <h3></h3>
            </>
          )}
          <StockFormContainer
            stock={findStock(location)}
            userOwned={findUserStock(location)}
          />
          <hr />
          <CompanyInfo stock={findStock(location)} />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default StockCard;
