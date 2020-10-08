import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchCountries} from "./API";

export default function SelectCountry(props){
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const { countryId, setCountryId, onSubmit } = props;
    const [countries, setCountries] = useState([]);

     async function getData() {
        const token = await getAccessTokenSilently();
        const response = await fetchCountries(token);
        setCountries(response.countries);
    }

     useEffect(  () => {
         getData()
    }, []);

    return (
        isAuthenticated && (
        <form onSubmit={onSubmit}>
            <label>
              Select your country:
              <select value={countryId} onChange={(event) => setCountryId(event.target.value)}>
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
