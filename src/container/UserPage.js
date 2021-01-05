import React, { useEffect, useState } from "react";
import UserStockTableContainer from "../container/UserStockTableContainer";

export default function UserPage() {

  return (
    <>
        User Page

        <UserStockTableContainer/>
    </>
  );
}

  // const renderForm = () =>
  //   toggleForms ? (
  //     <LoginForm handleLogIn={auth.signin} />
  //   ) : (
  //     <SignupForm handleSignUp={auth.signup} />
  //   );

