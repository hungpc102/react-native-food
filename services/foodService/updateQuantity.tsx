import { apiUpdateQuantity } from '../../api/FoodAPI';
import axios from 'axios';
import { getAccessTokenFromStorage } from '../../utils/TokenStorage';
import { handleTokenRefresh } from '../jwtService/jwtServices';

export const updateQuantity = async (foodId: number, quantity: number) => {
    let callCount = 0;
    const updateQuantityInternal = async () => {
      if (callCount < 2) {
        try { 
            callCount ++

            const requestBody = {
              FOOD_QUANTITY: quantity, 
            };
            
            const accessToken = await getAccessTokenFromStorage()

            const response = await axios.patch(apiUpdateQuantity + foodId, requestBody,{   
              headers: {
                Authorization: `Bearer ${accessToken}`,
              }
            })
        
            if (response.status === 401) {
                handleTokenRefresh();
                updateQuantityInternal();;
            } else {
              console.log('Đã cập nhập lại số lượng món ăn')
              callCount = 0
            }
          } catch (error) {
            // Xử lý lỗi nếu có lỗi trong quá trình gửi yêu cầu
            
            console.error('Lỗi khi gửi yêu cầu cập nhật quantity:', error);
          }
      }else {
        alert('Cập nhật số lượng món ăn lỗi. Vui lòng đăng nhập lại');
      }
    }
    
    updateQuantityInternal()
 
};
