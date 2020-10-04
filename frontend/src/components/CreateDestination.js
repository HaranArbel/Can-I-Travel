// import React, {Component, useEffect, useState} from 'react'
// import { Link } from 'react-router-dom'
// import serializeForm from 'form-serialize'
// import {fetchCountries} from "./API";
// import SelectCountry from "./SelectCountry";
//
// export default function CreateDestination({ countryId }){
//
//       const onSubmit = async (body) => {
//         console.log(body)
//         const response = await fetch(`/create_destination`, {
//             method:'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(body)
//         });
//         const responseData = await response.json();
//     };
//
//     return (
//         <SelectCountry
//             countryId={destinationId}
//             setCountryId={setDestination}
//             onSubmit={onSubmit()}/>
//     );
// }
