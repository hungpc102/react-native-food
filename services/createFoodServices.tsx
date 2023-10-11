
import axios from 'axios';
import { foodApiCreate } from '../api/FoodAPI';
import * as FileSystem from 'expo-file-system';

export const createFood = async (
    imageUri: string, 
    foodName: string, 
    foodInfo: string, 
    foodPrice: string, 
    foodQuantity: string, 
    foodCategory: string) => {
  try {
    const imageBase64 = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
      
    const formData = new FormData();
      
    formData.append('FOOD_PICTURE', imageBase64); 
    formData.append('FOOD_NAME', foodName);
    formData.append('FOOD_INFO', foodInfo);
    formData.append('FOOD_PRICE', foodPrice);
    formData.append('FOOD_QUANTITY', foodQuantity);
    formData.append('CATEGORY', foodCategory);

    const response = await axios.post(foodApiCreate, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data', 
      },
    });
    if(response){
        alert('Món ăn đã được tạo')
    }
    return response.data; // You can return any relevant data if needed
  } catch (error:any) {
    throw new Error('Error creating food: ' + error.message);
  }
};
