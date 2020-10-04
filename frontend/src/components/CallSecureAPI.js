import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const CallSecureAPI = () => {
  const [books, setBooks] = useState([]);
  // const apiUrl = process.env.REACT_APP_API_URL;

  const { getAccessTokenSilently } = useAuth0();

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(`/books`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setBooks(responseData);
    } catch (error) {
      setBooks(error.message);
    }
  };

  return (
      books
      // message && (
      //   <div className="mt-5">
      //     <h6 className="muted">Result</h6>
      //     <p>{JSON.stringify(message, null, 2)}</p>
      //   </div>
      // )
  );

};

export default CallSecureAPI;