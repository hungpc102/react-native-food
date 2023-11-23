import axios from "axios";
import {apiUpdateOrder} from '../../api/OrderAPI'
import {getAccessTokenFromStorage} from '../../utils/TokenStorage'
import {handleTokenRefresh} from '../jwtService/jwtServices'


export const updateOrder = async (orderId: number, orderStatus: string) => {
    let callCount = 0;
  
    const updateOrderInternal = async () => {
      try {
        if (callCount < 2) {
          callCount++;
  
          const accessToken = await getAccessTokenFromStorage();
          const OrderStatus = {
            ORDER_STATUS : orderStatus
          }
  
          const response = await axios.patch(apiUpdateOrder + orderId, OrderStatus, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
          });
  
          if (response.data.status === 401) {
            await handleTokenRefresh();
            await updateOrderInternal();
          } else {
            console.log('Món ăn đã được xác nhận');
          }
        } else {
          alert('Đăng nhập hết hạn. Vui lòng đăng nhập lại');
        }
      } catch (error:any) {
        console.log(error.message);
      }
    };
  
    await updateOrderInternal();
  };
  
    


