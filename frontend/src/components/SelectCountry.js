import React, {useContext, useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {addUserCountryPreference, fetchCountries} from "./API";
import {AppStateContext} from "../App";

export default function SelectCountry({onSubmit}) {
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const {countryId, setCountryId, selectedCountryId, setSelectedCountryId} = useContext(AppStateContext);
    const [countries, setCountries] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        async function getData() {
            const token = await getAccessTokenSilently();
            const {countries} = await fetchCountries(token);
            setCountries(countries);
        }
        getData()
    }, [getAccessTokenSilently]);

    useEffect( () => {
        if(isSubmitted){
            setCountryId(selectedCountryId)
            setIsSubmitted(false)
        }
    }, [isSubmitted])

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        const token = await getAccessTokenSilently();
        const {new_user} = await addUserCountryPreference(token, user, selectedCountryId);
        setIsSubmitted(true)
    }

    return (
        isAuthenticated && (
            <form onSubmit={onSubmit || handleOnSubmit}>
                <label>
                    <select value={selectedCountryId} onChange={(event) => (setSelectedCountryId(event.target.value))}>
                        {countries.map(country => (
                            <option key={country.id} value={country.id}> {country.name} </option>
                        ))}
                    </select>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    );

};
