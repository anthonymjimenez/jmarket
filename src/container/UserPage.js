import React, { useEffect, useState } from "react";
import UserStockTableContainer from "../container/UserStockTableContainer";
import { Tabs, Tab, TabsContainer, ListGroup } from "react-bootstrap";
import { useAuth } from "../context/use-auth";

export default function UserPage() {
  let { user } = useAuth();
  return (
    <>
      User Page
      <Tabs
        defaultActiveKey="home"
        disabled={false}
        transition={false}
        id="noanim-tab-example"
      >
        <Tab eventKey="home" title="User Stocks">
          <UserStockTableContainer />
        </Tab>
        <Tab eventKey="profile" title="Account Info">
          <ListGroup>
            <ListGroup.Item>Username: {user.username}</ListGroup.Item>
            <ListGroup.Item>Balance: {user.usdBalance}</ListGroup.Item>
            <ListGroup.Item>Invested: {user.totalInvested}</ListGroup.Item>
            <ListGroup.Item>Created at: {user.created_at}</ListGroup.Item>
          </ListGroup>
        </Tab>
      </Tabs>
    </>
  );
}

// const renderForm = () =>
//   toggleForms ? (
//     <LoginForm handleLogIn={auth.signin} />
//   ) : (
//     <SignupForm handleSignUp={auth.signup} />
//   );
