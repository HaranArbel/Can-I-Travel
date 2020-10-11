import React, {useContext} from 'react'
import {Link, Route} from 'react-router-dom'
import {AppStateContext} from "../App";

const ListDestinations = ({showDeleteButton, onDelete}) => {
    const {destinations} = useContext(AppStateContext);

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
                                <Link to={`/countries/${country.id}`}> {country.name} </Link>
                            </div>
                            {showDeleteButton && (
                                <button
                                    onClick={() => onDelete(country.id)}
                                    className='destination-remove'
                                >
                                    Remove
                                </button>
                            )}
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