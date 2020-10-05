import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ListCountries = (props) => {
    const { countries } = props;

    return (
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
                    {/*<Link to={`/countries/${country.id}` } onClick={() => window.location.reload()}> {country.name} </Link>*/}
                    <Link to={`/countries/${country.id}` } > {country.name} </Link>
                    {/*<Link to='/page2' > {country.name} </Link>*/}
                </div>
            </li>
          ))}
        </ol>
    );
}

ListCountries.propTypes = {
    countries: PropTypes.array.isRequired,
    // onDeleteDestination: PropTypes.func.isRequired,
}
export default ListCountries