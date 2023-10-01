import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesB from '../assets/css/stylesB'
import {Props } from '../services/interfaces/navigationTypes';
import { userApiLogin, userApiStatusLogin, userApiRefreshToken } from '../connect_API/UserAPI' 
import axios from 'axios';
import { saveTokensToStorage,getAccessTokenFromStorage, saveLoginStatusToStorage, getLoginStatusToStorage, getRefreshTokenFromStorage} from '../utils/TokenStorage'
 


const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  
  const user = {
    "USER_EMAIL": email,
    "USER_PASSWORD": password
  }
  
  const [isChecked, setIsChecked] = useState(false);
  
  const checkmarkIcon = <Icon name="check" size={16} color="blue" />;
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };


  useEffect(() => {
    const SaveLogin = async () => {
      setLoading(true)

      try {
        const loginStatus = await getLoginStatusToStorage();
        if(!loginStatus){
          setLoading(false)
        }
       
        console.log(loginStatus)
  
        if (loginStatus === 'true') {
          const token = await getAccessTokenFromStorage();

         
          const refreshToken = await getRefreshTokenFromStorage();
          // console.log(refreshToken)
          try{
             await axios.get(userApiStatusLogin, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              .then((response) => {
                // Xử lý kết quả trả về từ API
                const statusLogin = response.data.statusLogin;
                
                if (statusLogin && statusLogin.length > 0) {
                  const status = statusLogin[0].status;
                  
                  if (status === 'true') {
                    // Dữ liệu 'true' đã được lấy thành công
                    console.log('Dữ liệu "true" đã được lấy thành công');
                    navigation.navigate('ButtonBar')
                  } else {
                    console.log('Dữ liệu không phải là "true"');

                  }
                } else {
                  console.log('Không có dữ liệu statusLogin trong JSON')
                  axios.post(userApiRefreshToken, {
                    refreshToken: refreshToken
                    }, {
                      headers: {
                          'Content-Type': 'application/json'
                      }
                    }
                  )
                    .then(response => {
                      const accessToken = response.data.accessToken;
                      const refreshToken = response.data.refreshToken;
                  
                      console.log('accessToken:', accessToken);
                      console.log('refreshToken:', refreshToken);

                      if(accessToken && refreshToken){
                        saveTokensToStorage(accessToken,refreshToken )

                        SaveLogin()
                      }
                      setLoading(false)

                    })
                    .catch(error => {
                         setLoading(false)

                        console.error('Lỗi khi gọi API:', error);
                    });
                    }
              })
              .catch((error) => {
                setLoading(false)
                // Xử lý lỗi nếu có
                console.error('Lỗi khi gọi API:', error);
              });

            }

          catch(error){
            setLoading(false)
            console.log('lỗi')
          }


        }
      }
      catch (error) {
        setLoading(false)
        // Xử lý lỗi ở đây
        alert('Phiên đăng nhập lỗi 2')
        console.log(error);
      }
    };
  
    SaveLogin();
  }, []);
  


  const login = () => {
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
  
    axios.post(userApiLogin, user)
      .then(async (response) => {

        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
    
        // Kiểm tra xem có accessToken và refreshToken hay không
        if (accessToken && refreshToken) {
          // Lưu accessToken và refreshToken vào Keychain
          await saveTokensToStorage(accessToken, refreshToken);
          if(isChecked === true){
            await saveLoginStatusToStorage('true')
          }
          setLoading(false);
          // Chuyển hướng đến trang HomePage1
          navigation.navigate('HomePage1');
        } else {
          setLoading(false);
          alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
      })
      .catch(error => {
        setLoading(false);
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
      })
  };




  return (
    <View  style={stylesB.container}>
      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require('../assets/photoInScreens/FoodKart-login.jpg')} />
      </View>
      <KeyboardAvoidingView behavior='height' style={styles.wrapper}>
        <TextInput value={email} style={stylesB.textInput} placeholder="Tài khoản" autoCapitalize='none' 
        onChangeText={(text) => setEmail(text)} />
        <TextInput value={password} style={stylesB.textInput} placeholder="Mật khẩu"  autoCapitalize='none' secureTextEntry={true}
        onChangeText={(text) => setPassword(text)} // Cập nhật state của mật khẩu
         />
      </KeyboardAvoidingView>
      {loading ?(
         <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity  style={stylesB.containerButton} onPress={login}
           >
              <Text style={stylesB.actionButtonText}>Đăng nhập</Text>
          
          </TouchableOpacity>
        </> 
      )}
      <TouchableOpacity onPress={toggleCheckbox} style={styles.checkboxContainer}>
      <View
        style={[
          styles.checkbox,
          isChecked ? styles.checked : styles.unchecked,
        ]}
      >
        {isChecked && (
      <Text >{checkmarkIcon}</Text>
      )}
      </View>
      <Text style={styles.label}>Ghi nhớ đăng nhập?</Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row'}} >
        <Text style={styles.label}>Chưa đăng kí? Đăng kí tại </Text>
        <TouchableOpacity  onPress={() => navigation.navigate('Register')}>
          <Text style={stylesB.textDirectional}>đây</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('HelpPage')}>
        <Text style={[styles.textHelp,stylesB.textDirectional]} >Cần trợ giúp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

    containerLogo:{
      marginTop:'15%',
      marginBottom:60,
      
    },
    logo:{
      width:468,
      height:459,
    },
    wrapper:{
      marginTop:'-30%'
    },
   
    checkboxContainer: {
      flexDirection: 'row',
      // alignItems: 'center',
    },
    checkbox: {
  
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: '#E6E6E6',
      borderRadius: 10,
      marginRight: 10,

    },
    checked: {
      marginTop: 2,
      marginLeft: 3,
      width: 20,
      height: 20,
    },
    unchecked: {
      backgroundColor:'#E6E6E6',
      marginTop: 2,
      marginLeft: 3,
      width: 20,
      height: 20,
    },

    label: {
      fontSize: 18,
      marginBottom:10
    },
    textHelp:{
      marginTop:70
    },
   
})


export default LoginScreen;

