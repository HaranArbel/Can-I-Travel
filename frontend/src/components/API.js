
export const fetchDailyCasesByCountry = async (country) => {

    try {
        const response = await fetch(`https://api.covid19api.com/summary`, {
            headers: {
            },
        });
        const result = await response.text();
        const data = JSON.parse(result)
        return data

    } catch (error) {
      console.log(error.message);
    }
};

export const addUserCountryPreference = async (token, user, countryId) => {

    console.log("countryId in addUserCountryPreference: " + countryId)
    try{
        const response = await fetch(`/users/add`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'userId': user.sub, 'name': user.name, 'email': user.email, 'countryId':countryId})
        });
        const responseData = await response.json();
        console.log(response)
        return responseData

    } catch (error) {
      console.log(error.message);
    }
}

export const fetchCountryOfUser = async (token, user_id) => {
    try {
        const response = await fetch(`users/${user_id}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const responseData = await response.json();
        return responseData

    } catch (error) {
      console.log(error.message);
    }
};

export const fetchDestinations = async (token, countryId) => {
    try {
        // const token = localStorage.getItem('token')
        console.log("fetching destinations from " + `countries/${countryId}/destinations`)
        const response = await fetch(`countries/${countryId}/destinations`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const responseData = await response.json();
        return responseData

    } catch (error) {
      console.log(error.message);
    }
};

export const fetchCountries = async (token) => {

    try{
        // const token = localStorage.getItem('token')
        const response = await fetch(`/countries`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const responseData = await response.json();
        return responseData
    } catch (error) {
      console.log(error.message);
    }
}

export const fetchCountryInfo = async (token, countryId) => {

    try{
        const response = await fetch(`/countries/${countryId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const responseData = await response.json();
        return responseData

    } catch (error) {
      console.log(error.message);
    }
}

export const addDestination = async (token, country, destinationId) => {

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
        return responseData

    } catch (error) {
      console.log(error.message);
    }
}

export const deleteDestination = async (token, country, destinationId) => {

    try{
        const response = await fetch(`/countries/${country.id}/delete_destination`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({destinationId})
        });
        const responseData = await response.json();
        return responseData

    } catch (error) {
      console.log(error.message);
    }
}