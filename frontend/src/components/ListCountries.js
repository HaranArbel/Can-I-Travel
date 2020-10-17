import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {fetchCountries} from "./API";
import {Link} from "react-router-dom";

export default function ListCountries({}) {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [countries, setCountries] = useState([]);
    const [query, setQuery] = useState('');

    const updateQuery = (query) => {
        setQuery(query.trim())
    }

    const clearQuery = () => {
        updateQuery('')
    }

    const showingCountries = query === ''
        ? countries
        : countries.filter((c) => (
            c.name.toLowerCase().includes(query.toLowerCase())
        ))

    useEffect(() => {
        async function getData() {
            const token = await getAccessTokenSilently();
            const {countries} = await fetchCountries(token);
            setCountries(countries);
        }

        getData()
    }, [getAccessTokenSilently]);

    return (

        isAuthenticated && (
            <div>
                <div className='list-countries-top'>
                    <input
                        className='search-countries'
                        type='text'
                        placeholder='Search Country'
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </div>

                {showingCountries.length !== countries.length && (
                    <div className='showing-countries'>
                        <span>Now showing {showingCountries.length} of {countries.length}</span>
                        <button onClick={clearQuery}>Show all</button>
                    </div>
                )}

                <ol className='country-list'>
                    {showingCountries.map((country) => (
                        <li key={country.id} className='destination-list-item'>
                            {country.alias !== '' && (
                                <div
                                    className='destination-avatar'
                                    style={{
                                        backgroundImage: `url(https://www.countryflags.io/${country.alias.toLowerCase()}/shiny/64.png)`
                                    }}
                                ></div>
                            )}
                            <div className='destination-details'>
                                <Link to={`/countries/${country.id}`}> {country.name} </Link>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        )
    )
        ;

};
