import React, {useContext, useEffect, useState} from "react";
import { Redirect } from "react-router-dom";
import SelectCountry from "./SelectCountry";
import ListDestinations from "./ListDestinations";
import {addUserCountryPreference, fetchCountryOfUser, fetchDestinations} from "./API";
import {useAuth0} from "@auth0/auth0-react";
import {AppStateContext} from "../App";

export default function UserPage(){

    const {countryId, setCountryId, destinations, setDestinations} = useContext(AppStateContext);
    const { user, getAccessTokenSilently } = useAuth0();
    const [userHasSubmittedPreference, setUserHasSubmittedPreference] = useState(false)
    const [gotUserCountryPreference, setGotUserCountryPreference] = useState(false)

    const handleAddUserCountryPreference = async (event) => {
        event.preventDefault();
        const token = await getAccessTokenSilently();
        const {new_user} = await addUserCountryPreference(token, user, countryId);
        setUserHasSubmittedPreference(true)
        // history.push('/')
    }

    useEffect(() => {
        let unmounted = false
        const getUserCountryPreference = async () => {
            const token = await getAccessTokenSilently();
            const {country_id} = await fetchCountryOfUser(token, user.sub);
            if (!unmounted){
                if (country_id){
                    console.log('country_id: ', country_id)
                    setCountryId(country_id)
                    setGotUserCountryPreference(true)
                }
                else{
                    console.log(" cannot get user id :( ")
                }
            }
            setGotUserCountryPreference(true)
        }
        async function getDestinations() {
            const token = await getAccessTokenSilently();
            if (countryId !== 0){
                const {destinations} = await fetchDestinations(token, countryId, setDestinations);
                 setDestinations(destinations);
                 console.log("got destinations for: " + countryId + ". ")

            }

            //
            //      console.log("got destinations for: " + countryId + ". ")
            //
            // if (gotUserCountryPreference || userHasSubmittedPreference){
            //     const token = await getAccessTokenSilently();
            //      const {destinations} = await fetchDestinations(token, countryId, setDestinations);
            //      setDestinations(destinations);
            //      console.log("got destinations for: " + countryId + ". ")
            // }
            // else{
            //     console.log("didn't get anu destinations ??? ")
            // }


         }
        getUserCountryPreference()
        getDestinations()
        // if (userHasSubmittedPreference || gotUserCountryPreference){
        //
        // }
        return () => {unmounted = true}
    }, [countryId])

    return (
        (gotUserCountryPreference || userHasSubmittedPreference) ? <ListDestinations/> : <SelectCountry onSubmit={handleAddUserCountryPreference}/>
        // countryId === '' ? <Redirect to='/select-country'/> : <ListDestinations/>
    );
};

