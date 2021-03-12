import axios from 'axios';
import env from '../../envi.config';


const api = axios.create({
  baseURL: `http://${env.ipBackEnd}:3333`
});

export default api;