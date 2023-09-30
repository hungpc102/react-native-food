import AsyncStorage from '@react-native-async-storage/async-storage';

// Lưu accessToken và refreshToken vào AsyncStorage
export const saveTokensToStorage = async (accessToken, refreshToken) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    console.log('Tokens đã được lưu trữ thành công.');
  } catch (error) {
    console.error('Lỗi khi lưu trữ tokens:', error);
  }
};


// Lấy accessToken từ AsyncStorage
export const getAccessTokenFromStorage = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken !== null) {
      return accessToken;
    } else {
      console.log('Không tìm thấy accessToken trong AsyncStorage.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy accessToken từ AsyncStorage:', error);
    return null;
  }
};


// Lấy refreshToken từ AsyncStorage
export const getRefreshTokenFromStorage = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (refreshToken !== null) {
      return refreshToken;
    } else {
      console.log('Không tìm thấy accessToken trong AsyncStorage.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy accessToken từ AsyncStorage:', error);
    return null;
  }
};

// Lưu trạng thái nghi nhớ đăng nhập 
export const saveLoginStatusToStorage = async (status) => {

  try {
    await AsyncStorage.setItem('loginStatus', status);
    console.log('Trạng thái đăng nhập đã được lưu trữ thành công.');
  } catch (error) {
    console.error('Lỗi khi lưu trữ trạng thái đăng nhập:', error);
  }
};


// Lấy trạng thái ghi nhớ đăng nhập
export const getLoginStatusToStorage = async () => {
  try {
    const loginStatus = await AsyncStorage.getItem('loginStatus');
    if (loginStatus !== null) {
      return loginStatus;
    } else {
      console.log('Không tìm thấy loginStatus trong AsyncStorage.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy loginStatus từ AsyncStorage:', error);
    return null;
  }
};

