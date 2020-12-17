import React, { useState, useEffect } from "react";
import { financial } from '../utils/utils'

export default function StockForm({ auth, stock_id, user_stock_id=-1, userOwned}) {
  const [state, setState] = useState({
    shares: 0.001,
    type: "buy",
    user_id: auth.user?.id,
    stock_id: stock_id,
    user_stock_id: user_stock_id
  });

  const handleChange = (e) => {
    let val = e.target.value;
    if (e.target.placeholder === "type") {
      val = e.target.checked ? "buy" : "sell";
    } 
    setState({ ...state, [e.target.placeholder]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(userOwned) {
    (state.type == 'buy') ? auth.buyStock(state) : auth.sellStock(state)
    } else {
        console.log('hello')
        auth.createStock(state)
    }

    // if (state.size * state.crypto.price > user.balance) {
    //   window.alert("You don't have enough money :(")
    // } else {
    //   fetch("http://localhost:3000/api/v1/transactions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   body: JSON.stringify(state),
    // })
    //   .then((data) => data.json())
    //   .then(console.log(user))
    //   // .then(updateCryptos)
    //   // .then((data) => {
    //   //   console.log(data);
    //   // })
    //   .catch(console.log);
    // }
    
  };


  return (
    <div>
      <h1>Purchase</h1>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Size</label>
          <input
            value={state.size}
            onChange={handleChange}
            type="number"
            placeholder="shares"
          />
        </div>
        <div>
          Buy
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={state.type === "buy"}
              onChange={handleChange}
              placeholder="type"
            />
            <span className="switch" />
          </label>
        </div>

        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}