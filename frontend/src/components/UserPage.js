import React, {useContext, useEffect, useState} from "react";
import { Redirect } from "react-router-dom";
import SelectCountry from "./SelectCountry";
import ListDestinations from "./ListDestinations";
import {fetchCountryOfUser} from "./API";
import {useAuth0} from "@auth0/auth0-react";
import {AppStateContext} from "../App";

export default function UserPage(){

    const {countryId, setCountryId} = useContext(AppStateContext);
    const { user, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        let unmounted = false
        const isInTable = async () => {
            const token = await getAccessTokenSilently();
            const {country} = await fetchCountryOfUser(token, user.sub);
            if (!unmounted){
                setCountryId(country)
            }
        }
        isInTable()
        return () => {unmounted = true}
    }, [])

    return (
        countryId === '' ? <Redirect to='/select-country'/> : <ListDestinations countryId={countryId}/>
    );
};
