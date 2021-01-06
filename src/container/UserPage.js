import React, { useEffect, useState } from "react";
import UserStockTableContainer from "../container/UserStockTableContainer";
import { Tabs, Tab, TabsContainer } from "react-bootstrap";

export default function UserPage() {
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
          c
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
