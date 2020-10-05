
//
// const headers = {
//   'Accept': 'application/json',
//   'Authorization': `Bearer ${token}`
// }

import {useAuth0} from "@auth0/auth0-react";

export const fetchDestinations = async (token, countryId, setDestinations) => {
    try {
        // const token = localStorage.getItem('token')
        const response = await fetch(`countries/${countryId}/destinations`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const responseData = await response.json();
        setDestinations(responseData.destinations);
    } catch (error) {
      console.log(error.message);
    }
};

export const fetchCountries = async (token, setCountries) => {

    try{
        // const token = localStorage.getItem('token')
        const response = await fetch(`/countries`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const responseData = await response.json();
        setCountries(responseData.countries);
    } catch (error) {
      console.log(error.message);
    }
}

export const fetchCountryInfo = async (token, countryId, setCountry) => {

    try{
        const response = await fetch(`/countries/${countryId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const responseData = await response.json();
        setCountry(responseData.country);

    } catch (error) {
      console.log(error.message);
    }
}

export const addDestination = async (token, country, setCountry, destinationId) => {

    try{
        const response = await fetch(`/countries/${country.id}/add_destination`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'destinationId': destinationId})
        });
        const responseData = await response.json();
        setCountry(responseData.country);

    } catch (error) {
      console.log(error.message);
    }
}
