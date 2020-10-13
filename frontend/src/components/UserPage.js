import React, {useContext, useEffect, useState} from "react";
import SelectCountry from "./SelectCountry";
import ListDestinations from "./ListDestinations";
import {addUserCountryPreference, fetchCountryOfUser, fetchDestinations} from "./API";
import {useAuth0} from "@auth0/auth0-react";
import {AppStateContext} from "../App";

export default function UserPage() {

    const {countryId, setCountryId, setDestinations} = useContext(AppStateContext);
    const {user, getAccessTokenSilently} = useAuth0();
    const [gotDestinationsData, setGotDestinationsData] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [gotUserCountryReference, setGotUserCountryReference] = useState(false)

    // const handleAddUserCountryPreference = async (event) => {
    //     event.preventDefault();
    //     const token = await getAccessTokenSilently();
    //     const {new_user} = await addUserCountryPreference(token, user, countryId);
    //     // setGotUserCountryReference(true)
    //     // setCountryId(selectedCountryId)
    // }

    useEffect(() => {
        const getUserCountryPreference = async () => {
            const token = await getAccessTokenSilently();
            const {country_id} = await fetchCountryOfUser(token, user.sub);
            if (country_id) {
                setCountryId(country_id)
                // setGotUserCountryReference(true)
            }
            setIsLoaded(true)
        }
        getUserCountryPreference() //can't await cause useEffect is not an async function
    }, [])

    useEffect(() => {
        async function getDestinations() {
            const token = await getAccessTokenSilently();
            const {destinations} = await fetchDestinations(token, countryId, setDestinations);
            setDestinations(destinations);
        }

        if (countryId) {
            getDestinations()
            setGotDestinationsData(true)
        }
    }, [countryId])

    return (
        <div>
            {isLoaded ? <SelectCountry/> : <p>Loading...</p>}
            {gotDestinationsData ? <ListDestinations showDeleteButton={false}/> : (null)}
        </div>
        // isLoaded ? (gotDestinationsData ? <ListDestinations showDeleteButton={false}/> :
        //     <SelectCountry onSubmit={handleAddUserCountryPreference}/>) : <p>Loading...</p>
    );
};

