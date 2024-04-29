import axios from "axios";

let config = {
    // baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 60 * 1000,
    withCredentials : true
}

const _axios = axios.create(config)

// Add a request interceptor
_axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
_axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default {
    install: (app, {}) => {
        const api = (serviceId, params, method, successCallback, failCallback) => {

            if(method == 'get') {
                _axios
                    .get(`/${serviceId}`, params).then((response) => {
                    successCallback(response.data)
                }).catch((error) => {
                    if(failCallback != null && typeof failCallback === 'function') {
                        failCallback(error)
                    }
                })
            } else if(method == 'post') {
                _axios
                    .post(`/${serviceId}`, params).then((response) => {
                    successCallback(response.data)
                }).catch((error) => {
                    if(failCallback != null && typeof failCallback === 'function') {
                        failCallback(error)
                    }
                })
            } else if(method == 'delete') {
                _axios
                    .delete(`/${serviceId}`, params).then((response) => {
                    successCallback(response.data)
                }).catch((error) => {
                    if(failCallback != null && typeof failCallback === 'function') {
                        failCallback(error)
                    }
                })
            }
        }
        app.config.globalProperties.$api = api
        app.provide('$api', api)
    },
    axios: _axios
}