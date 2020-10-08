import React from "react";
import LoginButton from "./LoginButton";
import SelectCountry from "./SelectCountry";
import ListCountries from "./ListCountries";
import Profile from "./Profile";

const Home = ({ isLoading, user, isAuthenticated, countryId, setCountryId, handleOnSubmit, destinations}) => {

  return (
      <div>
            {isAuthenticated && (<Profile user={user}/>)}
            {isLoading && (<div>Loading...</div>)}
            <LoginButton/>
            {/*<SelectCountry*/}
            {/*    countryId={countryId}*/}
            {/*    setCountryId={setCountryId}*/}
            {/*    onSubmit={handleOnSubmit}*/}
            {/*/>*/}
            {/*<ListCountries*/}
            {/*    countries={destinations}*/}
            {/*/>*/}
      </div>
  );
};

export default Home;

