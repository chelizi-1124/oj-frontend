import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    console.log("请求拦截器", config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log("响应拦截器", response);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
