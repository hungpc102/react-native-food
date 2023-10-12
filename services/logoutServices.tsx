
import axios from 'axios';
import { userApiLogout } from '../api/UserAPI';
import { getRefreshTokenFromStorage, saveLoginStatusToStorage, saveUserIdToStorage } from '../utils/TokenStorage';

export const logoutUser = async (navigation:any) => {
  try {
    const refreshToken = await getRefreshTokenFromStorage();

    if (refreshToken) {
      await saveLoginStatusToStorage('');
      await saveUserIdToStorage('')

      const response = await axios.delete(userApiLogout, {
        data: {
          refreshToken: refreshToken,
        },
      });

      if (response.status === 200) {
        navigation.navigate('Login');
      }
    }
  } catch (error) {
    console.error('Lỗi khi gọi API logout:', error);
  }
};
