import axios from 'axios';
import config from '../../../../config/twitch_config.json';

const axiosInstance = axios.create({
  headers: {
    'Client-Id': config.ClientId,
    'Authorization': `Bearer ${config.Authorization}`
  }
});

export default axiosInstance;