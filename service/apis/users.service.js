import { baseURL, instance } from '../axois.config';
import axios from 'axios';

export async function userDetail() {
    return await instance.get(`/client/user/info/detail`);
}
export async function withdraw(data) {
    return await instance.post(`/client/credit/withdrawal`,data);
}
export async function ConditionWithdraw(data) {
    return await instance.get(`/client/promotion/get_condition_withdraw?id=${data}`);
}
export async function ChangePassword(data) {
    return await instance.post(`/client/user/change_password`,data);
}
export async function ChangeBet(userId,valueLimit) {
    return await instance.patch(`/client/change_bet?user_id=${userId}&new_bet=${valueLimit}`);
}
export default { userDetail , withdraw, ConditionWithdraw, ChangePassword, ChangeBet };

// export default API
