import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import { useHistory } from "react-router-dom";

const LoginButton = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  // const history = useHistory();

  const handleLogin = async () => {
      loginWithRedirect()
      const response = await fetch(`/create_user`, {
          method:'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          // body: JSON.stringify(body)
        });
        const responseData = await response.json();
        // history.push("/");

  }
  return !isAuthenticated && (
      <button className="LoginButton" onClick={() => loginWithRedirect()}>
        Log In
      </button>
  );
};

export default LoginButton;

