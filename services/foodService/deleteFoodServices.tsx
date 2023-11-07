
import {getAccessTokenFromStorage} from '../../utils/TokenStorage'
import axios from 'axios';
import {apiDeleteFood} from '../../api/FoodAPI'
import {handleTokenRefresh} from '../jwtService/jwtServices'
let callCount = 0
 export const deleteFood = async (foodId:string, setModalVisible:(modalVisible:boolean)=> void) => {
  if(!foodId){
    return alert('Vui lòng nhập id món ăn')
  }
  if(callCount < 2){
    callCount++;
    const accessToken = await getAccessTokenFromStorage()
    try {
      const response = await axios.delete(apiDeleteFood + foodId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 204) {
        console.log('Món ăn đã được xoá thành công.');
        callCount = 0
        alert('Món ăn đã được xoá thành công')
  
      } else {
        await handleTokenRefresh()
        deleteFood(foodId, setModalVisible)
      }
    } catch (error) {
      console.error('Lỗi khi xoá món ăn:', error);
    }
    finally{
      setModalVisible(false)
    };
  }else{
    alert('Lỗi khi xoá món ăn. Vui lòng đăng nhập lại')
  }
  
};
