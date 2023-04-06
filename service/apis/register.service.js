import { baseURL, instance } from '../axois.config';
import axios from 'axios';

export async function register(data) {
    return await instance.post(`/client/user/register`, data);
}
export async function verifyOtp(data) {
    return await instance.post(`/client/user/verify_otp`, data);
}
export async function requestOtp(data) {
    return await instance.post(`/client/user/request_otp`, data);
}


export default { register, verifyOtp , requestOtp };

// export default API
