import React, { useState, useEffect } from "react";
import StockLink from "./StockLink";
import { useAuth } from "../context/use-auth";
import { allTags } from "../utils/GenUtils";
import { Form } from "react-bootstrap";

export default function SearchStock({ stocks }) {
  const [search, setSearchResults] = useState([]);
  const [searchTerm, setTerm] = useState(null);

  useEffect(() => {
    searchTerm === null
      ? setSearchResults([])
      : searchTerm !== ""
      ? setSearchResults([
          ...stocks
            .filter((s) =>
              s.symbol.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((s) => s)
            .slice(0, 6),
        ])
      : setSearchResults([]);
  }, [searchTerm, stocks]);

  return (
    <>
      <hr />
      <br />
      {console.log(allTags(stocks))}
      <Form>
        Explore the Market:{" "}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setTerm(e.target.value)}
        />
        <br />
        {/* Search By:{" "}
        <Form.Check checked={true} type={"radio"} label={"Company Name"} />
        <Form.Check type={"radio"} checked={false} label={"Symbol"} /> */}
      </Form>
      <hr /> <br />
      {console.log("SEARCH", search)}
      {search.map((stock) => (
        <>
          {console.log(stock)}
          <StockLink
            name={stock.name}
            symbol={stock.symbol}
            userData={stock.userData}
          />
        </>
      ))}
    </>
  );
}
