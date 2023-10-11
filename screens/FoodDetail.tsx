import React , {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes'
import { useRoute, RouteProp } from '@react-navigation/native';
import {getFoodById} from '../services/getFoodById'

type ParamList = {
  FoodDetail: { foodId: string }; 
}

const FoodDetail = ({ navigation }: Props) => {
  const [imageData, setImageData] = useState(''); 
  const [food, setFood] = useState<any>({})

  const route = useRoute<RouteProp<ParamList, 'FoodDetail'>>(); 

  const foodId = route.params.foodId;

  useEffect(() => {
    getFoodById(foodId)
      .then((data) => {
        const foodData: any = data.food; 
        const imageData =  foodData.FOOD_PICTURE; 
        setFood(foodData);
        setImageData(imageData);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }, []);

    return(
        <View style={stylesB.container}>
            <View style={styles.containerImage}>
                {imageData ? (
              <Image source={{ uri: `data:image/jpeg;base64,${imageData}` }} style={styles.imgFood} />
            ) : null}
                <Text style={styles.nameFood}>{food.FOOD_NAME}</Text>
            </View>
                <View style={{width:'100%'}}>
            <Text style={styles.foodInfo}>{food.FOOD_INFO}</Text>
                <TouchableOpacity >
            <Text style={styles.textReview}>Xem đánh giá</Text>
                </TouchableOpacity>
                    <Text style={styles.textHeading}>Giá món: {food.FOOD_PRICE}</Text>
            
            </View>
            <View style={styles.buttonBar}>
              <View style={styles.addFood}>
                <TouchableOpacity>
                  <Text style={styles.textAdd}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.textQuantity}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.textAdd}>+</Text>
                </TouchableOpacity>
              </View>
               <TouchableOpacity style={[stylesB.containerButton, styles.button]}
                onPress={() => navigation.navigate('HomePage2')}>
                  <Text style={[stylesB.actionButtonText,{fontSize:20}]}>Thêm vào giỏ</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    containerImage:{
    backgroundColor:'#ccc',
    borderRadius:50,
    width:'94%',
    height:'48%',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'-60%'
  },
  imgFood : {
    width:280,
    height:280,
    backgroundColor:'#F24822',
    borderRadius: 50, 
    position:'absolute'
  },
  nameFood:{
    marginTop:'88%',
    fontSize:24,
    fontWeight:'700',
    color:'#000'
  },
  foodInfo:{
    marginTop:20,
    fontSize: 18,
    marginLeft:20
  },
  textReview:{
    fontSize:18,
    marginTop:10,
    color:'#505AB3',
    marginLeft:20
  },
  textHeading:{
    fontSize:30,
    fontWeight: '700',
    marginTop:20,
    marginLeft:20
  },
  textQuantity:{
    fontSize:20,
    marginTop:16
  },
  buttonBar:{
    width:'100%',
    height:120,
    position:'absolute',
    top:'86%',
    borderTopColor: '#ccc',
    borderWidth:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  addFood:{
 
    flexDirection:'row',
    marginRight:10
  },
  textAdd:{
    fontSize:26,
    margin:10,
    paddingTop:2,
    backgroundColor:'#ccc',
    width:40,
    height:40,
    textAlign:'center'
  },
  button:{
    width:260,
    height:50,
    borderRadius:10,
    
  }
})

export default FoodDetail;