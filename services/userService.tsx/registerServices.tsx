import axios from 'axios';
import { userApiRegister } from '../../api/UserAPI';
import { validateEmail, validatePassword } from '../../utils/Validate';

export const register = async (
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    phone:string,
    setLoading: (loading: boolean) => void,
    navigation:any,
    user:object) => {

    try {
        setLoading(true);
        validateUserInput(name, email, password, confirmPassword, phone);
        await createUser(user);
    
        alert('Đăng ký thành công');
        navigation.navigate('Login');
        } 
    catch (error) {
        handleRegistrationError(error);
        } 
    finally {
        setLoading(false);
        }
}

const validateUserInput = (
    name:string,
    email:string,
    password:string,
    confirmPassword:string,
    phone:string,) => {
        if (!name || !email || !password || !confirmPassword || !phone) {
        throw new Error('Vui lòng điền đầy đủ thông tin.');
        }
        if (!validateEmail(email)) {
        throw new Error('Email không hợp lệ. Vui lòng kiểm tra lại.');
        }
    
        if (!validatePassword(password)) {
            throw new Error('Mật khẩu phải chứa ít nhất 6 ký tự.');
        }
        
        if (confirmPassword !== password) {
        throw new Error('Nhập lại mật khẩu không khớp');
        }
    };
    
    const createUser = async (user:object) => {
      return await axios.post(userApiRegister,  user );
    };
    
    const handleRegistrationError = (error:any) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          alert('Lỗi khi đăng ký 400: ' + data.error);
        } else if (status === 409) {
          alert(data.error);
        } else {
          alert('Lỗi đăng ký : ' + error.message);
        }
      } else if (error.message === 'Network Error') {
        // Xử lý lỗi mạng
        alert('Không thể kết nối đến máy chủ.');
      } else {
        // Lỗi không xác định
        alert('Lỗi : ' + error.message);
      }
    };