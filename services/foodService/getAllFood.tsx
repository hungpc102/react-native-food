import axios from 'axios';

import {foodApiGetAll} from '../../api/FoodAPI'

export const getAllFoods = async () => {
  try {
    const response = await axios.get(foodApiGetAll);
    const data = response.data;
    return data
  } catch (error) {
    throw error;
  }
};
