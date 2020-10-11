import React, {Component, createContext, useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {Route, Link, Redirect, useHistory} from 'react-router-dom'
import serializeForm from 'form-serialize'
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/ProtectedRoute";
import Can from './components/Can';
import {fetchDestinations, deleteDestination, addUserCountryPreference} from './components/API';
import CountryPage from "./components/CountryPage";
import LoginPage from "./components/LoginPage";
import SelectCountry from "./components/SelectCountry";
import UserPage from "./components/UserPage";


export const AppStateContext = createContext({})
function App() {

    const history = useHistory()
    const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [destinations, setDestinations] = useState([]);
    const [countryId, setCountryId] = useState(0); //string or number???????

    return (
        <div>
            <AppStateContext.Provider value={{countryId, setCountryId, setDestinations, destinations, user}}>
            <Route exact path='/' render={() => {
                return(
                    !isAuthenticated ? <LoginPage/> : <UserPage/>
                );
            }}/>
            <Route exact path='/login' component={LoginPage}/>
            <Route exact path='/select-country' component={SelectCountry}/>
            <Route path='/countries/:destination_id' component={CountryPage}/>
            </AppStateContext.Provider>
      </div>
    );
}

export default App;
