import axios, {AxiosError, AxiosInstance} from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleError(error)
);

const handleError = (error: AxiosError) => {
  const errorMessage: string = `${error.response?.data}`
    || error.message
    || 'Something went wrong, please check the logs';
  if (setGlobalError) {
    console.log('Setting global error:', errorMessage);
    setGlobalError(errorMessage);
  }
  return Promise.reject(error);
};

let setGlobalError: ((msg: string) => void) | null = null;

export const setErrorHandler = (handler: (msg: string) => void) => {
  setGlobalError = handler;
};
