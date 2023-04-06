import { baseURL,instance } from '../axois.config';
import axios from 'axios';

export async function fetchPromotionShow() {
    return await instance.get(`${baseURL}/client/promotion/get_promotion_show`);
}
export async function fetchPromotion() {
    return await instance.get(`${baseURL}/client/promotion/get_promotion`);
}
export default { fetchPromotionShow, fetchPromotion };

// export default API
