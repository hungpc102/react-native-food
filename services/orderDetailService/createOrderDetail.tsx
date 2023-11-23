import axios from "axios";
import {apiCreateOrderDetail} from '../../api/OrderDetailAPI'
import { getAccessTokenFromStorage } from '../../utils/TokenStorage';
import {handleTokenRefresh} from '../jwtService/jwtServices'

export const createOrderDetail = async(ORDER_ID:number, FOOD_ID:number, UNIT_QUANTITY:number, UNIT_PRICE:number)=>{
    let callCount = 0
    const createOrderDetailInternal = async() =>{
        if(callCount < 2){
            try {
                callCount++
                const orderDetail = {
                    ORDER_ID,
                    FOOD_ID, 
                    UNIT_QUANTITY,
                    UNIT_PRICE,
                }

                const  accessToken = await getAccessTokenFromStorage()
                
                axios.post(apiCreateOrderDetail,orderDetail, {
                    headers : {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                      }
                })
                .then(response => {
                    if(response.data.status === 401){
                        handleTokenRefresh()
                        createOrderDetailInternal()
                    }else{
                        console.log('Đã tạo order detail')
                        callCount= 0
                        return response.data
                    }
                })
                .catch((error) => { 
                    console.log(error.message)
                    alert('Lỗi khi tạo order detail')
                })
            }
            catch  (error:any) {
                throw new Error('Error creating order detail: ' + error.message);
            }
            
        }else{
            alert('Đăng nhập hết hạn. Vui lòng đăng nhập lại')
        }
    }
    createOrderDetailInternal()

}

