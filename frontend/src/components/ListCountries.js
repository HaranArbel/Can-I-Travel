import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link, Switch } from 'react-router-dom'

const ListCountries = (props) => {
    const { countries } = props;

    return (
        <div>
            <ol className='contact-list'>
               {countries.map((country) => (
                <li key={country.id} className='destination-list-item'>
                    <div
                        className='destination-avatar'
                        style={{
                        backgroundImage: `url(https://www.countryflags.io/${country.alias.toLowerCase()}/shiny/64.png)`
                        }}
                    ></div>
                    <div className='destination-details'>
                        <Link to={`/countries/${country.id}` } > {country.name} </Link>
                    </div>
                    <button
                        onClick={() => props.onDeleteCountry(country.id)}
                        className='destination-remove'
                        >
                        Remove

                    </button>
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
        </div>
    );
}

ListCountries.propTypes = {
    countries: PropTypes.array.isRequired,
    // onDeleteDestination: PropTypes.func.isRequired,
}
export default ListCountries