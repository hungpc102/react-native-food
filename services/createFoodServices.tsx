
import axios from 'axios';
import { foodApiCreate } from '../api/FoodAPI';
import { getAccessTokenFromStorage } from '../utils/TokenStorage';
import {handleTokenRefresh} from './jwtServices'

export const createFood =  (
    imageUri: string, 
    foodName: string, 
    foodInfo: string, 
    foodPrice: string, 
    foodQuantity: string, 
    foodCategory: string) => {
        let callCount = 0
    const createFoodInternal = async () =>{
        if(callCount < 2){
            try {
                callCount++
                if( !imageUri ||!foodName || !foodInfo || !foodPrice || !foodQuantity || !foodCategory){
                    alert('Vui lòng điền đầy đủ thông tin về món ăn')
                    return
                }
               
                  
                const formData = new FormData();
                  
                formData.append('FOOD_PICTURE', imageUri); 
                formData.append('FOOD_NAME', foodName);
                formData.append('FOOD_INFO', foodInfo);
                formData.append('FOOD_PRICE', foodPrice);
                formData.append('FOOD_QUANTITY', foodQuantity);
                formData.append('CATEGORY', foodCategory);
                 const  accessToken = await getAccessTokenFromStorage()
                await axios.post(foodApiCreate, formData, {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data', 
                  }
                })
                .then(response => {
            
                        if(response.data.status === 401){
                             handleTokenRefresh()
                             createFoodInternal()
                         }else{
                            alert('Món ăn đã được tạo')
                            callCount= 0
                            return response.data
                         }
                })
                .catch((error:any) => { 
                    console.log(error.message)
                    alert('Lỗi tạo món ăn:')
                })
              } catch (error:any) {
                throw new Error('Error creating food: ' + error.message);
              }
        }else{
            alert('Tạo món ăn lỗi. Vui lòng đăng nhập lại')
        }
    }
        
    createFoodInternal()
}
