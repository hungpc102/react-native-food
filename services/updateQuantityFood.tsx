import { getUserIdToStorage } from '../utils/TokenStorage';
import { apiUpdateQuantity } from '../api/CartAPI';
import axios from 'axios';

export const updateQuantity = async (foodId: number, quantity: number) => {
  try {
    const userId = await getUserIdToStorage();

    const requestBody = {
      QUANTITY: quantity, 
    };

    const response = await axios.patch(apiUpdateQuantity + `${userId}/${foodId}`, requestBody);

    if (response.status === 200) {
      // Xử lý thành công
      console.log('Cập nhật quantity thành công');
    } else {
      // Xử lý lỗi nếu cần
      console.error('Lỗi khi cập nhật quantity:', response.data);
    }
  } catch (error) {
    // Xử lý lỗi nếu có lỗi trong quá trình gửi yêu cầu
    console.error('Lỗi khi gửi yêu cầu cập nhật quantity:', error);
  }
};
