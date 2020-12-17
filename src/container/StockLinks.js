import React from "react";
import StockLink from "../components/StockLink";
import { useAuth } from "../context/use-auth";

const StockLinks = () => {
  let { stocks } = useAuth()

  const renderLinks = () => 
    stocks && stocks.map((stock, index) => <StockLink key={index} stock={stock}/>)
  
 return (
    <div>
        {renderLinks()}
    </div>
  );
};
export default StockLinks;