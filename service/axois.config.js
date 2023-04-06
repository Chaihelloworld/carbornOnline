import Cookie from 'js-cookie';
import Axios from 'axios';
import {decamelizeKeys, camelizeKeys} from 'axios';
import { Router } from 'next/router';

export const baseURL = 'https://api.ufa-365.com';
export const instance = Axios.create({
    baseURL
});
instance.interceptors.response.use(
    (response) => {
        if (response.data && response.headers['content-type'] === 'application/json') {
            response.data = response.data;
        }
        return response;
    },
    (err) => {
        if (
            err.response?.status === 401 ||
            err.response?.data?.error === 'An error while decoding token.' ||
            err.response?.data?.error === 'Provided token is expired.'
        ) {
           window.location.onload('/maintenance');
        }
        if (
            err.response?.status === 400 ||
            err.response?.data?.error === 'An error while decoding token.' ||
            err.response?.data?.error === 'Provided token is expired.'
        ) {
           window.location.onload('/maintenance');
           Cookie.remove('newufa_api_token');
           Cookie.remove('access_token');

        }
        return Promise.reject(err);
    }
);
instance.interceptors.request.use((config) => {
    const newConfig = { ...config };
    const accessToken = Cookie.get('newufa_api_token');
    if (accessToken) {
        newConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig;

    if (config.params) {
        newConfig.params = config.params;
    }
    if (config.data) {
        newConfig.data = config.data;
    }
    return newConfig;
});
    // axios.defaults.baseURL = 'https://api.ufa-365.com';

    // axios.interceptors.request.use(
    //     config => {
    //         if (response.data && response.headers['content-type'] === 'application/json') {
    //             response.data = camelizeKeys(response.data);
    //         }
    //         return response;
    //     //   if (!config.headers.Authorization) {
    //     //     if (token) {
    //     //       config.headers.Authorization = `Bearer ${accessToken}`;
    //     //     }
    //     //   }
      
    //       return config;
    //     },
    //     error => Promise.reject(error)
    //   );