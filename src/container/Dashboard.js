import React, {useEffect} from 'react';
import Dashfolio from '../components/Dashfolio';
import { useAuth } from '../context/use-auth';

function Dashboard() {
    let auth = useAuth();
    // useEffect(() => {
    //     (() => {
    //       auth.signInFromToken()
    //     })();
    //   }, [])
    const currentTotal = () => {
        // console.log('hello')
        // auth.user.user_owned_stocks.map(userData => {
        //    let stock = auth.stocks.find((stock) => stock.id == userData.stock_id)
        //    console.log(stock.latestPrice * userData.sharesOwned)
        // })
    }
    return (
        <> 
        {auth.user && currentTotal()}
        <h3>Buying Power: ${auth.user?.usdBalance}</h3>
        <h3>Capital Invested: ${auth.user?.totalInvested} </h3>
        <h3>Total Equity: </h3>
        <Dashfolio/>
        </>
    )
}

export default Dashboard;