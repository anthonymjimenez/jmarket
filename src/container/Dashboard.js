import React, {useEffect} from 'react';
import Dashfolio from '../components/Dashfolio';
import SearchStock from '../components/SearchStocks';
import { useAuth } from '../context/use-auth';
import { financial } from '../utils/GenUtils'
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
        <SearchStock stocks ={auth.stocks}/>
        {auth.user && currentTotal()}
        <h3>Portfolio Value:${financial(auth.user?.totalInvested + 35)}(+5%) </h3>
        <h3>Total Invested: {financial(auth.user?.totalInvested)}</h3>
        <h4>Buying Power: ${auth.user?.usdBalance}</h4>

        <Dashfolio/>
        </>
    )
}

export default Dashboard;