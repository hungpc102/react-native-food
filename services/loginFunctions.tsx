import axios from 'axios';
import { saveTokensToStorage, saveLoginStatusToStorage } from '../utils/TokenStorage';
import { userApiLogin, apiProtectedRoute } from '../api/UserAPI';

export async function routeLogin(accessToken:any,  navigation:any, redirectTo:string) {
  try {
    const protectedResponse = await axios.post(apiProtectedRoute, {}, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    if (protectedResponse.data === 'isRestaurant') {
      navigation.navigate('Restaurant');
    } else {
      console.log('không phải tài khoản nhà hàng');
    }
  } catch {
    navigation.navigate(redirectTo);
  }
}

function handleLoginError(error:any) {

  if (error.response) {
    const { status, data } = error.response;
    if (status === 400) {
      const errorMessage = data.error || 'Dữ liệu không hợp lệ';
      alert(errorMessage);
    } else if (status === 401) {
      const errorMessage = data.error || 'Thông tin đăng nhập chưa chính xác';
      alert(errorMessage);
    } else if (status === 404) {
      const errorMessage = data.error || 'Người dùng chưa đăng kí';
      alert(errorMessage);
    } else {
      alert('Lỗi đăng nhập: ' + error.message);
    }
  } else {
    alert('Lỗi đăng nhập: ' + error.message);
  }
}

export const login = async (
  email: string,
  password: string,
  isChecked: boolean,
  setLoading: (loading: boolean) => void, 
  navigation: any ,
  user:object
) => {
  setLoading(true);

  if (!email || !password) {
    setLoading(false);
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  try {

    const response = await axios.post(userApiLogin, user);
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    if (accessToken && refreshToken) {
      await saveTokensToStorage(accessToken, refreshToken);

      if (isChecked === true) {
        await saveLoginStatusToStorage('true');
      }
      const redirectTo = 'HomePage1'
      await routeLogin(accessToken, navigation, redirectTo);
    } else {
      alert('Có lỗi xảy ra. Vui lòng thử lại');
    }
  } catch (error) {
    handleLoginError(error);
  }
  finally{
    setLoading(false)
  }
};
