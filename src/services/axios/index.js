import axios from "axios";

const axiosInstance = axios.create({ baseURL: "https://localhost:44319/" });

export default axiosInstance;