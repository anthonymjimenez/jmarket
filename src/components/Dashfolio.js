import React, { useEffect, useState } from 'react';
import TagLink from './TagLink';
import StockLinks from '../container/StockLinks';
import {findPopularStocks, findUpComingStocks, findPopularTags, shuffle, extractShuffle} from '../utils/GenUtils';
import { useAuth } from '../context/use-auth';
function Dashfolio() {
    let {stocks, user} = useAuth()
    
 
    let togTags = extractShuffle(findPopularTags(stocks), 5)
    //let popularStocks = shuffle(findPopularStocks(stocks))
    return (
        <>
        
        User Stocks
        <StockLinks stocks={stocks ? stocks?.filter((s) => s.userData) : false } />

        Explore Popular Tags
        <hr/>
        {togTags.map(t => <TagLink title ={t[0]} /> )}

        Explore Popular Stocks
        <StockLinks stocks={stocks ? extractShuffle(findPopularStocks(stocks), 7) : null }/>

        Explore Up and Coming Stocks
        <StockLinks stocks={stocks ? extractShuffle(findUpComingStocks(stocks), 7) : null }/>
        
        </>
    )
}

export default Dashfolio;