import React, {useState, useEffect} from "react";
import { Route, Link, useParams } from "react-router-dom";
import {fetchCountries, fetchCountryInfo} from "./API";
import {useAuth0} from "@auth0/auth0-react";
import SelectCountry from "./SelectCountry";

export default function CountryPage(props){
    const { destination_id } = useParams();
    // const { getAccessTokenSilently } = useAuth0();
    const [country, setCountry] = useState({
        'id': 0,
        'name': '',
        'alias': '',
        'destinations': [],
    });

    useEffect( async () => {
         // const token = await getAccessTokenSilently()
         const response = fetchCountryInfo(destination_id, setCountry)
    }, [])

    return (
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
            </div>

            <Link
                to='/'
                className='close-create-destination'> //todo change classname
                back
            </Link>
            <p>add a new destination</p>
            {/*<SelectCountry/>*/}
            {/*<Link to='/create_destination'> add new destination </Link>*/}
            {/*<Route exact path='create_destination'></Route>*/}
        </div>
    );

};
