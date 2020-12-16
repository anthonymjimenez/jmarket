import React, { useEffect, useState } from "react";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

export default function Landpage() {
  let [toggle, setToggle] = useState(false);
  // const auth = useAuth();

  const renderToggle = () => 
    (toggle ? <SignUp/> : <SignIn/> );

  return (
    <>
      <button onClick={() => setToggle(!toggle)}>{!toggle ?<p>Sign up</p> : <p>Sign In</p>  }</button>
      {renderToggle()}
    </>
  );
}

  // const renderForm = () =>
  //   toggleForms ? (
  //     <LoginForm handleLogIn={auth.signin} />
  //   ) : (
  //     <SignupForm handleSignUp={auth.signup} />
  //   );

