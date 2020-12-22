import React, { useState, useEffect } from "react";
import { financial } from '../utils/GenUtils'
import { useAuth } from "../context/use-auth";

export default function StockForm({ type, stock, handleSubmit }) {
    
    let [shares, setShares] = useState(0)
    let { user } = useAuth()
    const handleShareChanges = (e) => {
       setShares(e.target.value)
   }

   const submit = (e) => {
        e.preventDefault();
        handleSubmit(shares)
   }
  return (
    <div>
       <h2> {type === 'buy' ? <>Purchase</> : <>Sell</>} {stock.symbol} </h2>
      <form className="ui form" onSubmit={submit}>
        <div className="field">
          <label>Shares</label>
          <input
            value={shares}
            onChange={handleShareChanges}
            type="number"
            placeholder="shares"
          />
        </div>
       
        <h3>{type === 'buy' ? <>Estimated Cost</> : <>Estimated Credit</>} ${shares * stock.latestPrice}</h3> 
        { type === 'buy' ? <h3>Buying Power: ${user.usdBalance} </h3> : <h3>{stock.userData?.sharesOwned} Shares available</h3>}
  
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}