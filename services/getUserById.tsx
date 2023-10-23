import {getUserIdToStorage} from '../utils/TokenStorage'
import axios from 'axios';
import {apiGetUser} from '../api/UserAPI'

export const getInfoUser = async (setInfoUser: any) => {
    try {
      const userId = await getUserIdToStorage(); 
      const response = await axios.get(apiGetUser + userId);
      const user = response.data.user;
      setInfoUser(user);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };