import React, {useState, useEffect, useContext} from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCountryInfo, fetchDailyCasesByCountry } from "./API";
import {useAuth0} from "@auth0/auth0-react";
import ListDestinations from "./ListDestinations";
import SelectCountry from "./SelectCountry";
import { addDestination } from  './API';
import {AppStateContext} from "../App";

export default function CountryPage(){
    const { destination_id } = useParams();
    const { countryId, setDestinations } = useContext(AppStateContext);
    const { getAccessTokenSilently } = useAuth0();
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

    const addDestinationToCountry = async (event) => {
        event.preventDefault();
        const token = await getAccessTokenSilently();
        const {fetched_country} = await addDestination(token, country, countryId);
        setCountry(fetched_country);
    }

     useEffect(  () => {
         let unmounted = false
         async function getCountryData() {
             const token = await getAccessTokenSilently();
             const {country} = await fetchCountryInfo(token, destination_id)
             setCountry(country);
        }
        async function getCOVIDInfo() {
            if (country && country.alias){
                const data = await fetchDailyCasesByCountry(country)
                const arr = data.Countries.filter(d => d.CountryCode === country.alias);
                setNewConfirmed(arr[0].NewConfirmed)
                setNewDeaths(arr[0].NewDeaths)
                setNewRecovered(arr[0].NewRecovered)
            }
        }
        if (!unmounted){
            getCountryData()
         if (country){
            setDestinations(country.destinations)
         }
         getCOVIDInfo()
        }

         return () => {unmounted = true}
    }, [country, destination_id, getAccessTokenSilently,setDestinations]);

    return (
        <div>
        {country &&(
            <div>
            {(country.id === 0 || !newConfirmed) && (<p>Loading...</p>)}
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
                    <SelectCountry onSubmit={addDestinationToCountry}/>

                </div>
            )}
        </div>
        ) }
            </div>
    );

};
