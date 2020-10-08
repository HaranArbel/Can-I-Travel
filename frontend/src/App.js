import React, {Component, useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {Route, Link, Redirect, useHistory} from 'react-router-dom'
import serializeForm from 'form-serialize'
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./components/ProtectedRoute";
import Can from './components/Can';
import { fetchDestinations, deleteDestination } from  './components/API';
import CountryPage from "./components/CountryPage";
import Home from "./components/Home";


function App() {
    const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [destinations, setDestinations] = useState([]);
    const [countryId, setCountryId] = useState('1'); //string or number???????

    // const history = useHistory();

    // const handleLocationChange = (event) => {
    //     setCountry(event.target.value)
    // }
    //
    // const selectCountry = () => {
    //
    // }
    //
    // useEffect(() => {
    //     countryWasSet = true;
    // }, [country])

    //--------------------------------------------------------
    // let history = useHistory();


    //--------------------------------------------------

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const token = await getAccessTokenSilently();
        // alert(`Submitting selectedCountry ${selectedCountry}`)
        const response = await fetchDestinations(token, countryId, setDestinations);
        setDestinations(response.destinations);
    }

    return (

        // <div>
        //     <LoginButton/>
        //     {isAuthenticated && <Can
        //           role={user.role}
        //           perform="get:countries"
        //           yes={() => (
        //             <h2>User can do it</h2>
        //           )}
        //           no={() => <h2>User can't do it</h2>}
        //     />}
        // </div>

        <div>
            <Route exact path='/' render={() => (
                <Home
                    isLoading={isLoading}
                    user={user}
                    isAuthenticated={isAuthenticated}
                    countryId={countryId}
                    setCountryId={setCountryId}
                    handleOnSubmit={handleOnSubmit}
                    destinations={destinations}/>
            )}/>
            <Route path='/countries/:destination_id' component={CountryPage}/>

      </div>
    );
}

export default App;
