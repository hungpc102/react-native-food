import { getLoginStatusToStorage,saveTokensToStorage, getAccessTokenFromStorage, getRefreshTokenFromStorage } from "../utils/TokenStorage";
import axios from "axios";
import {userApiStatusLogin, userApiRefreshToken} from '../api/UserAPI'
import { routeLogin } from './loginFunctions'

export const saveLogin = async (setLoading:(loading:boolean)=> void, navigation:any) => {
    setLoading(true);
    try{
        const loginStatus = await getLoginStatusToStorage();

       if(loginStatus === 'true') {
            await verifyAccessTokenLogin(navigation);
        }
    }
    catch{
        console.log('Chưa ghi nhớ đăng nhập hoặc token không chính xác');
    }
    finally{
        setLoading(false);
    }
    

  };
  
  const verifyAccessTokenLogin = async (navigation:any ) => {
      
      try{
        const token = await getAccessTokenFromStorage();
        const response = await axios.get(userApiStatusLogin, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        const statusLogin = response.data.statusLogin;
        
        if (statusLogin) {     
            if (statusLogin === true) {
                console.log('Có ghi nhớ đăng nhập');
                // await routeLoggedIn(token, navigation);
                const redirectTo = 'ButtonBar'
                await routeLogin(token, navigation, redirectTo)
            }
        }
        else{
            await handleTokenRefresh(navigation);
            }
        }
    catch{
        console.log('lỗi đăng nhập')
    }
}


const handleTokenRefresh = async ( navigation:any) => {
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
        const loginStatus = await getLoginStatusToStorage();
        
        await verifyAccessTokenLogin(navigation)
     
      }
    } catch (error:any) {
        console.log(error.message)
    }
     


  };
  