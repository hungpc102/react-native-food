import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image, TextInput} from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';

const CartScreen = ({ navigation }: Props) => {

    return(
        <View style={stylesB.container}>
          <View style={styles.itemTitle}>
            <Text style={styles.title}>Giỏ hàng</Text>
            <Image style={{height:50, width:50}} source={require('../assets/photoInScreens/cart.png')}></Image>
          </View>
          <View style={styles.line} />
         
        </View>
    );
};

const styles = StyleSheet.create({
  itemTitle:{
    marginTop:50,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    width:'100%',
    marginBottom:10,
    backgroundColor:'#fff',
  },
  title:{
    fontSize:24,
    fontWeight:'600',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
  },
  itemTextTitle:{
    height:60,
    width:'100%',
    backgroundColor:'#eee',
    justifyContent:'center'
  },
  textTitle:{
    fontSize:20,
    fontWeight:'500',
    marginLeft:20
  },
  itemAddress:{
    flexDirection:'row-reverse',
    alignContent:'center',
    height:60,
    paddingTop:6
  },
  textInput:{
    // borderBottomWidth:1,
    borderColor:"#E6E6E6",
    fontSize: 22,
    marginBottom:28,
    width:'90%',
    fontWeight:'500',
    paddingLeft:50,
    height:50
  }
})

export default CartScreen;