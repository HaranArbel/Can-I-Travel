import React, {useContext, useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {addUser, fetchCountries} from "./API";
import {AppStateContext} from "../App";

export default function SelectCountry(){
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const {countryId, setCountryId, handleOnSubmit} = useContext(AppStateContext);
    const [countries, setCountries] = useState([]);

     useEffect(  () => {
         let unmounted = false
         async function getData() {
             const token = await getAccessTokenSilently();
             const {countries} = await fetchCountries(token);
             if (!unmounted){
                 setCountries(countries);
             }
         } getData()
         return () => {unmounted = true}
    }, []);

    return (
        isAuthenticated && (
        <form onSubmit={handleOnSubmit}>
            <label>
              Select your country:
              <select value={countryId} onChange={(event) => (setCountryId(event.target.value))}>
                  {countries.map(country => (
                      <option key={country.id} value={country.id}> {country.name} </option>
                  ))}
              </select>
            </label>
           <input type="submit" value="Submit" />
        </form>
        )
    );

};
