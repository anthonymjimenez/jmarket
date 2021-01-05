import React, { useState, useEffect } from "react";
import StockLink from "./StockLink";
import { useAuth } from "../context/use-auth";
import { Form } from "react-bootstrap";

export default function SearchStock({ stocks }) {
  const [search, setSearchResults] = useState([]);
  const [searchTerm, setTerm] = useState(null);

  useEffect(() => {
    searchTerm === null
      ? setSearchResults([])
      : searchTerm !== ""
      ? setSearchResults(
          stocks
            .filter((s) =>
              s.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((s) => s)
        )
      : setSearchResults([]);
  }, [searchTerm, stocks]);

  return (
    <>
      <hr />
      <br />
      <Form>
        Explore the Market:{" "}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setTerm(e.target.value)}
        />
        <br />
        Search By:{" "}
        <Form.Check checked={true} type={"radio"} label={"Company Name"} />
        <Form.Check type={"radio"} checked={false} label={"Symbol"} />
      </Form>
      <hr /> <br />
      {search.map((stock) => (
        <StockLink name={""} symbol={stock.symbol} userData={stock.userData} />
      ))}
    </>
  );
}
