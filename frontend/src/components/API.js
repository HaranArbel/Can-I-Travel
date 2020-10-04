
//
// const headers = {
//   'Accept': 'application/json',
//   'Authorization': `Bearer ${token}`
// }

export const fetchDestinations = async (token, countryId, setDestinations) => {

    try {
        // const token = localStorage.getItem('token')
        const response = await fetch(`/destinations/${countryId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        const responseData = await response.json();
        console.log(responseData.destinations)
        setDestinations(responseData.destinations);
    } catch (error) {
      console.log(error.message);
    }
};

export const fetchCountries = async (token, setCountries) => {

    try{
        // const token = localStorage.getItem('token')
        console.log('token:' + token)
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

export const fetchCountryInfo = async (countryId, setCountry) => {

    try{
        // const response = await fetch(`/countries/${countryId}`, {
        //     headers: {
        //         Accept: 'application/json',
        //         Authorization: `Bearer ${token}`,
        //     },
        // });
        const response = await fetch(`/countries/${countryId}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        const responseData = await response.json();
        // return responseData.country

        setCountry(responseData.country);
        console.log("country received from backend: " + responseData.country.name)
        console.log("country received from backend: " + responseData.country.alias)
        // console.log("country received from backend: " + responseData.country.destinations)
    } catch (error) {
      console.log(error.message);
    }
}
