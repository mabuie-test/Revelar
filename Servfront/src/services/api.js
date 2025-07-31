import axios from 'axios';

const API_URL = 'https://seu-backend.onrender.com/api/data';

export const sendDeviceData = (data) => {
  return axios.post(API_URL, data);
};

export const getDeviceData = () => {
  return axios.get(API_URL);
};
