import * as SecureStore from 'expo-secure-store';

// Lưu accessToken và refreshToken vào SecureStore
export const saveTokensToStorage = async (accessToken, refreshToken) => {
  try {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    console.log('Tokens đã được lưu trữ thành công.');
  } catch (error) {
    console.error('Lỗi khi lưu trữ tokens:', error);
  }
};

// Lấy accessToken từ SecureStore
export const getAccessTokenFromStorage = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (accessToken !== null) {
      return accessToken;
    } else {
      console.log('Không tìm thấy accessToken trong SecureStore.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy accessToken từ SecureStore:', error);
    return null;
  }
};

// Lấy refreshToken từ SecureStore
export const getRefreshTokenFromStorage = async () => {
  try {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    if (refreshToken !== null) {
      return refreshToken;
    } else {
      console.log('Không tìm thấy refreshToken trong SecureStore.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy refreshToken từ SecureStore:', error);
    return null;
  }
};

// Lưu trạng thái nghi nhớ đăng nhập
export const saveLoginStatusToStorage = async (status) => {
  try {
    await SecureStore.setItemAsync('loginStatus', status);
    console.log('Trạng thái đăng nhập đã được lưu trữ thành công.');
  } catch (error) {
    console.error('Lỗi khi lưu trữ trạng thái đăng nhập:', error);
  }
};

// Lấy trạng thái ghi nhớ đăng nhập
export const getLoginStatusToStorage = async () => {
  try {
    const loginStatus = await SecureStore.getItemAsync('loginStatus');
    if (loginStatus !== null) {
      return loginStatus;
    } else {
      console.log('Không tìm thấy loginStatus trong SecureStore.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy loginStatus từ SecureStore:', error);
    return null;
  }
};
