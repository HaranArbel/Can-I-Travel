import React, {useContext, useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {fetchCountries} from "./API";
import {AppStateContext} from "../App";

export default function SelectCountry({onSubmit}){
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const {countryId, setCountryId} = useContext(AppStateContext);
    const [countries, setCountries] = useState([]);

     useEffect(  () => {
         async function getData() {
             const token = await getAccessTokenSilently();
             const {countries} = await fetchCountries(token);
             setCountries(countries);
         }
         getData()
    }, [getAccessTokenSilently]);

    return (
        isAuthenticated && (
        <form onSubmit={onSubmit}>
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
