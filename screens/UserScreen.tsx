import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';


const UserScreen = ({ navigation }: Props) => {
    return(
        <View style={stylesB.container}>
            <Text>Màn user</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  logoFage1 : {
    width:230,
    height:230,
    
  },
  containerImage:{
    borderWidth:22,
    borderColor:'#E6E6E6',
    marginTop:'40%',
    marginBottom:120,
    borderRadius:1
  },
  textParagraph:{
    fontSize:18
  },
  textHeading:{
    fontSize:30,
    fontWeight: '400',
    marginBottom:50
  }
})

export default UserScreen;