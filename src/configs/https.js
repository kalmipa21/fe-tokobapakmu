import axios from "axios";
import stores from "../stores";

const { auth } = stores.getState();
// const dispatch = stores.dispatch();

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const statusCode = error.response.status;

    // WHEN 403 (INVALID TOKEN)
    if (statusCode === 403) {
      // // REMOVE TOKEN AND USER IN STORE
      // stores.dispatch({ type: "AUTH_TOKEN", value: null });
      // stores.dispatch({
      //   type: "AUTH_USER",
      //   value: {},
      // });
      // REMOVE TOKEN AND USER IN LOCALSTORAGE

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
