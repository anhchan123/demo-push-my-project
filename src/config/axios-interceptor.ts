import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { envConfig, localStorageConfig } from "./config";

const ACCESS_TOKEN = localStorageConfig.accessToken;
const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = envConfig.serverURL;

type OnUnauthenticatedCallback = () => void;

const setupAxiosInterceptors = (
  onUnauthenticated: OnUnauthenticatedCallback
) => {
  const onRequestSuccess = async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  const onResponseSuccess = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  const onResponseError = async (err: AxiosError): Promise<never> => {
    if (err.response) {
      const status = err.response.status;
      if (status === 403 || status === 401) {
        localStorage.clear();
        onUnauthenticated();
      }
    }
    return Promise.reject(err);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
