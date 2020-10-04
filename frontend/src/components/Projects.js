import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Route, Link} from "react-router-dom";
import CreateProject from "./CreateProject";
import '../stylesheets/Projects.css'

const Projects = () => {
    const {user, getAccessTokenSilently} = useAuth0();
    const [projects, setProjects] = useState([]);

    useEffect( () => {

      const callSecureApi = async () => {
        const token = await getAccessTokenSilently(); // TODO try catch
        const response = await fetch(`/projects` /*+ id*/, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();
          setProjects(responseData.projects)
        // setProjects(projects => [...projects, responseData.projects]);

      }
      callSecureApi();

    }, []);

    return (
        <div className="projects">
                <p>Projects:</p>
                    <ul>
                        {projects.map(item => (
                            <li key={item.id}>project name: {item.name}, employee: {item.employee}</li>
                        ))}
                    </ul>
                <Link className="Link" to={'create_project'}>Create New Project</Link>
        </div>
    );

};

export default Projects;

//
//
// import React,  from "react";
//
// const CallSecureAPI = () => {
//   const [books, setBooks] = useState([]);
//   // const apiUrl = process.env.REACT_APP_API_URL;
//
//   const { getAccessTokenSilently } = useAuth0();
//
//   const callSecureApi = async () => {
//     try {
//       const token = await getAccessTokenSilently();
//       const response = await fetch(`/books`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const responseData = await response.json();
//       setBooks(responseData);
//
//     } catch (error) {
//       setBooks(error.message);
//     }
//   };
//
//
//   const useUsers = () => {
//   // 1
//   const [users, usersSet] = React.useState([]);
//
//   React.useEffect(() => {
//     async function fetchUsers() {
//       const fullResponse = await fetch('https://reqres.in/api/users');
//       const responseJson = await fullResponse.json();
//       usersSet(responseJson.data);
//     }
//
//     fetchUsers();
//   }, []);
//
//   // 2
//   return [users];
// };