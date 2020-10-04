import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SelectCountry from './SelectCountry'

const ListDestinations = (props) => {

    const [query, setQuery] = useState();
    const { destinations } = props;

    // const showingDestinations = query === ''
    //   ? destinations
    //   : destinations.filter((c) => (
    //       c.name.toLowerCase().includes(query.toLowerCase())
    //     ))

    const updateQuery = (query) => {
        setQuery(query)
    }
    const clearQuery = () => {
        updateQuery('')
    }

    // const onClick = () => {
    //     if (window.location === '/'){
    //         window.location.reload()
    //     }
    // }
    return (
        <ol className='contact-list'>
           {destinations.map((destination) => (
            <li key={destination.id} className='destination-list-item'>
                <div
                className='destination-avatar'
                style={{
                  backgroundImage: `url(https://www.countryflags.io/${destination.alias.toLowerCase()}/shiny/64.png)`
                }}
              ></div>
              <div className='destination-details'>
                <Link to={`/countries/${destination.id}` }> {destination.name} </Link>
              </div>
            </li>
          ))}
        </ol>
    );

    // return(
    //     <div className='list-destinations'>
    //     <div className='list-destinations-top'>
    //       <input
    //         className='search-destinations'
    //         type='text'
    //         placeholder='Search Destinations'
    //         value={query}
    //         onChange={(event) => updateQuery(event.target.value)}
    //       />
    //       <Link
    //         to='/create'
    //         className='add-destination'
    //       >Add Contact</Link>
    //     </div>
    //
    //     {showingDestinations.length !== destinations.length && (
    //       <div className='showing-contacts'>
    //         <span>Now showing {showingDestinations.length} of {destinations.length}</span>
    //         <button onClick={clearQuery}>Show all</button>
    //       </div>
    //     )}
    //
    //     <ol className='contact-list'>
    //       {showingDestinations.map((destination) => (
    //         <li key={destination.id} className='destination-list-item'>
    //           <div
    //             className='contact-avatar'
    //             style={{
    //               backgroundImage: `url(${destination.avatarURL})`
    //             }}
    //           ></div>
    //           <div className='contact-details'>
    //             <p>{destination.name}</p>
    //             <p>{destination.handle}</p>
    //           </div>
    //           {/*<button*/}
    //           {/*  onClick={() => onDeleteContact(destination)}*/}
    //           {/*  className='destination-remove'>*/}
    //           {/*    Remove*/}
    //           {/*</button>*/}
    //         </li>
    //       ))}
    //     </ol>
    //   </div>
    // );
}

ListDestinations.propTypes = {
    // destinations: PropTypes.array.isRequired,
    // onDeleteDestination: PropTypes.func.isRequired,
}
export default ListDestinations