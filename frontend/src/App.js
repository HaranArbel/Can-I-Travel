import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import serializeForm from 'form-serialize'
import Rater from './Rater';
import PageLayout from './PageLayout'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import Profile from './Profile'

import * as API from './API'

import './App.css';
import { useAuth0 } from "@auth0/auth0-react";




function App() {

  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, {hash: true})
        console.log('values', values)
        // call API create user function
        // API.get_messages().then(msg => this.setState({msg: msg}))
        API.create_user(values.name).then(username => setUsername(username))

  }

  const { getAccessTokenSilently } = useAuth0();
  const callSecureApi = async () => {

    const apiUrl = "http://127.0.0.1:5000"
    const token = await getAccessTokenSilently();
        console.log(token)
        const response = await fetch(`${apiUrl}/get_users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
  };

  // componentDidMount() {
  //   API.get_hello_worl_msg()
  //     .then((msg) => {
  //       this.setState(() => ({
  //         msg
  //       }))
  //     })
  // }
  return (
        <div>
            <LoginButton></LoginButton>
            <LogoutButton></LogoutButton>
            <Profile></Profile>

            {/*<PageLayout></PageLayout>*/}
            <Route exact path='/' render={() => (
            <div>
                <p className='primary'>Hello {username}!</p>
                <Rater></Rater>
                <Link to={'get_users'} onClick={callSecureApi}>ClickMe</Link>
            </div>
            )}/>
            <Route exact path='/get_users' render={() => (
            <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='name' placeholder='Name'></input>
                    <button type>Add user</button>
                </form>
                <p>User is: {username}</p>
                <Link to={'/'}>Back</Link>
            </div>
        )}/>
        </div>
    )

}

export default App;
