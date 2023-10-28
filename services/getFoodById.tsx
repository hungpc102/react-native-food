
import{apiFoodById} from '../api/FoodAPI'

import axios from 'axios';

export const getFoodById = async (foodId:number) => {
  try {
    const response = await axios.get(apiFoodById + foodId);
    const data = response.data.food;
    return data
  } catch (error:any) {
    throw new Error('Error fetching data from API: ' + error.message);
  }
};

