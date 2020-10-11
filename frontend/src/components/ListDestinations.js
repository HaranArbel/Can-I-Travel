import React, {useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Route, Link, Switch } from 'react-router-dom'
import {AppStateContext} from "../App";
import {fetchDestinations} from "./API";
import {useAuth0} from "@auth0/auth0-react";

const ListDestinations = () => {
    const {destinations} = useContext(AppStateContext);
    const { getAccessTokenSilently } = useAuth0();

    //  useEffect(  () => {
    //      async function getData() {
    //          const token = await getAccessTokenSilently();
    //          if (countryId){
    //              const {destinations} = await fetchDestinations(token, countryId, setDestinations);
    //              setDestinations(destinations);
    //          }
    //
    //      } getData()
    // }, [countryId]);

    return (
        <div>
            {destinations.length !== 0 && (
                <ol className='contact-list'>
               {destinations.map((country) => (
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
                        <Link to={`/countries/${country.id}` } > {country.name} </Link>
                    </div>
                    {/*<button*/}
                    {/*    onClick={() => props.onDeleteCountry(country.id)}*/}
                    {/*    className='destination-remove'*/}
                    {/*    >*/}
                    {/*    Remove*/}

                    {/*</button>*/}

                    {/*<Switch>*/}
                    {/*<Route path={'/countries/:destination_id'} render-={() => (*/}
                    {/*    <button*/}
                    {/*    onClick={() => props.onDeleteCountry(country.id)}*/}
                    {/*    className='destination-remove'*/}
                    {/*    >*/}
                    {/*    Remove*/}
                    {/*    </button>*/}
                    {/*)}/>*/}
                    {/*</Switch>*/}
                </li>
              ))}
            </ol>
            )}

        </div>
    );
}

ListDestinations.propTypes = {
    // destinations: PropTypes.array.isRequired,
    // onDeleteDestination: PropTypes.func.isRequired,
}
export default ListDestinations