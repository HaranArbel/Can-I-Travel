import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = (props) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return !isAuthenticated && (
      <button className="LoginButton" onClick={() => (loginWithRedirect())}>
        Log In
      </button>
  );
};

export default LoginButton;

