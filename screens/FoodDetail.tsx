import React , {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes'
import { useRoute, RouteProp } from '@react-navigation/native';
import {getFoodById, } from '../services/foodService/getFoodById'
import {createCart} from '../services/cartService/addFoodToCart'

type ParamList = {
  FoodDetail: { foodId: string }; 
}

type CartItem = {
  USER_ID: number;
  FOOD_ID: number;
  QUANTITY: number;
};

const FoodDetail = ({ navigation }: Props) => {
  const [imageData, setImageData] = useState(''); 
  const [food, setFood] = useState<any>({})
  const [quantity, setQuantity] = useState(1)
  const [productQuantity, setProductQuantity] = useState(1)

  const route = useRoute<RouteProp<ParamList, 'FoodDetail'>>(); 

  const foodId = route.params.foodId;
  const foodIdNUmber=  parseInt(foodId, 10)

  const handleIncreaseQuantity = () => {
    if(quantity < productQuantity){
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
      

  const handleCreateCart = async () => {
        await createCart(foodIdNUmber, quantity);
        navigation.navigate("ButtonBar")
  };


  useEffect(() => {
    getFoodById(foodIdNUmber)
      .then((data) => {
        const foodData: any = data; 
        const imageData =  foodData.FOOD_PICTURE; 
        setFood(foodData);
        setImageData(imageData);
        setProductQuantity( foodData.FOOD_QUANTITY)
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
            <Text  style={styles.foodInfo}>ID: {food.FOOD_ID}</Text>
            <Text style={styles.foodInfo}>{food.FOOD_INFO}</Text>
                <TouchableOpacity >
            <Text style={styles.textReview}>Xem đánh giá</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.textHeading}>Giá món:</Text>
                  <Text style={[styles.textHeading, {color:'red', marginLeft:0}]}> {food.FOOD_PRICE ? food.FOOD_PRICE.toLocaleString() + 'đ' : 'N/A'}</Text>
                </View>
            
            </View>
            <View style={styles.buttonBar}>
              <View style={styles.addFood}>
                <TouchableOpacity style={styles.textAdd} onPress={handleDecreaseQuantity}>
                  <Text style={{fontSize:24}}>-</Text>
                </TouchableOpacity>
                  <Text style={styles.textQuantity}>{quantity}</Text>
                <TouchableOpacity style={styles.textAdd} onPress={handleIncreaseQuantity}>
                  <Text style={{fontSize:24}}>+</Text>
                </TouchableOpacity>
              </View>
               <TouchableOpacity style={[stylesB.containerButton, styles.button]}
                onPress={handleCreateCart}>
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
    fontSize:26,
    fontWeight: '600',
    marginTop:20,
    marginLeft:20,
  },
  textQuantity:{
    fontSize:20,
    marginTop:14,
    height:50,
    width:30,
    textAlign:'center'
  },
  buttonBar:{
    width:'100%',
    height:100,
    position:'absolute',
    top:'88%',
    borderTopColor: '#ccc',
    borderTopWidth:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  addFood:{
    flexDirection:'row',
    marginRight:20,
    marginBottom:14,
    justifyContent:'center'
  },
  textAdd:{
    margin:10,
    backgroundColor:'#ccc',
    width:34,
    height:34,
    borderRadius:5,
    justifyContent:'center',
    alignItems:"center"
  },
  button:{
    width:200,
    height:50,
    borderRadius:10,
    marginBottom:34
  }
})

export default FoodDetail;