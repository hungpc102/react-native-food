import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';


const FoodDetail = ({ navigation }: Props) => {
    return(
        <View style={stylesB.container}>
            <View style={styles.containerImage}>
                <Image  style={styles.imgFood} source={require('../assets/photoInScreens/food.png')} />
                <Text style={styles.nameFood}>Pizza bò</Text>
            </View>
            <Text style={styles.foodInfo}>Pizza bò được làm từ thịt heo</Text>
                <View style={{width:'100%'}}>
                <TouchableOpacity >
                    <Text style={styles.textReview}>Xem thêm lượt đánh giá tại đây</Text>
                </TouchableOpacity>
                    <Text style={styles.textHeading}>Giá món: 50.000</Text>
            </View>
         
            <TouchableOpacity style={[stylesB.containerButton, styles.button]}
            onPress={() => navigation.navigate('HomePage2')}>
              <Text style={stylesB.actionButtonText}>Thêm vào giỏ</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    containerImage:{
    backgroundColor:'#E6E6E6',
    borderRadius:50,
    width:'94%',
    height:'48%',
    alignItems:'center',
    justifyContent:'center',
  },
  imgFood : {
    width:260,
    height:260,
    backgroundColor:'#F24822',
    borderRadius: 50, 
    position:'absolute'
  },
  nameFood:{
    marginTop:'80%',
    fontSize:24,
    fontWeight:'700'
  },
  foodInfo:{
    marginTop:20,
    fontSize: 18,
  },
  textReview:{
    fontSize:18,
    marginTop:60,
    color:'#505AB3',
    marginLeft:20
  },
  textHeading:{
    fontSize:30,
    fontWeight: '700',
    marginTop:30,
    marginLeft:20
  },
  button:{
    marginTop:110,
    width:240
  }
})

export default FoodDetail;