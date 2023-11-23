import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator,Alert ,KeyboardAvoidingView} from 'react-native';
import stylesB from '../assets/css/stylesB'
import {Props } from '../services/interfaces/navigationTypes';
import { register } from '../services/userService.tsx/registerServices'

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
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

  const handleRegister = ()=>{
    register(name, email, password, confirmPassword, phone, setLoading ,navigation, user)
  }

  return (
    <KeyboardAvoidingView behavior='height' style={[stylesB.container, {justifyContent:'center'}]}  enabled>
      <Text style={styles.trademark}>FOODKART</Text>
      <Text style={styles.textTitle}>Những món ăn ngon đang đợi bạn!</Text>
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
      
      {loading ?(
        <ActivityIndicator size="large" color="#F24822" />
        ) : (
          <>
          <TouchableOpacity style={[stylesB.containerButton, {marginBottom:30, marginTop:40}]} onPress={handleRegister}>
          <Text style={stylesB.actionButtonText}>Đăng kí</Text>
          </TouchableOpacity>
        </> 
      )}
      
      <TouchableOpacity onPress={() => navigation.navigate('HelpPage')}>
        <Text style={[stylesB.textDirectional, {marginTop:50}]}>Liên hệ để biết thêm</Text>
      </TouchableOpacity>
      
     {/* </View> */}
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  trademark:{
    color:'#F24822',
    fontSize:50,
    fontWeight:'900',
    marginBottom:40,
  },
  textTitle:{
    fontSize:18,
    marginBottom:50
  }
})
export default RegisterScreen;