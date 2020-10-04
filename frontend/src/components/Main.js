import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import Menu from "./Menu";
// import "../stylesheets/Main.css";

const Main = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
      <div className="container">
            <div className="logo">Logo</div>
            <div className="menu"><Menu/></div>
            <div className="login"><LoginButton/><LogoutButton/></div>
            <div className="profile"><Profile/></div>
            <div className="content">Content</div>
            <div className="footer">Footer</div>
      </div>
  );


};

export default Main;