import axios from "axios";

axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}/api`;
axios.defaults.withCredentials = true;

export default axios;
