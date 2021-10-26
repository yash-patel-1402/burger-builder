import axios from 'axios';

const axiosOrders = axios.create({
  baseURL: 'https://react-burger-b5a2b-default-rtdb.firebaseio.com/',
});

export default axiosOrders;
