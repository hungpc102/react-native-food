import {getUserIdToStorage} from '../../utils/TokenStorage'
import axios from 'axios';
import {apiGetCart} from '../../api/CartAPI'

export const getInfoCart = async (setInfoCart:any) => {
    try {
      const userId = await getUserIdToStorage(); 
      const response = await axios.get(apiGetCart + userId);
      const cart = response.data.cart;
      // console.log(cart)
      setInfoCart(cart);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };