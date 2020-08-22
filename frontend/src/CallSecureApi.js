import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const { getAccessTokenSilently } = useAuth0();

const callSecureApi = async () => {
    const apiUrl = "http://127.0.0.1:5000"
    const token = await getAccessTokenSilently();

        const response = await fetch(`${apiUrl}/get_users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
  };
export default callSecureApi();