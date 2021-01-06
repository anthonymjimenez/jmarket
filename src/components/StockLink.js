import React  from 'react';
import { NavLink } from 'react-router-dom';
import { financial } from '../utils/GenUtils'; 

function StockLink({name, symbol, userData}) {

  return (
    <>
    <NavLink to={{pathname: `/stocks/${symbol}`}}>
            <p><strong>{symbol}</strong> <small>({name}) {userData ? <>(Shares: {userData.sharesOwned} )</> : <></>} </small></p> 
      </NavLink>
  
    </>
  );
}

export default StockLink;