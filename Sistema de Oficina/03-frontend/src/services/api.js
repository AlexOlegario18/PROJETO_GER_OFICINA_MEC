import axios from 'axios';

const api = axios.create({
  baseURL: 'https://oficina-backend-rust.vercel.app' // <--- Agora aponta para a Nuvem!
});

export default api;