import React, {useEffect, useState} from "react";
import {fetchCountryInfo, fetchDailyCasesByCountry} from "./API";

export default function CovidCaseData({country}) {

    const [newConfirmed, setNewConfirmed] = useState(0)
    const [newDeaths, setNewDeaths] = useState(0)
    const [newRecovered, setNewRecovered] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {

        async function getCOVIDInfo() {
            if (country) {
                const data = await fetchDailyCasesByCountry(country)
                const arr = data.Countries.filter(d => d.CountryCode === country.alias);
                setNewConfirmed(arr[0].NewConfirmed)
                setNewDeaths(arr[0].NewDeaths)
                setNewRecovered(arr[0].NewRecovered)
                setIsLoaded(true)
            }
        }
        getCOVIDInfo()
    }, [country]);

    return (
        isLoaded ? (
                <div>
                    <p>New Confirmed: {newConfirmed}</p>
                    <p>New Deaths: {newDeaths}</p>
                    <p>New Recovered: {newRecovered}</p>
                </div>
            )
            :
            ("Loading case data...")
    );
};
