import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator,Alert ,KeyboardAvoidingView} from 'react-native';
import stylesB from '../assets/css/stylesB'
import Axios from 'axios';


import {Props } from '../services/interfaces/navigationTypes';

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState(''); // Khởi tạo state cho email
  const [password, setPassword] = useState(''); // Khởi tạo state cho password
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false);
  
  const user = {
    "user_name": name,
    "user_email": email,
    "user_password": password,
    "user_phone": phone
  };

  const registerUser = () => {
    setLoading(true); // Đặt trạng thái loading để hiển thị ActivityIndicator
  
    Axios.post('http://localhost:3000/users', user) // Gửi POST request với dữ liệu người dùng
      .then((response) => {
        setLoading(false); 
        console.log('Đăng kí thành công'); 
      })
      .catch((error) => {
        setLoading(false); 
        console.error('Lỗi khi đăng kí:', error); 
      });
  };

  return (
    <View  style={stylesB.container}>
      <Text style={styles.trademark}>FOODKART</Text>
      <Text style={styles.textTitle}>Những món ăn ngon đang đợi bạn!</Text>
      <KeyboardAvoidingView behavior='height'>
        <TextInput style={stylesB.textInput} placeholder="Họ và tên" value={name}
        onChangeText={(text) => setName(text)}/>
        <TextInput value={email} style={stylesB.textInput} placeholder="Email" autoCapitalize='none' 
          onChangeText={(text) => setEmail(text)} />
        <TextInput value={password} style={stylesB.textInput} placeholder="Mật khẩu" secureTextEntry={true}
          onChangeText={(text) => setPassword(text)} />
        <TextInput value={confirmPassword} style={stylesB.textInput} placeholder="Nhập lại mật khẩu" secureTextEntry={true} 
          onChangeText={(text) => setConfirmPassword(text)}/>
        <TextInput style={stylesB.textInput} placeholder="Số điện thoại" value={phone}
        onChangeText={(text) => setPhone(text)}/>
      </KeyboardAvoidingView>
      
      {loading ?(
         <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity style={stylesB.containerButton} onPress={registerUser}>
          <Text style={stylesB.actionButtonText}>Đăng kí</Text>
          </TouchableOpacity>
        </> 
      )}
      
      <TouchableOpacity onPress={() => navigation.navigate('HelpPage')}>
        <Text style={[stylesB.textDirectional, {marginTop:50}]}>Liên hệ để biết thêm</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  trademark:{
    color:'#F24822',
    fontSize:50,
    fontWeight:'900',
    marginTop:'20%',
    marginBottom:30
  },
  textTitle:{
    fontSize:18,
    marginBottom:50
  }
})
export default RegisterScreen;