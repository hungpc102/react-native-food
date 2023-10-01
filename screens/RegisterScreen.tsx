import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator,Alert ,KeyboardAvoidingView} from 'react-native';
import stylesB from '../assets/css/stylesB'
import axios from 'axios';
import {validateEmail, validatePassword} from '../utils/Validate'
import {Props } from '../services/interfaces/navigationTypes';
import { userApiRegister } from '../connect_API/UserAPI' 



const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState(''); // Khởi tạo state cho email
  const [password, setPassword] = useState(''); // Khởi tạo state cho password
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false);


  const user = {
    "USER_NAME": name,
    "USER_EMAIL": email,
    "USER_PASSWORD": password,
    "USER_PHONE": phone
  };

  const registerUser = () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword || !phone) {
      setLoading(false);
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (!validateEmail(email)) {
      setLoading(false);
      alert('Email không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    if (!validatePassword(password)) {
      setLoading(false);
      alert('Mật khẩu phải chứa ít nhất 6 ký tự.');
      return;
    }

    if(confirmPassword !== password){
      setLoading(false);
      alert('Nhập lại mật khẩu không khớp');
      return;
    }

    axios.post(userApiRegister, user)
    .then((response) => {

        setLoading(false);
        alert('Đăng ký thành công');
        navigation.navigate('Login');
    })
    .catch((error) => {
        setLoading(false);
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
    });
  };

  

  return (
    <View  style={stylesB.container}>
      <Text style={styles.trademark}>FOODKART</Text>
      <Text style={styles.textTitle}>Những món ăn ngon đang đợi bạn!</Text>
      <KeyboardAvoidingView behavior='padding'>
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