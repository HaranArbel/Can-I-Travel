import React, {useState, useEffect, useContext} from "react";
import { Route, Link, useParams } from "react-router-dom";
import {deleteDestination, fetchCountries, fetchCountryInfo, fetchDailyCasesByCountry} from "./API";
import {useAuth0} from "@auth0/auth0-react";
import ListDestinations from "./ListDestinations";
import SelectCountry from "./SelectCountry";
import { addDestination } from  './API'; //don't remove cause we will need this or something similar in the future
import {AppStateContext} from "../App";

export default function CountryPage(props){
    const { destination_id } = useParams();
    const {destinations, setDestinations} = useContext(AppStateContext);
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

    // const handleOnDeleteDestination = async (destinationId) => {
    //     const token = await getAccessTokenSilently();
    //     const response = await deleteDestination(token, country, destinationId);
    //     setCountry(response.country);
    // }

    // const handleOnSubmit = async (event) => {
    //     event.preventDefault();
    //     const token = await getAccessTokenSilently();
    //     const {country} = await addDestination(token, country, selectedCountry);
    //     setCountry(country);
    // }

     useEffect(  () => {
         async function getData() {
             const token = await getAccessTokenSilently();
             const {country} = await fetchCountryInfo(token, destination_id)
             setCountry(country);
             setDestinations(country.destinations)
        }
        async function getCOVIDInfo() {
            if (country.alias){
                const data = await fetchDailyCasesByCountry(country)
                const arr = data.Countries.filter(d => d.CountryCode === country.alias);
                setNewConfirmed(arr[0].NewConfirmed)
                setNewDeaths(arr[0].NewDeaths)
                setNewRecovered(arr[0].NewRecovered)
            }
        }
         getData()
         getCOVIDInfo()
    }, [country]);

    return (
        <div>
            {(country.id !== 0 || !newConfirmed) && (<p>Loading...</p>)}
            {country.id !== 0 && newConfirmed && (
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
                        <ListDestinations/>
                    </div>
                    <Link
                        to='/'
                        className='close-add-destination'>
                        back
                    </Link>
                    <p>Add a new destination</p>
                    <SelectCountry/> //todo add new destination used to be implemented on SelectCountry but now we put all the states in the Context. Also selected country was once the selected destination the user wanted to add, and it would send request to backend
                </div>
            )}
        </div>
    );

};
