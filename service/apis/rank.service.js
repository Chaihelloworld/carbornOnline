import { baseURL,instance } from '../axois.config';
import axios from 'axios';

export async function fetchRank() {
    return  await instance.get(`/client/user/info/detail`, );
}

export default { fetchRank };
