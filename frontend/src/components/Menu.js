import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import '../stylesheets/Menu.css';

const Menu = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated && (
      <div className="Menu">
          <Link className="Link" to={'projects'}>Projects</Link>
          <Link className="Link" to={'Tasks'}>Tasks</Link>
          <Link className="Link" to={'Team'}>Team</Link>
      </div>
  );
};

export default Menu;