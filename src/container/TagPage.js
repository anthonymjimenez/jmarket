import React, {useEffect} from 'react';
import Dashfolio from '../components/Dashfolio';
import SearchStock from '../components/SearchStocks';
import TagStockTableBody from '../components/TagStockTable';
import { useAuth } from '../context/use-auth';
import { financial } from '../utils/GenUtils'
function TagPage() {
    let { stocks } = useAuth();
    const tag = isoId(useLocation());
    
    let stocksByTag = () => 
        stocks.filter((s) => s.tags.includes(tag))

    return (
        <>
        <Table striped bordered hover>
  <thead>
    <tr>
      <th onClick={() => console.log("hello")}>Company Name</th>
      <th>Symbol</th>
      <th>Current Price</th>
      <th>Market Cap</th>
      <th>Shares Owned</th>
    </tr>
  </thead>
  {stocks ?  <TagStockTableBody stocks={stocksByTag()}/> : <p>Loading..</p> }

</Table>
        </>
    )
}

export default TagPage;