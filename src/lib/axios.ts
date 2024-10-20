import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface APIConfig {
  baseURL: string;
  getAccessToken?: () => string | undefined;
}

type RequestInterceptor = (
  config: InternalAxiosRequestConfig,
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

type ResponseInterceptor = (
  response: AxiosResponse,
) => AxiosResponse | Promise<AxiosResponse>;

type Interceptor<T> = T | [successHandler: T, errorHandler?: T];

const createAxiosInstance = (config: APIConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "",
    },
  });

  return instance;
};

const createAPI = (
  config: APIConfig,
  requestInterceptors?: Interceptor<RequestInterceptor>,
  responseInterceptors?: Interceptor<ResponseInterceptor>,
): AxiosInstance => {
  const api = createAxiosInstance(config);

  const addInterceptors = (
    requestInterceptors?: Interceptor<RequestInterceptor>,
    responseInterceptors?: Interceptor<ResponseInterceptor>,
  ) => {
    if (requestInterceptors) {
      const [successHandler, errorHandler] = Array.isArray(requestInterceptors)
        ? requestInterceptors
        : [requestInterceptors];
      api.interceptors.request.use(successHandler, errorHandler);
    }

    if (responseInterceptors) {
      const [successHandler, errorHandler] = Array.isArray(responseInterceptors)
        ? responseInterceptors
        : [responseInterceptors];
      api.interceptors.response.use(successHandler, errorHandler);
    }
  };

  addInterceptors(requestInterceptors, responseInterceptors);

  return api;
};

export default createAPI;
