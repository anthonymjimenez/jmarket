function CompanyInfo({stock}) {
  
  return (
    <>
    {stock && 
     <>
     {console.log(stock)}
     <h4>Company Info</h4>
     {stock.description ? <> <h5>Description: </h5> <small><p>{stock.description}</p> </small></> : null}
     <h5>Sector: {stock.sector}</h5>
     <h5>{ stock.address ? <> Address: {stock.address} {stock.city} {stock.state} {stock.country} </> : null }</h5>
     <h5>{ stock.CEO ? <>CEO: {stock.CEO} </> : null }</h5>
     <h5>{stock.website ? <>Website: <a href={stock.website}>{stock.symbol} </a> </> : null}</h5>
     </>
    }
    </>
  );
}

export default CompanyInfo;
