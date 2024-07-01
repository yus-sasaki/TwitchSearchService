import axios from 'axios';
import config from '../../../../config/twitch_config.json';

const clientID = config.ClientID;
const authorization = `Bearer ${config.Authorization}`;

const axiosInstance = axios.create({
  headers: {
    'Client-Id': clientID,
    'Authorization': authorization
  }
});

export default axiosInstance;