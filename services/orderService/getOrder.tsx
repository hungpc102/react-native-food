import {getUserIdToStorage} from '../../utils/TokenStorage'
import axios from 'axios';
import {apiGetOrder, apiGetOrderById} from '../../api/OrderAPI'

export const getOrder = async (orderStatus:string) => {
    try {
      const userId = await getUserIdToStorage(); 
      const response = await axios.get(apiGetOrder + userId + '/' + orderStatus);
      return response.data.orders;
      
    } catch (error) {
      // console.log("Error fetching data from API:", error);
    }
  };

  export const getOrderById = async (orderId:number) => {
    try {
      const response = await axios.get(apiGetOrderById + orderId);
      return response.data.orders;
      
    } catch (error) {
      console.log("Error fetching data from API:", error);
    }
  };