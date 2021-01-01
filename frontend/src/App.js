import React, {createContext, useEffect, useState} from 'react';
import {Link, Route} from 'react-router-dom'
import {useAuth0} from "@auth0/auth0-react";
import CountryPage from "./components/CountryPage";
import LoginPage from "./components/LoginPage";
import SelectCountry from "./components/SelectCountry";
import UserPage from "./components/UserPage";
import {fetchUserRole} from "./components/API";
import ListCountries from "./components/ListCountries";
import LogoutButton from "./components/LogoutButton";

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
            if (role === 'admin'){
                setUserRole('admin')
            }
            else{
                setUserRole('visitor')
            }

        }

        if (isAuthenticated) {
            getUserRole()
        }
    }, [isAuthenticated])

    return (
        <div>
            <AppStateContext.Provider value={{
                userRole,
                countryId,
                setCountryId,
                setDestinations,
                destinations,
                user,
                selectedCountryId,
                setSelectedCountryId
            }}>
                <Route exact path='/' render={() => {
                    return (
                        <div>
                            {!isAuthenticated ?
                                <LoginPage/>
                                :
                                <div>
                                    <Link to='/countries'>countries</Link>
                                    <UserPage/>
                                    <LogoutButton/>
                                </div>}
                        </div>
                    );
                }}/>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/select-country' component={SelectCountry}/>
                <Route path='/countries/:destination_id' component={CountryPage}/>
                <Route exact path='/countries' component={ListCountries}/>
            </AppStateContext.Provider>
        </div>
    );
}

export default App;
