import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

export const axiosConfig = {
  baseURL: 'https://my-json-server.typicode.com/VovaFouchek/server-test',
  // ! if need Local Server, use below
  // baseURL: 'http://localhost:3005',
};

const instance: AxiosInstance = axios.create(axiosConfig);

// Interceptors
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 500) {
      throw new Error('An error occurred while making the request.');
    }
    throw error;
  }
);

export default instance;
