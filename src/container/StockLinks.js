import React from "react";
import StockLink from "../components/StockLink";
import { useAuth } from "../context/use-auth";

const StockLinks = ({stocks}) => {


  const renderLinks = () => 
      stocks && stocks.map((stock, index) => <StockLink key={index} name={""} symbol={stock.symbol} userData={stock.userData}/>)
  
 return (
    <div>
      <hr/>
      
        {renderLinks()}
    </div>
  );
};
export default StockLinks;