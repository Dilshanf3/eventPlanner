import axios from 'axios';
import Config from 'react-native-config';

const axiosInstance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
