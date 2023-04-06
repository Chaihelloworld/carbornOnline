import { baseURL, instance } from '../axois.config';
import axios from 'axios';

export async function affClick(data) {
    return await instance.post(`/client/aff/click`, data);
}

export default {  affClick };

// export default API
