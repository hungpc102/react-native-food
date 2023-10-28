import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import stylesB from '../assets/css/stylesB';
import { Props } from '../services/interfaces/navigationTypes';
import { getInfoCart } from '../services/getCartById';
import { getFoodById } from '../services/getFoodById';
import { updateQuantity } from '../services/updateQuantityFood';

type CartItem = {
  USER_ID: number;
  FOOD_ID: number;
  QUANTITY: number;
};

type infoFOOD = {
  FOOD_ID: number;
  FOOD_NAME: string;
  FOOD_PICTURE: any;
  FOOD_QUANTITY: number;
  FOOD_PRICE:number
};

const CartScreen = ({ navigation }: Props) => {
  const [infoCart, setInfoCart] = useState<CartItem[]>([]);
  const [foodInfo, setFoodInfo] = useState<infoFOOD[]>([]);
  const [loading, setLoading] = useState(false)
  const [dataUpdated, setDataUpdated] = useState(false); 
  const [totalPrice, setTotalPrice] = useState(0);
  const Separator = () => <View style={styles.separator} />;

  const handleIncreaseQuantity = async(foodId: number, productQuantity: number, quantityCart:number) => {
    setLoading(true)
    if (quantityCart < productQuantity) {
      await updateQuantity(foodId, quantityCart + 1); 
      setDataUpdated(false);
    }
    setLoading(false)
  };

  const handleDecreaseQuantity = async(foodId: number, quantityCart:number) => {
    setLoading(true)
    if (quantityCart > 0) {
      await updateQuantity(foodId, quantityCart - 1); 
      setDataUpdated(false);
    }
    setLoading(false)
  };

  const showCarts = async () => {
    try {
      await getInfoCart(setInfoCart);
      if (infoCart.length > 0) {
        const foodIds = infoCart.map((item) => item.FOOD_ID);
        if (foodIds.length > 0) {
          const foodPromises = foodIds.map((foodId) => getFoodById(foodId));
          const foods = await Promise.all(foodPromises);
          setFoodInfo(foods);
  
          // Tính toán tổng giá ở đây
          const totalPrice = foods.reduce((acc, food) => {
            const cartItem = infoCart.find((cart) => cart.FOOD_ID === food.FOOD_ID);
            if (cartItem) {
              acc += food.FOOD_PRICE * cartItem.QUANTITY;
            }
            return acc;
          }, 0);
          setTotalPrice(totalPrice);
  
          setDataUpdated(true);
        }
      }
    } catch (error) {
      console.error('Lỗi khi truy xuất dữ liệu:', error);
    }
  };

  const handleDelivery = ()=>{
    navigation.navigate('FoodDelivery')
  }


  useEffect(() => {
    if (!dataUpdated) { 
      showCarts();
    }
  }, [infoCart, dataUpdated]); 



  return (
    <View style={stylesB.container}>
      <View style={styles.itemTitle}>
        <Text style={styles.title}>Giỏ hàng</Text>
        <Image style={{ height: 50, width: 50 }} source={require('../assets/photoInScreens/cart.png')} />
      </View>
      <View style={styles.line} />
      <View style={{ paddingBottom:210}}>
        <FlatList
        data={foodInfo}
        keyExtractor={(item) => item.FOOD_ID.toString()}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => {
          const cartItem = infoCart.find((cart) => cart.FOOD_ID === item.FOOD_ID);
          const itemPrice = cartItem ? cartItem.QUANTITY * item.FOOD_PRICE : 0;

          return (
            <View style={styles.item}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image source={{ uri: `data:image/jpeg;base64,${item.FOOD_PICTURE}` }} style={styles.image} />
              <View>
                <Text style={styles.textName}>{item.FOOD_NAME}</Text>
                <Text style={styles.textPrice}>{itemPrice.toLocaleString()}đ</Text>
              </View>
              </View>
              
      
              <View style={styles.addFood}>
                <TouchableOpacity onPress={() => handleDecreaseQuantity(item.FOOD_ID, cartItem?.QUANTITY ?? 0)}>
                  <Text style={styles.textAdd}>-</Text>
                </TouchableOpacity>
                <Text style={styles.textQuantity}>{cartItem ? cartItem.QUANTITY : 0}</Text>
                <TouchableOpacity
                  onPress={() => handleIncreaseQuantity(item.FOOD_ID, item.FOOD_QUANTITY, cartItem?.QUANTITY ?? 0)}>
                  <Text style={styles.textAdd}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          );
        }}
       
      />
      </View>
      

        <View style={styles.buttonBar}>
            <Text style={styles.totalPrice}>{totalPrice.toLocaleString()}đ</Text>
            <TouchableOpacity style={[stylesB.containerButton, styles.button]} onPress={handleDelivery}>
            <Text style={[stylesB.actionButtonText,{fontSize:20}]}>Giao hàng</Text>
            </TouchableOpacity>
        </View>
        
        {loading && (
      <ActivityIndicator size="large" color="#F24822" style={{ marginTop: '70%', position:'absolute' }} />
    )}
         
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
  },
  image:{
    width: 100,
    height:100,
    borderRadius:0,
    margin: 6,
    marginRight:14,
    borderColor:'#CCCCCC',
    borderWidth:1
  },
  item:{
    width: '100%', 
    flexDirection:'row',
    alignItems: 'center',
    marginTop:6,
    marginLeft:0,
    alignContent:'center',
    justifyContent:'space-around'
  },
  textName:{
    fontSize: 20,
    fontWeight:'500'
  },
  addFood:{
    flexDirection:'row',
    marginRight:20,
    marginTop:70
  },
  textAdd:{
    fontSize:20,
    margin:8,
    paddingTop:0,
    backgroundColor:'#ccc',
    width:30,
    height:30,
    textAlign:'center',
    borderRadius:5
  },
  textQuantity:{
    fontSize:18,
    marginTop:10,
    height:50,
    width:30,
    textAlign:'center'
  },
  textPrice:{
    color:'red',
    marginTop:30,
    fontSize:16
  },
  button:{
    width:200,
    height:50,
    borderRadius:10,
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
    alignItems:'center'
  },
  totalPrice:{
    fontSize:24,
    color:'red'
  },
  separator: {
    height: 1,
    backgroundColor: 'gray', 
    width:'65%',
    marginLeft:'30%',
    marginTop:6
  },
})

export default CartScreen;