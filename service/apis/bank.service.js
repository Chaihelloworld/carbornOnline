
import { baseURL,instance } from '../axois.config';
import axios from 'axios';

export async function cancelChangeBet(data) {
    return await instance.patch(`/client/cancel_change_bet?user_id=${data}`);
}
export async function Banklist() {
    return await instance.get(`/client/user_bank/detail`);
}

export default { cancelChangeBet , Banklist };

// export default API
