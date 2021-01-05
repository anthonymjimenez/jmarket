import React, { useEffect }  from 'react';
import { NavLink } from 'react-router-dom';
import { financial } from '../utils/GenUtils'; 
import { Table } from 'react-bootstrap';
import { useAuth } from '../context/use-auth';
import UserStockTableBody from '../components/UserStockTableBody'
function UserStockTableContainer() {
    let { stocks } = useAuth();
    let [sortedStocks, setSortedStocks] = useState([])
    let [sortBy, setSortBy] = useState(null)
    
    let userStocks = () => 
        stocks.filter((s) => s.userData)
    
    useEffect(() => {
      // if sortBy doesnt equal null then sort stocks 
      // by property and save to sortedStocks
      
      // else set sortedStocks to userStocks
      // reset sortBy to null
      stocks && setSortedStocks(userStocks())
      if(sortBy != null) {
        //sort and change sortedStocks
        //setSortedStocks(sortFunction(sortBy-value))
      }
      setSortBy(null)


    }, [sortBy])
  return (
    <>
    <h3>Owned Stocks</h3>
 <Table striped bordered hover>
  <thead>
    <tr>
      <th onClick={() => setSortBy('name')}>Company Name</th>
      <th>Symbol</th>
      <th>Shares Owned</th>
      <th>Current Price</th>
      <th>Average Cost</th>
      <th>Total Return</th>
      <th>Equity</th>
    </tr>
  </thead>
  {stocks ?  <UserStockTableBody stocks = {userStocks()} /> : <p>Loading..</p> }

</Table>
  
    </>
  );
}

export default UserStockTableContainer;