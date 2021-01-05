import React, { useEffect, useState } from 'react';
import StockLinks from '../container/StockLinks'
import { useAuth } from '../context/use-auth';
function Dashfolio() {
    let {stocks, user} = useAuth()
    return (
        <>
        User Stocks
        <StockLinks stocks={user.stocks}/>
        {console.log(user.stocks)}
        All Stocks
        <StockLinks stocks={stocks}/>

        
        </>
    )
}

export default Dashfolio;