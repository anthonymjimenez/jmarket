import React  from 'react';
import { NavLink } from 'react-router-dom';
import { financial } from '../utils/GenUtils'; 

function StockLink({name, symbol, userData}) {

  return (
    <>
    <NavLink to={{pathname: `/stocks/${symbol}`}}>
            <p>{name}{symbol} {userData ? <>(Shares: {userData.sharesOwned} )</> : <></>} </p> 
      </NavLink>
  
    </>
  );
}

export default StockLink;