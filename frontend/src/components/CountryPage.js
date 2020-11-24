import React, {useState, useEffect, useContext} from "react";
import {Link, useParams} from "react-router-dom";
import {fetchCountryInfo} from "./API";
import {useAuth0} from "@auth0/auth0-react";
import ListDestinations from "./ListDestinations";
import SelectCountry from "./SelectCountry";
import {addDestination, deleteDestination} from './API';
import {AppStateContext} from "../App";
import CovidCaseData from "./CovidCaseData";
import Can from "./Can";

export default function CountryPage() {
    const {destination_id} = useParams();
    const {userRole, countryId, setDestinations, selectedCountryId, setSelectedCountryId} = useContext(AppStateContext);
    const {getAccessTokenSilently} = useAuth0();
    const [country, setCountry] = useState(null);

    const handleOnDeleteDestination = async (destinationId) => {
        const token = await getAccessTokenSilently();
        const {destinations} = await deleteDestination(token, country, destinationId);
        setDestinations(destinations);
    }

    const addDestinationToCountry = async (event) => {
        event.preventDefault();
        const token = await getAccessTokenSilently();
        const {destinations} = await addDestination(token, country, selectedCountryId);
        setDestinations(destinations)
    }

    useEffect(() => {
        async function getCountryData() {
            const token = await getAccessTokenSilently();
            const {country} = await fetchCountryInfo(token, destination_id)
            setCountry(country);
            setDestinations(country.destinations)
        }

        getCountryData()
    }, [destination_id, getAccessTokenSilently, setDestinations]);

    return (
        !country ? (<p>Loading...</p>) : (
            <div>
                <p>Hellllllllllllo</p>
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
                        <CovidCaseData country={country}/>
                        <h3>Who can enter {country.name}?</h3>
                        <ListDestinations
                            showDeleteButton={true}
                            onDelete={handleOnDeleteDestination}/>
                    </div>
                    <Link
                        to='/'
                        className='close-add-destination'>
                        back
                    </Link>
                    <Can
                        role={userRole}
                        perform="post:destination"
                        yes={() => (
                            <div>
                                <p>Add a new destination</p>
                                <SelectCountry onSubmit={addDestinationToCountry}/>
                            </div>
                        )}
                        no={()=>(null)}
                    />

                </div>
            </div>
        )
    );

};
