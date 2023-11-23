import axios from 'axios';
import {apiGetOrderDetail} from '../../api/OrderDetailAPI'

export const getOrderDetail = async (orderId:number) => {
    try {
      const response = await axios.get(apiGetOrderDetail + orderId);
      return response.data.orderDetails;
      
    } catch (error) {
      console.log("Error fetching data from API:", error);
    }
  };