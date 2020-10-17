import React, {createContext, useEffect, useState} from 'react';
import {Route} from 'react-router-dom'
import {useAuth0} from "@auth0/auth0-react";
import CountryPage from "./components/CountryPage";
import LoginPage from "./components/LoginPage";
import SelectCountry from "./components/SelectCountry";
import UserPage from "./components/UserPage";
import {fetchUserRole} from "./components/API";

export const AppStateContext = createContext({})

function App() {

    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [destinations, setDestinations] = useState([]);
    const [countryId, setCountryId] = useState(null);
    const [selectedCountryId, setSelectedCountryId] = useState('');
    const [userRole, setUserRole] = useState('');


    useEffect(() => {
        async function getUserRole() {
            const token = await getAccessTokenSilently();
            const {role} = await fetchUserRole(token, user.sub)
            setUserRole(role)
        }

        if (isAuthenticated) {
            getUserRole()
        }
    }, [isAuthenticated])

    return (
          <div>
              <AppStateContext.Provider value={{userRole, countryId, setCountryId, setDestinations, destinations, user, selectedCountryId, setSelectedCountryId}}>
              <Route exact path='/' render={() => {
                  return(
                      !isAuthenticated ? <LoginPage/> : <UserPage/>
                  );
              }}/>
              <Route exact path='/login' component={LoginPage}/>
              <Route exact path='/select-country' component={SelectCountry}/>
              <Route path='/countries/:destination_id' component={CountryPage}/>
              </AppStateContext.Provider>
        </div>
    );
}

export default App;
