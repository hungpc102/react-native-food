import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {userApiLogout} from '../connect_API/UserAPI'
import {getRefreshTokenFromStorage, saveLoginStatusToStorage} from '../utils/TokenStorage'

const UserScreen = ({ navigation }: Props) => {

  const logout = async () => {
    try {
      const refreshToken = await getRefreshTokenFromStorage();

      if (refreshToken) {
        await saveLoginStatusToStorage('')
        // Gọi API logout và truyền refreshToken
        const response = await axios.delete(userApiLogout, {
          data: {
            refreshToken: refreshToken, // refreshToken nằm trong phần body của yêu cầu
          },
        });

        // Xử lý phản hồi từ API logout nếu cần
        if (response.status === 200) {
          navigation.navigate('Login');
        }
      }
    } catch (error) {
      console.error('Lỗi khi gọi API logout:', error);
      // Xử lý lỗi nếu cần
    }
  }
    return(
        <View style={styles.container}>

          <View style={styles.swapUser}>
            <View  style={styles.NameUser}>
              <Icon name='user-circle' size={60} color='#fff' />
              <Text style={styles.textName}>Hung12</Text>
            </View>
          </View>

          <View style= {styles.info}>
            <Text style= {styles.TextTitle}>Thông tin cá nhân </Text>
            <Text style= {styles.TextInfo}>Họ và tên : Chu Đức Hùng</Text>
            <Text style= {styles.TextInfo}>Email: Hungdz@gmail.com</Text>
            <Text style= {styles.TextInfo}>Số điện thoại : 19001001</Text>
          </View>
          <View style={styles.logout}>
            <TouchableOpacity onPress={logout} style={[stylesB.containerButton, {marginBottom:0, width:'90%', borderRadius:20}]}>
            <Text style={stylesB.actionButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
          

            
        </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: '100%',
  },
  swapUser:{
    backgroundColor:'#F24822',
    height:170,
    width:'100%',
  },
  NameUser:{
    flexDirection:'row',
    marginLeft: 30,
    marginTop: 90
  }
  ,
  textName:{
    color:'white',
    fontSize:30,
    fontWeight:'bold',
    marginLeft:30,
    marginTop:10
  },
  info:{
    marginLeft:20
  },
  TextTitle:{
    marginTop:50,
    marginBottom:20,
    fontSize:30

  },
  TextInfo:{
    marginTop:10,
    fontSize:20
  },
  logout:{
    bottom:0,
    position:'absolute',
    width: '100%',
    alignItems:'center',
  }
})

export default UserScreen;