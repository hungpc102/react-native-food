import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, TextInput, TouchableWithoutFeedback} from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {logoutUser} from '../services/logoutServices'
import {getInfoUser} from '../services/getUserById'
import { updatePassword } from '../services/updatePasswordServices';


const UserScreen = ({ navigation }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPassword, setNewPassword] = useState(''); 
  const modalRef = useRef(null);
  const [infoUser, setInfoUser] = useState<any>({})

  const usePassword = {
    "USER_PASSWORD":password,
    "NEW_USER_PASSWORD":newPassword,
  }

  const handleLogout = () => {
    logoutUser(navigation)
  }

  const handleModalPress = (e: any) => {
    if (modalRef.current && modalRef.current !== e.target) {
      return;
    }
    setModalVisible(false)
  };
  
  useEffect(() => {
    getInfoUser(setInfoUser)
  }, []);


  const handelUpdatePassword = ()=>{
    updatePassword(password ,newPassword, confirmPassword, usePassword , setModalVisible)
  }
  
    return(
        <View style={styles.container}>

          <View style={styles.swapUser}>
            <View  style={styles.NameUser}>
              <Icon name='user-circle' size={60} color='#fff' />
              <Text style={styles.textName}>{infoUser.USER_NAME}</Text>
            </View>
          </View>
            <Text style= {styles.TextTitle}>Thông tin tài khoản</Text>
          <View style= {styles.info}>
            <View style= {styles.swapRowInfo}>
              <Text style= {styles.TextTitleInfo}>Họ và tên</Text>
              <Text style= {styles.TextInfo}>{infoUser.USER_NAME}</Text>
            </View>

            <View style= {styles.swapRowInfo}>
              <Text style= {styles.TextTitleInfo}>Email</Text>
              <Text style= {styles.TextInfo}>{infoUser.USER_EMAIL}</Text>
            </View>
            
            <View style= {styles.swapRowInfo}>
              <Text style= {styles.TextTitleInfo}>Số điện thoại</Text>
              <Text style= {styles.TextInfo}>{infoUser.USER_PHONE}</Text>
            </View>
          </View>
            <Text style= {styles.TextTitle}>Bảo mật</Text>
          <View style= {styles.info}>
            <Pressable onPress={() => setModalVisible(true)}>
              <View style= {styles.swapRowInfo}>
              <Text style= {styles.TextTitleInfo}>Đổi mật khẩu</Text>
              <Text style= {styles.iconText}> {'>'} </Text>
             </View>
            </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        >
          <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={handleModalPress}>
              <View style={styles.centeredView} ref={modalRef}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Lưu ý: không cung cấp mật khẩu cho bất cứ ai vì bất cứ lý do nào</Text>
            <TextInput value={password} style={stylesB.textInput} placeholderTextColor='#888' placeholder="Mật khẩu" secureTextEntry={true}
                onChangeText={(text) => setPassword(text)} />
            <TextInput value={newPassword} style={stylesB.textInput} placeholderTextColor='#888' placeholder="Nhập mật khẩu mới" secureTextEntry={true} 
                onChangeText={(text) => setNewPassword(text)}/>
            <TextInput value={confirmPassword} style={stylesB.textInput} placeholderTextColor='#888' placeholder="Nhập lại mật khẩu mới" secureTextEntry={true} 
                onChangeText={(text) => setConfirmPassword(text)}/>
            <TouchableOpacity style={[stylesB.containerButton, {height:50}]} onPress={handelUpdatePassword}>
              <Text style={[stylesB.actionButtonText, {fontSize:18}]}>Thay đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
          </View>
        
      </Modal>
      

          </View>
          <View style={styles.logout}>
            <TouchableOpacity onPress={handleLogout} style={[stylesB.containerButton, {marginBottom:0, width:'90%', borderRadius:20, height:54}]}>
            <Text style={[stylesB.actionButtonText, {fontSize:22}]}>Đăng xuất</Text>
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
    height:150,
    width:'100%',
    marginBottom:20
  },
  NameUser:{
    flexDirection:'row',
    marginLeft: 30,
    marginTop: 60
  },
  textName:{
    color:'white',
    fontSize:30,
    fontWeight:'bold',
    marginLeft:30,
    marginTop:10
  },
  TextTitle:{
    marginLeft:20,
    marginBottom:20,
    fontSize:22,
    fontWeight:'600'
  },
  info:{
    height:'auto',
    width:'95%',
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: '#fff',
    marginBottom:30,
    marginRight:10,
    marginLeft:10,
    paddingTop:20,
    borderRadius:6
  },
  swapRowInfo:{
    flexDirection:'row',
  },
  TextTitleInfo:{
    marginBottom:20,
    fontSize:20,
    fontWeight:'500'
  },
  TextInfo:{
    color:'#333',
    fontSize:18,
    right:0,
    position:'absolute',
    paddingTop:2
  },
  iconText:{
    color:'#666',
    fontSize:28,
    right:0,
    position:'absolute',
    marginTop:-8
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width:390,
    height:380,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 28,
    textAlign: 'center',
    fontSize: 18
  },
  overlay:{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Màu nền tối
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout:{
    bottom:0,
    position:'absolute',
    width: '100%',
    alignItems:'center',
    marginBottom:20,
  }
})

export default UserScreen;