import React  from 'react';
import { NavLink } from 'react-router-dom';
import { financial } from '../utils/utils'; 

function StockLink({ stock }) {

  return (
    <>
    {console.log(stock)}
    <NavLink to={{pathname: `/stocks/${stock.symbol}`}}>
            <p>{stock.symbol}</p> 
      </NavLink>
  
    </>
  );
}

export default StockLink;