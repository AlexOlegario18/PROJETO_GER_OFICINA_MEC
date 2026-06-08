import axios from 'axios';

const api = axios.create({
  baseURL: 'https://server-zb16.onrender.com' // atualizado para Render
});

export default api;