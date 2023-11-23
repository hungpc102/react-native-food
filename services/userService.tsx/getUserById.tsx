import axios from 'axios';
import {apiGetUser} from '../../api/UserAPI'

export const getInfoUser = async (userId: number) => {
    try {
      const response = await axios.get(apiGetUser + userId);
      // console.log(response)
      return response.data.user;
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };