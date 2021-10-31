import axios from 'axios';

const axiosAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
});

export default axiosAuth;
