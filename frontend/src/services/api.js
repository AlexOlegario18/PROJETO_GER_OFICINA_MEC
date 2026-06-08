import axios from 'axios';

const api = axios.create({
  baseURL: 'https://srv-d41vebngi27c739po2rg' // atualizado para novo servidor
});

export default api;