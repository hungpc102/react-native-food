import {getRefreshTokenFromStorage, saveTokensToStorage} from '../utils/TokenStorage'
import axios from 'axios';
import {userApiRefreshToken, apiProtectedRoute} from '../api/UserAPI'
export const handleTokenRefresh = async () => {
    try {
     const refreshToken = await getRefreshTokenFromStorage();
      const response = await axios.post(userApiRefreshToken, {
        refreshToken: refreshToken,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const accessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;
  
      console.log('accessToken:', accessToken);
      console.log('refreshToken:', newRefreshToken);

  
      if (accessToken && newRefreshToken) {
        saveTokensToStorage(accessToken, newRefreshToken);
        return {accessToken, newRefreshToken}
      }
    } catch (error:any) {
        console.log(error.message)
    }
}

  