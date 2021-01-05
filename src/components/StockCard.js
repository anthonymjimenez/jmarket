import React, { useEffect, useState } from "react";
import { useAuth } from "../context/use-auth";
import { useLocation } from "react-router-dom";
import { isoId } from "../utils/GenUtils";
import StockFormContainer from "./StockFormContainer";
import TagLink from './TagLink';

function StockCard() {
  const location = isoId(useLocation());
  let [stock, setStock] = useState({});
  let { user, stocks, findStock, findUserStock} = useAuth();
  
  useEffect(() => {
    console.log('helllooooo')
    setStock(findStock(location))
  }, [stocks, stock])
//MUST BE CAUSE OF HOW I GRAB IT, CHANGE TO  AFILTERUTIL

  const renderTags = () => {
    stock && stock.tags.map(({title}) => <TagLink title={title}/>)
}
   return (
    <>
    {console.log(findStock(location))}
      {findStock(location) ? (
        <>
          <h3>
            {findStock(location).name}({findStock(location).symbol}){" "}
          </h3>
          <h3>Price/Earnings Ratio: {  findStock(location).peRatio} </h3>
          <h3>Market Cap: ${findStock(location).marketCap} </h3>
          <h3>Year High: ${findStock(location).yearHigh} </h3>
          <h3>Year Low: ${findStock(location).yearLow} </h3>
          <h3>Year To Date Change: {findStock(location).ytdChange}%</h3>
          <h3>Current Price: ${findStock(location).latestPrice} </h3>
          <h4>Tags: {renderTags()} </h4>
          <hr />
          User Buying Power: {user && user?.usdBalance}
          {findUserStock(location) && (
            <>
              <h3>Owned Shares: {findUserStock(location).sharesOwned}</h3>
              <h3>Total Cost: ${findUserStock(location).totalCost}</h3>
              <h3>Average Cost: ${findUserStock(location).averageCost }</h3>
              <h3></h3>
            </>
          )}
          <StockFormContainer
            stock={findStock(location)}
            userOwned={findUserStock(location)}
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
