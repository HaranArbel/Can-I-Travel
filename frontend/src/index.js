import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(

  <BrowserRouter>
      <Auth0Provider
    domain="dev-j7mi52gx.eu.auth0.com"
    clientId="ZZlb6ph1nmJIjdFtk5kDShQ1UiP3bAcZ"
    redirectUri="http://localhost:3000"
    >
    <App />
    </Auth0Provider>
  </BrowserRouter>, document.getElementById('root')

);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


