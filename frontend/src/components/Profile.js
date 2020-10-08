import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import '../stylesheets/Profile.css'

const Profile = ({ user }) => {

  return (
      <div className="Profile">
          <div className="ImageDiv">
              <img className="ProfileImg" src={user.picture} alt={user.name} />
          </div>
          <h2 className="ProfileName">{user.name}</h2>
          <p className="ProfileEmail">{user.email}</p>
          {/*<p>user role: {user.app_metadata.role}</p>*/}
          <p>user id: {user.sub}</p>
      </div>
  );


};

export default Profile;