import axios from "axios";
import {getAccessTokenFromStorage} from '../utils/TokenStorage'
import {apiUpdateFood} from '../api/FoodAPI'
import {handleTokenRefresh} from '../services/jwtServices'

export const updateFood = (
    foodId: string,
    imageUri: string,
    foodName: string,
    foodInfo: string,
    foodPrice: string,
    foodQuantity: string,
    foodCategory: string
  ) => {
    let callCount = 0;
    const updateFoodInternal = async () => {
      if (callCount < 2) {
        try {
          callCount++;
          if (
            !foodId ||
            !imageUri ||
            !foodName ||
            !foodInfo ||
            !foodPrice ||
            !foodQuantity ||
            !foodCategory
          ) {
            alert('Vui lòng điền đầy đủ thông tin về món ăn');
            return;
          }

          const formData = new FormData();
  
          formData.append('FOOD_PICTURE', imageUri);
          formData.append('FOOD_NAME', foodName);
          formData.append('FOOD_INFO', foodInfo);
          formData.append('FOOD_PRICE', foodPrice);
          formData.append('FOOD_QUANTITY', foodQuantity);
          formData.append('CATEGORY', foodCategory);
  
          const accessToken = await getAccessTokenFromStorage();
          await axios
            .put(apiUpdateFood + foodId, formData, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              if (response.data.status === 401) {
                handleTokenRefresh();
                updateFoodInternal();
              } else {
                alert('Món ăn đã được cập nhật');
                callCount = 0;
                return response.data;
              }
            })
            .catch((error: any) => {
              console.log(error.message);
              alert('Lỗi cập nhật món ăn:');
            });
        } catch (error: any) {
          throw new Error('Error updating food: ' + error.message);
        }
      } else {
        alert('Cập nhật món ăn lỗi. Vui lòng đăng nhập lại');
      }
    };
  
    updateFoodInternal();
  };
  