import axios from 'axios';
import store from '../redux/store'

export const service = axios.create({
  baseURL: `http://localhost:5000/`, // api 的 base_url
  timeout: 10000 // 请求超时时间
})

service.interceptors.request.use(function (config) {
    store.dispatch({
        type:"change_loading",
        payload:true
    })
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
service.interceptors.response.use(function (response) {
    store.dispatch({
        type:"change_loading",
        payload:false
    })
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });