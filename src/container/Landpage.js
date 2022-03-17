import React, { useEffect, useState } from "react";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import { Tabs, Tab, TabsContainer } from "react-bootstrap";

export default function Landpage() {
  let [toggle, setToggle] = useState(false);
  // const auth = useAuth();

  return (
    <>
      <img src="https://i.imgur.com/cmDG09D.png" width="300" height="300" />

      <h1>Welcome to jHood!</h1>
      <h3>An online Stock Market Exchange</h3>

      <Tabs
        defaultActiveKey="logIn"
        disabled={false}
        transition={false}
        id="noanim-tab-example"
      >
        <Tab eventKey="logIn" title="Log In">
          <SignIn />
        </Tab>
        <Tab eventKey="signUp" title="Sign Up">
          <SignUp />
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
