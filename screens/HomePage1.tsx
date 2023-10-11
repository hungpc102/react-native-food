import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';

const HomePage1 = ({ navigation }: Props) => {
    return(
        <View style={stylesB.container}>
            <View style={styles.containerImage}>
                <Image  style={styles.logoFage1} source={require('../assets/photoInScreens/ImageHome1.png')} />
            </View>
            <Text style={styles.textParagraph}>Các món khác</Text>
            <Text style={styles.textHeading}>Hãy tận hưởng hết mình</Text>
            <TouchableOpacity style={[stylesB.containerButton, {width:250}, {height:60},{paddingTop:3}]}
            onPress={() => navigation.navigate('ButtonBar')}>
              <Text style={stylesB.actionButtonText}>Bắt đầu</Text>
            </TouchableOpacity>
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

export default HomePage1;