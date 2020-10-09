import React from "react";
import LoginButton from "./LoginButton";
import SelectCountry from "./SelectCountry";
import ListDestinations from "./ListDestinations";
import Profile from "./Profile";

const Home = ({ isLoading, user, isAuthenticated, countryId, setCountryId, handleOnSubmit, destinations}) => {

  return (
      <div>
            {/*{isAuthenticated && (<Profile user={user}/>)}*/}
            {isLoading && (<div>Loading...</div>)}
            {/*{!isAuthenticated && R}*/}
            <LoginButton/>
            <SelectCountry
                countryId={countryId}
                setCountryId={setCountryId}
                onSubmit={handleOnSubmit}
            />
            <ListDestinations
                countries={destinations}
            />
      </div>
  );
};

export default Home;

