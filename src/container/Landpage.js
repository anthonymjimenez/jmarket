import React, { useEffect, useState } from "react";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import { Tabs, Tab, TabsContainer, Container, Row, Col } from "react-bootstrap";

export default function Landpage() {
  // const auth = useAuth();

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Welcome to jHood!</h1>
            <h3>An online Stock Market Exchange</h3>
            <img
              src="https://i.imgur.com/cmDG09D.png"
              width="300"
              height="300"
              alt="Logo for jHood"
            />
          </Col>
          <Col>
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

// const renderForm = () =>
//   toggleForms ? (
//     <LoginForm handleLogIn={auth.signin} />
//   ) : (
//     <SignupForm handleSignUp={auth.signup} />
//   );
