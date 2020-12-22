import React  from 'react';
import { NavLink } from 'react-router-dom';
import { financial } from '../utils/GenUtils'; 

function StockLink({ stock }) {

  return (
    <>
    {console.log(stock)}
    <NavLink to={{pathname: `/stocks/${stock.symbol}`}}>
            <p>{stock.symbol} {stock.userData ? <>(Shares: {stock.userData.sharesOwned} )</> : <></>} </p> 
      </NavLink>
  
    </>
  );
}

export default StockLink;