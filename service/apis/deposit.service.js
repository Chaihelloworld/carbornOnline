
import { baseURL,instance } from '../axois.config';
import axios from 'axios';

export async function cancelDeposit(data) {
    return await instance.post(`/client/credit/cancel_deposit`,data);
}
export async function Deposit(data) {
    return await instance.post(`/client/credit/deposit`,data);
}
export async function confirmDeposit(data) {
    return await instance.patch(`/client/user/confirm_deposit?billing_number=${data}`);
}



export default { cancelDeposit , Deposit ,confirmDeposit};