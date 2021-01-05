import React, { useEffect, useState } from 'react';
import StockLinks from '../container/StockLinks'
import { useAuth } from '../context/use-auth';
function Dashfolio() {
    let {stocks, user} = useAuth()
    
    const findPopularTags = () => {
     let adminTags = (stocks && stocks.map(s => s.tags).flat().reduce(function (allNames, name) {
        if (name in allNames) {
          allNames[name]++
        }
        else {
          allNames[name] = 1
        }
        return allNames

      }, {}))
      var sortable = [];

      for (var tag in adminTags) {
          sortable.push([tag, adminTags[tag]])
      }

      sortable.sort((a,b) => b[1] - a[1])
      
      let topTags = sortable.slice(0, 25)

    }
      findPopularTags()
    return (
        <>
        
        User Stocks
        <StockLinks stocks={stocks ? stocks?.filter((s) => s.userData) : false } />
        All Stocks
        <StockLinks stocks={stocks}/>

        
        </>
    )
}

export default Dashfolio;