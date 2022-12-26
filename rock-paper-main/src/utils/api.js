import axios from 'axios';

export const baseURL = `${process.env.REACT_APP_DOMAIN}`;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((request) => {
  if (sessionStorage.getItem('accessToken'))
    request.headers = {
      Authorization: sessionStorage.getItem('accessToken'),
    };
  return request;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
