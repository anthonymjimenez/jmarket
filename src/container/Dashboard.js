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
    return (
        <> 
        <h3>Buying Power: ${auth.user?.usdBalance}</h3>
        <h3>Capital Invested: ${auth.user?.totalInvested} </h3>
        <Dashfolio/>
        </>
    )
}

export default Dashboard;