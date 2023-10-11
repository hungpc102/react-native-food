
import axios from 'axios';
import { apiSearchFood } from '../api/FoodAPI';

export const searchFood = async (searchText:string) => {
  try {
    const response = await axios.get(apiSearchFood + `?search=${searchText}`);
    const data = response.data;
    return data;
  } catch (error:any) {
    throw new Error('Error fetching data from API: ' + error.message);
  }
};
