import axios from "axios";
import {getToken} from './auth'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3001',
    timeout: 5000
})

// 请求前拦截
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['authorization'] = 'Bearer'+ getToken()
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 响应拦截
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


export function get(url, params){
    return instance.get(url,{ params })
}

export function post(url, data){
    return instance.post(url,data)
}


export function del(url, params){
  return instance.delete(url,{ params})
}