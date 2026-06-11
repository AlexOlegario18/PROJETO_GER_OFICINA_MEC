import axios from 'axios';

const api = axios.create({
  baseURL: 'https://server-zb16.onrender.com'
});

export default api;