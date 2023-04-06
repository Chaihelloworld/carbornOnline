import { baseURL, instance } from '../axois.config';
import axios from 'axios';

export async function userLogin(data) {
    return await instance.post(`/client/user/login`, data);
}
export async function maintenance() {
    return await instance.get(`/client/check_maintenance`);
}
export async function creditUFA() {
    return await instance.get(`/client/credit/balance`);
}
export async function loginUFA() {
    return await instance.get(`/client/user/ufa/login`);
}
export default { maintenance, userLogin, creditUFA,loginUFA };

// export default API
