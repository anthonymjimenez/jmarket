import React, { useState, useEffect } from "react";
import { financial } from '../utils/utils'

export default function StockForm({ stock, user}) {
  const [state, setState] = useState({
    shares: 0.001,
    type: "buy",
    user_id: user?.id,
    stock: {},
  });

  const handleChange = (e) => {
    let val = e.target.value;
    if (e.target.placeholder === "side") {
      val = e.target.checked ? "buy" : "sell";
    } 
    setState({ ...state, [e.target.placeholder]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.size * state.crypto.price > user.balance) {
      window.alert("You don't have enough money :(")
    } else {
      fetch("http://localhost:3000/api/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(state),
    })
      .then((data) => data.json())
      .then(console.log(user))
      .then(updateBalance)
      // .then(updateCryptos)
      // .then((data) => {
      //   console.log(data);
      // })
      .catch(console.log);
    }
    
  };

  // add to css
  const formDivStyle = {
    margin: "auto",
    padding: "20px",
    width: "80%",
  };

  return (
    <div style={formDivStyle}>
      <h1>Add Crypto to your Blockfolio</h1>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Size</label>
          <input
            value={state.size}
            onChange={handleChange}
            type="number"
            placeholder="size"
          />
        </div>
        <h2>Total price: ${financial(state.size * state.crypto.price)}</h2>
        <div>
          Buy
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={state.side === "buy"}
              onChange={handleChange}
              placeholder="side"
              disabled={true}
            />
            <span className="switch" />
          </label>
        </div>
        <div className="field">
          <label>Hold Price</label>
          <input
            value={state.hold_price}
            onChange={handleChange}
            type="number"
            placeholder="hold_price"
          />
        </div>
        <div className="field">
          <label>Stop Limit</label>
          <input
            value={state.stop_limit}
            onChange={handleChange}
            type="number"
            placeholder="stop_limit"
          />
        </div>

        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}