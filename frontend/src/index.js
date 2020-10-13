import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH_0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH_0_CLIENT_ID;

ReactDOM.render(

  <BrowserRouter>
      <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={window.location.origin}
          audience='myApi'
          callbackUrl='http://localhost:3000/callback'
      >
          <App />
      </Auth0Provider>
  </BrowserRouter>, document.getElementById('root')

);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// domain="dev-j7mi52gx.eu.auth0.com"
    // clientId="ZZlb6ph1nmJIjdFtk5kDShQ1UiP3bAcZ"
    // redirectUri="https://localhost:3000"
