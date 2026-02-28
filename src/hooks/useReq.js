import { useState, useContext } from "react";
import axios from "axios";
import { UsersContext } from "../context/usersContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useReq = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const REACT_APP_BACKEND_URL =
    "https://rebo-backend.inovetexsolutions.com/api";

  const ctx = useContext(UsersContext);

  const startFetching = () => {
    setResponse(null);
    setLoading(true);
    setError(null);
  };

  const fetchedData = () => {
    setLoading(false);
  };

  const requestData = async (method, url, data, jwt, params) => {
    if (!url || !method) return;

    const token = jwt || await AsyncStorage.getItem("token");
    const link = `${REACT_APP_BACKEND_URL}${url}`;

    console.log("API LINK 👉", link);

    const config = {
      method,
      url: link,
    //   headers: token ? { Authorization: `Bearer ${token}` } : {},
    headers: {
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {})
},

      ...(method !== "GET" ? { data } : {}),
      ...(method === "GET" && params ? { params } : {}),
    };

    console.log("AXIOS CONFIG 👉", config);

    startFetching();

    axios(config)
      .then((res) => {
        fetchedData();
        console.log("API RESPONSE 👉", res.data);
        setResponse(res.data);
      })
      .catch((err) => {
  fetchedData();

  if (err.response) {
    setError({
      status: err.response.status,
      data: err.response.data,
    });
  } else {
    setError({ status: 0, data: "Network error" });
  }
});

      // .catch((err) => {
      //   fetchedData();
      //   console.log("API ERROR 👉", err);

      //   if (err.response) {
      //     setError(err.response.data);
      //   } else if (err.request) {
      //     setError("Network error or server unreachable");
      //   } else {
      //     setError("Unexpected error occurred");
      //   }
      // });
  };

  return {
    loading,
    error,
    response,
    requestData,
  };
};

export default useReq;
