import axios from "axios";

// Create an Axios instance with the base URL from environment variables
// This allows you to easily change the API URL without modifying the code
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor to include the authentication token in the headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN"); // Retrieve the token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Include the token in the Authorization header
  }

  return config;
});

export default api;
