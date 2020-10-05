import React, {Component, useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {Route, Link, Redirect, useHistory} from 'react-router-dom'
import serializeForm from 'form-serialize'
import { useAuth0 } from "@auth0/auth0-react";
import SelectCountry from "./components/SelectCountry";
import LoginButton from "./components/LoginButton";
import './App.css';
import ProtectedRoute from "./components/ProtectedRoute";
import Can from './components/Can';
import Profile from './components/Profile';
import { fetchDestinations } from  './components/API';
import CountryPage from "./components/CountryPage";
import CreateDestination from "./components/CreateDestination";
import ListCountries from "./components/ListCountries";


function App() {
    const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [destinations, setDestinations] = useState([]);
    const [countryId, setCountryId] = useState('1');

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
        const response = fetchDestinations(token, countryId, setDestinations);
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
                <div>
                    {/*{isAuthenticated && (<Profile user={user}/>)}*/}
                    {isLoading && (<div>Loading...</div>)}
                    <LoginButton/>
                    <SelectCountry
                        countryId={countryId}
                        setCountryId={setCountryId}
                        onSubmit={handleOnSubmit}
                    />
                    <ListCountries
                        countries={destinations}
                    />
                </div>
            )}/>
            <Route exact path='/countries/:destination_id' component={CountryPage}/>
            <Route exact path='/create_destination' component={CreateDestination}/>

      </div>
    );
}

export default App;
