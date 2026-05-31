import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001' // <--- Deve ser a mesma porta do index.js
});

export default api;