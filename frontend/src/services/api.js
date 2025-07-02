import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Make sure backend is running on this
});

export default api;
