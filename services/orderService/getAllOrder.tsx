import axios from 'axios';
import {apiGetAllOrder} from '../../api/OrderAPI'

export const getAllOrder = async (orderStatus:string) => {
    try {
      const response = await axios.get(apiGetAllOrder + orderStatus);
      return response.data.elements;
      
    } catch (error) {
      console.log("Error fetching data from API:", error);
    }
  };