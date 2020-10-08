import React, {useState, useEffect} from "react";
import { Route, Link, useParams } from "react-router-dom";
import {deleteDestination, fetchCountries, fetchCountryInfo, fetchDestinations, fetchDailyCasesByCountry} from "./API";
import {useAuth0} from "@auth0/auth0-react";
import ListCountries from "./ListCountries";
import SelectCountry from "./SelectCountry";
import { addDestination } from  './API';

export default function CountryPage(props){
    const { destination_id } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [selectedCountry, setSelectedCountry] = useState('1')
    const [country, setCountry] = useState({
        id: 0,
        name: '',
        alias: '',
        destinations: [],
    });
    const [newConfirmed, setNewConfirmed] = useState(0)
    const [newDeaths, setNewDeaths] = useState(0)
    const [newRecovered, setNewRecovered] = useState(0)

    const handleOnDeleteDestination = async (destinationId) => {
        const token = await getAccessTokenSilently();
        const response = await deleteDestination(token, country, destinationId);
        setCountry(response.country);
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const token = await getAccessTokenSilently();
        const response = await addDestination(token, country, selectedCountry);
        setCountry(response.country);
    }

    async function getData() {
        const token = await getAccessTokenSilently();
        const response = await fetchCountryInfo(token, destination_id)
        setCountry(response.country);
    }

    async function getCOVIDInfo() {
        if (country.alias){
            const data = await fetchDailyCasesByCountry(country)
            const arr = data.Countries.filter(d => d.CountryCode === country.alias);
            console.log(arr)
            setNewConfirmed(arr[0].NewConfirmed)
            setNewDeaths(arr[0].NewDeaths)
            setNewRecovered(arr[0].NewRecovered)
        }
    }

     useEffect(  () => {
         getData()
         getCOVIDInfo()
    }, );

    return (
        <div>
            {(!country || !newConfirmed) && (<p>Loading...</p>)}
            {country && newConfirmed && (
                <div>
                    <div
                        className='destination-avatar'
                        style={{
                          backgroundImage: `url(https://www.countryflags.io/${country.alias.toLowerCase()}/shiny/64.png)`
                        }}
                    >
                    </div>
                    <div className='destination-details'>
                        <h2>{country.name}</h2>
                        <h3>{country.alias}</h3>
                        <p>New Confirmed: {newConfirmed}</p>
                        <p>New Deaths: {newDeaths}</p>
                        <p>New Recovered: {newRecovered}</p>
                        <h3>Who can enter {country.name}?</h3>
                        <ListCountries
                            countries={country.destinations}
                            onDeleteCountry={handleOnDeleteDestination}
                        />
                    </div>
                    <Link
                        to='/'
                        className='close-add-destination'> //todo change classname
                        back
                    </Link>
                    <p>Add a new destination</p>
                    <SelectCountry
                        countryId={selectedCountry}
                        setCountryId={setSelectedCountry}
                        onSubmit={handleOnSubmit}
                    />
                </div>
            )}
        </div>
    );

};
