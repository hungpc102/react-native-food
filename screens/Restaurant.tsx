import React, { useState , useRef} from 'react';
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity, Modal,TouchableWithoutFeedback} from 'react-native';
import { Props } from '../services/interfaces/navigationTypes';
import stylesB from '../assets/css/stylesB';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {apiDeleteFood} from '../api/FoodAPI'
import { getAccessTokenFromStorage} from '../utils/TokenStorage';
import {handleTokenRefresh} from '../services/jwtServices'

const Restaurant = ({ navigation }: Props) => {
 const moveToAddFood = ()=> {
  navigation.navigate('AddFoodScreen')
 }

 const moveToSearch = ()=> {
  navigation.navigate('SearchScreen')
 }

 const moveToUser = ()=> {
  navigation.navigate('UserScreen')
 }

 const [foodId, setFoodId] =useState('')
 const [modalVisible, setModalVisible] = useState(false);
 const modalRef = useRef(null);

 const handleModalPress = (e: any) => {
  if (modalRef.current && modalRef.current !== e.target) {
    return;
  }
  setModalVisible(false)
}


let callCount = 0
 const deleteFood = async () => {
  if(callCount < 2){
    callCount++;
    const accessToken = await getAccessTokenFromStorage()
    try {
      const response = await axios.delete(apiDeleteFood + foodId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 204) {
        console.log('Món ăn đã được xoá thành công.');
        callCount = 0
        alert('Món ăn đã được xoá thành công')
  
      } else {
        await handleTokenRefresh()
        deleteFood()
      }
    } catch (error) {
      console.error('Lỗi khi xoá món ăn:', error);
    }
    finally{
      setModalVisible(false)
    };
  }else{
    alert('Lỗi khi xoá món ăn. Vui lòng đăng nhập lại')
  }
  
};

  return (
    <View style={[stylesB.container,{backgroundColor:'#ddd'}]}>
        <View style={styles.containerImage}>
          <Image  style={styles.logoFage1} source={require('../assets/photoInScreens/ImageHome1.png')} />
        </View>
        <View style={styles.containerItem}>
            <TouchableOpacity style={styles.item} >
                <Icon2 name="exchange" size={40} color="#F24822"></Icon2>
            <Text style={styles.textItem}>Cập nhập sản phẩm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={moveToAddFood}>
                <Icon name="shopping-basket-add" size={40} color="#F24822"></Icon>
                <Text style={styles.textItem}>Thêm sản phẩm</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.item} onPress={moveToSearch}>
                <Icon2 name="search" size={40} color="#F24822"></Icon2>
                <Text style={styles.textItem}>Tìm kiếm sản phẩm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => setModalVisible(true)}>
            <Icon3 name="delete" size={40} color="#F24822"></Icon3>
                <Text style={styles.textItem}>Xoá sản phẩm </Text> 
            </TouchableOpacity>
            <TouchableOpacity style={[styles.item, {width:'96%'}]} onPress={moveToUser}>
                <Icon4 name="user-shield" size={40} color="#F24822"></Icon4>
                <Text style={styles.textItem}>Tài khoản</Text>
                </TouchableOpacity>
        </View>
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        >
          <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={handleModalPress}>
              <View style={styles.centeredView} ref={modalRef}>
          <View style={styles.modalView}>
            <TextInput value={foodId} style={stylesB.textInput} placeholderTextColor='#888' placeholder="Nhập id món ăn"
                onChangeText={(text) => setFoodId(text)} />
            <TouchableOpacity style={[stylesB.containerButton, {height:50}]}  onPress={deleteFood}>
              <Text style={[stylesB.actionButtonText, {fontSize:18}]}>Xoá món ăn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
          </View>
        
      </Modal>
        
        
    </View>
  );

};
const styles = StyleSheet.create({
    containerImage:{
     
    },
    logoFage1:{
      marginTop:'-16%',
      borderRadius:10,
      marginBottom:30,
      width:390,
      height:300,
    },
    containerItem:{
        width:'100%',
        height:300,
        // backgroundColor:'#fff',
        flexDirection:'row-reverse',
        flexWrap: 'wrap'
    },
    item:{
        width:190,
        height:100,
        backgroundColor:'#fff',
        margin:5,
        marginRight:8,
        marginBottom:30,
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
        justifyContent:'center',
        alignItems:'center'
    },
    textItem:{
        fontSize:16,
        marginTop:6
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      width:390,
      height:180,
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
 
})

export default Restaurant;
