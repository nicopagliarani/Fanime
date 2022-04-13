import axios from "axios";

axios.defaults.withCredentials = true;

export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL === "production"
    ? "https://fanime-app.herokuapp.com"
    : "http://localhost:5005";
