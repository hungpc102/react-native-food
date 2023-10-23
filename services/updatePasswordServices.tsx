import {getUserIdToStorage, getAccessTokenFromStorage} from '../utils/TokenStorage'
import {apiUpdatePassword} from '../api/UserAPI'
import axios from 'axios'
import {handleTokenRefresh} from './jwtServices'

let callCount = 0

export  const updatePassword = async(password: string,newPassword: string,confirmPassword: string , usePassword:object, setModalVisible:(modalVisible:boolean)=> void ) => {
    if(callCount < 2){
      callCount++;

      if(!password || !newPassword || !confirmPassword){
        return alert('Vui lòng điền đầy đủ thông tin')
      }
      const userId = await getUserIdToStorage(); 
      const accessToken = await getAccessTokenFromStorage()

      await axios.patch(apiUpdatePassword + userId, usePassword, { 
        headers : {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      })
      .then (response => {
        const handleVerify = async() => {
          if(response.data.status === 401){
            await handleTokenRefresh()
            updatePassword(password, newPassword, confirmPassword,usePassword, setModalVisible )
          }else{
            console.log('Mật khẩu đã được cập nhật:', response.data);
            callCount=0
          alert('Đổi mật khẩu thành công')
          }
        }
        handleVerify()
      })
      .catch(error => {   
    
          console.log('Lỗi khi cập nhật mật khẩu:', error);
          alert('Lỗi đổi mật khẩu. Vui lòng điền đùng thông tin')

      })
      .finally(()=>{
      setModalVisible(false)
      });
    } else{
      alert('Lỗi đổi mật khẩu. Vui lòng đăng nhập lại')
    }
  }