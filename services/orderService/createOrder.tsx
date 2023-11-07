import axios from "axios";
import { getUserIdToStorage } from "../../utils/TokenStorage";
import {apiCreateOrder} from '../../api/OrderAPI'
import { getAccessTokenFromStorage } from '../../utils/TokenStorage';
import {handleTokenRefresh} from '../jwtService/jwtServices'

export const createOrder = async (address:string, totalPrice:number, shipPrice:number) => {
    let callCount = 0;

    return new Promise(async (resolve, reject) => {
        const createOrderInternal = async () => {
            if (callCount < 2) {
                try {
                    callCount++;
                    const user_id = await getUserIdToStorage();

                    if (address === '') {
                        reject('Vui lòng điền địa chỉ nhận hàng');
                        return;
                    }

                    const order = {
                        "USER_ID": user_id,
                        "ADDRESS": address,
                        "TOTAL_INVOICE": totalPrice,
                        "SHIPPING_FEE": shipPrice
                    }

                    const accessToken = await getAccessTokenFromStorage();

                    axios.post(apiCreateOrder, order, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(response => {
                        if (response.data.status === 401) {
                            handleTokenRefresh();
                            createOrderInternal();
                        } else {
                            callCount = 0;
                            resolve(response.data); // Resolve the promise with response.data
                        }
                    })
                    .catch(error => {
                        console.log(error.message);
                        reject('Lỗi khi tạo order'); // Reject the promise with an error message
                    });
                } catch (error:any) {
                    reject('Error creating order: ' + error.message); // Reject the promise with an error message
                }
            } else {
                reject('Đăng nhập hết hạn. Vui lòng đăng nhập lại'); // Reject the promise with an error message
            }
        }

        createOrderInternal();
    });
}


