import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesB from '../assets/css/stylesB'
import {Props } from '../services/interfaces/navigationTypes';
import {login} from '../services/loginFunctions'
import { saveLogin } from '../services/saveLoginService'

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
    saveLogin(setLoading, navigation);
  }, []);

  const handleLogin = async () => {
    login(email, password, isChecked, setLoading, navigation, user);
  };

  return (
    <KeyboardAvoidingView behavior='height' style={[stylesB.container, {justifyContent:'center'}]}>
      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require('../assets/photoInScreens/FoodKart-login.jpg')} />
      </View>
        <TextInput value={email} style={stylesB.textInput} placeholder="Tài khoản" autoCapitalize='none' 
        onChangeText={(text) => setEmail(text)} />
        <TextInput value={password} style={stylesB.textInput} placeholder="Mật khẩu"  autoCapitalize='none' secureTextEntry={true}
        onChangeText={(text) => setPassword(text)} // Cập nhật state của mật khẩu
         />
  
      {loading ?(
         <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity  style={stylesB.containerButton} onPress={handleLogin}
           >
              <Text style={stylesB.actionButtonText}>Đăng nhập</Text>
          
          </TouchableOpacity>
        </> 
      )}
      <View style={{flexDirection:'row', marginTop:20}}>
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
      </TouchableOpacity>
      <Text style={styles.label}>Ghi nhớ đăng nhập?</Text>
      </View>
     
      
      <View style={{flexDirection:'row'}} >
        <Text style={styles.label}>Chưa đăng kí? Đăng kí tại </Text>
        <TouchableOpacity  onPress={() => navigation.navigate('Register')}>
          <Text style={stylesB.textDirectional}>đây</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('HelpPage')}>
        <Text style={[styles.textHelp,stylesB.textDirectional]} >Cần trợ giúp</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

    containerLogo:{
      marginBottom:-50,
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

