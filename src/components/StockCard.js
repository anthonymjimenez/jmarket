import React, { useEffect, useState } from "react";
import { useAuth } from "../context/use-auth";
import { useLocation } from "react-router-dom";
import { isoId, financial } from "../utils/GenUtils";
import StockFormContainer from "./StockFormContainer";
import TagLink from './TagLink';
import CompanyInfo from './CompanyInfo'; 

function StockCard() {
  const location = isoId(useLocation());
  let [stock, setStock] = useState({});
  let { user, stocks, findStock, findUserStock} = useAuth();
  
  useEffect(() => {
    console.log('helllooooo')
    setStock(findStock(location))
  }, [stocks, stock])
//MUST BE CAUSE OF HOW I GRAB IT, CHANGE TO  AFILTERUTIL

  const renderTags = () =>
    findStock(location).tags.filter(s => !s.split('').includes('/', ',')).map(title => <TagLink title={title}/>)
  //make stockInfo component 
   return (
    <>
      {findStock(location) ? (
        <>
          <h3>
            {findStock(location).name}({findStock(location).symbol}){" "}
          </h3>
          <h4>Price/Earnings Ratio: {  findStock(location).peRatio} </h4>
          <h4>Market Cap: ${findStock(location).marketCap} </h4>
          <h4>Year High: ${findStock(location).yearHigh} </h4>
          <h4>Year Low: ${findStock(location).yearLow} </h4>
          {/* <h4>Year To Date Change: {financial(findStock(location).ytdChange) * 100}%</h4> */}
          <h4>Current Price: ${findStock(location).latestPrice} </h4>
          <h4>Daily Change: ${findStock(location).dailyChange}</h4>
          <h4>Daily Change(%): {financial(findStock(location).dailyChangePercent) * 100}%</h4>
          <h4>Tags: </h4> {renderTags()} 
          <hr />
          {findUserStock(location) && (
            <>
              <h3>Owned Shares: {financial(findUserStock(location).sharesOwned)}</h3>
              <h3>Total Cost: ${financial(findUserStock(location).totalCost)}</h3>
              <h3>Average Cost: ${financial(findUserStock(location).averageCost) }</h3>
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
