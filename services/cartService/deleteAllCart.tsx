import axios from "axios";
import { getUserIdToStorage } from "../../utils/TokenStorage";
import {apiDeleteAllCart} from '../../api/CartAPI'
import {getAccessTokenFromStorage} from '../../utils/TokenStorage'
import {handleTokenRefresh} from '../jwtService/jwtServices'


export const deleteCart = async()=>{
    let callCount = 0
    const deleteCartInternal = async() =>{
        if(callCount < 2){
            try{
                callCount++
                const user_id = await getUserIdToStorage()
                const  accessToken = await getAccessTokenFromStorage()
                
                axios.delete(apiDeleteAllCart + user_id, {
                    headers : {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                .then(response => {
                    if(response.data.status === 401){
                        handleTokenRefresh()
                        deleteCartInternal()
                    }else{
                        console.log('Đã xoá cart');
                    }
                })
                .catch((error) => { 
                    console.log(error.message)
                })
            }
            catch{

            }
        }else{
            alert('Đăng nhập hết hạn. Vui lòng đăng nhập lại')
        }

    }
    deleteCartInternal()
    
}

