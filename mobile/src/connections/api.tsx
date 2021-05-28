import axios from 'axios';
import env from '../../envi.config';

const api = axios.create({
  baseURL: `http://${env.ipBackEnd}:3333`,
  timeout: 30000
});

export default api;