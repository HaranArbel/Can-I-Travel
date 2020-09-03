import React, { Component, useState } from 'react';
import ReactDOM from "react-dom";
import { Route } from 'react-router-dom'
import serializeForm from 'form-serialize'
import Projects from './components/Projects';
import Main from './components/Main';
import CreateProject from './components/CreateProject';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import Menu from "./components/Menu";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import Content from "./components/Content";

function App() {
    const { isLoading, isAuthenticated } = useAuth0();

    if (isLoading) return <div>Loading...</div>;


  // const [username, setUsername] = useState('');

  // const handleSubmit = (e) => {
  //       e.preventDefault()
  //       const values = serializeForm(e.target, {hash: true})
  //       console.log('values', values)
  //       // call API create user function
  //       // API.get_messages().then(msg => this.setState({msg: msg}))
  //       API.create_user(values.name).then(username => setUsername(username))
  //
  // }

  // const { getAccessTokenSilently } = useAuth0();
  // const callSecureApi = async () => {
  //
  //   const apiUrl = "http://127.0.0.1:5000"
  //   const token = await getAccessTokenSilently();
  //   console.log(token)
  //   const response = await fetch(`${apiUrl}/get_users`, {
  //       headers: {
  //           Authorization: `Bearer ${token}`,
  //       },
  //   });
  // };


  return (
        <div className="container">
            <div className="logo">Logo</div>
            <div className="menu"><Menu/></div>
            <div className="login"><LoginButton/><LogoutButton/></div>
            <div className="profile"><Profile/></div>
            <div className="content"><Content/></div>
            <div className="footer">Footer</div>
        </div>
    )

}

export default App;
