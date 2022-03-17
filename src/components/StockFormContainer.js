import React, { useState, useEffect } from "react";
import StockForm from "./StockForm";
import { financial } from "../utils/GenUtils";
import { Tabs, Tab, TabsContainer } from "react-bootstrap";
import { useAuth } from "../context/use-auth";

export default function StockFormContainer({ stock, userOwned }) {
  let auth = useAuth();
  const handleSellSubmit = (shares) => {
    auth.sellStock({
      shares: parseFloat(shares),
      stock_id: stock.id,
      user_stock_id: userOwned.id,
    });
  };

  const handleBuySubmit = (shares) => {
    userOwned
      ? auth.buyStock({
          shares: parseFloat(shares),
          user_stock_id: userOwned.id,
        })
      : auth.createStock({
          shares: parseFloat(shares),
          stock_id: stock.id,
          user_id: auth.user.id,
        });
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="home"
        disabled={false}
        transition={false}
        id="noanim-tab-example"
      >
        <Tab eventKey="home" title="Buy">
          <StockForm
            type={"buy"}
            stock={stock}
            handleSubmit={handleBuySubmit}
          />
        </Tab>
        <Tab
          eventKey="profile"
          title="Sell"
          disabled={userOwned ? false : true}
        >
          {userOwned ? (
            <StockForm
              type={"sell"}
              stock={stock}
              handleSubmit={handleSellSubmit}
              sharesOwned={userOwned.sharesOwned}
            />
          ) : (
            <h3>You own 0 shares of {stock?.name}</h3>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
