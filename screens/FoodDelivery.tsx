import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, KeyboardAvoidingView, ScrollView, ActivityIndicator} from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconInvoice from 'react-native-vector-icons/FontAwesome5';
import { useRoute } from '@react-navigation/native';
import {createOrder} from '../services/orderService/createOrder'
import {deleteCart} from '../services/cartService/deleteAllCart'
import { createOrderDetail } from '../services/orderDetailService/createOrderDetail';
import {updateQuantity} from '../services/foodService/updateQuantity'


interface FoodItem {
    foodId: number;
    foodName: string;
    foodPrice: number;
    foodQuantity: number;
    foodImage: string
  }
  
  interface FoodDataContainer {
    foodData: FoodItem[];
    infoCart: CartItem[]
  }

  type CartItem = {
    USER_ID: number;
    FOOD_ID: number;
    QUANTITY: number;
  };

const FoodDelivery = ({navigation}: Props) =>{
    const [address, setAddress] = useState('')
    const route = useRoute();
    const [loading, setLoading] = useState(false)


    const foodData = (route.params as FoodDataContainer).foodData;
    const totalPrice = (route.params as { totalPrice: number }).totalPrice;
    const shipPrice = 20000
    const infoCart = (route.params as FoodDataContainer).infoCart


    const handleCreateOrder = async () => {
            setLoading(true)
            const orderName = foodData.map(item => item.foodName).join(', ');
            const responseData: any = await createOrder(address, totalPrice, shipPrice, orderName,totalPrice + shipPrice);
            if (responseData !== undefined) {
            const orderId = responseData.elements.ORDER_ID;
            
            // Tạo một mảng chứa tất cả các promise tạo order detail
            const createOrderDetailPromises: Promise<any>[] = [];
            const updateQuantityPromises: Promise<any>[]=[]
            
            infoCart.forEach((cartItem) => {
                const { FOOD_ID, QUANTITY } = cartItem;
                const foodItem = foodData.find((item) => item.foodId === FOOD_ID);
                
                if (foodItem) {
                    const priceItemFood = foodItem.foodPrice * QUANTITY;
                    const createOrderDetailPromise = createOrderDetail(orderId, FOOD_ID, QUANTITY, priceItemFood);
                    const updateQuantityPromise = updateQuantity(FOOD_ID, -QUANTITY)
                    createOrderDetailPromises.push(createOrderDetailPromise)
                    updateQuantityPromises.push(updateQuantityPromise)

                    }
                });
                
                await Promise.all(createOrderDetailPromises)


                deleteCart(); // Xóa giỏ hàng
                alert('Đã đặt hàng')
                navigation.navigate('TopBarOrder');
            }else{
                console.log('Lỗi')
                setLoading(false) 
            }
        
           setLoading(false) 
           console.log(loading)
        }
      
     

    const Separator = () => <View style={styles.line} />

    return(
        <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
            <View style={styles.title}>
                <Text style={styles.textTitle}>Giao tới</Text>
            </View>
            <View style={{flexDirection:'row'}}>
                <TextInput value={address} style={[stylesB.textInput, styles.address]} placeholder="Nơi giao" placeholderTextColor={'#999'} autoCapitalize='none' 
                onChangeText={(text) => setAddress(text)} />
                <Icon style={styles.iconLocation} name="location-pin" size={26} color={'#F24822'}/>
            </View>
            <View style={styles.title}>
                <Text style={styles.textTitle}>Đơn hàng</Text>
            </View>
            <View style={[styles.order, {flex:3, height:1000}]}>
                <FlatList 
                    scrollEnabled={true}
                    data={foodData ? foodData : null}
                    keyExtractor={(item) => item.foodName}
                    ItemSeparatorComponent={Separator}
                    renderItem={({ item }) => {
                        const itemPrice = item.foodPrice * item.foodQuantity
                        return (
                            <View style={styles.foodItem}>
                                <Image source={{ uri: `data:image/jpeg;base64,${item.foodImage}` }} style={styles.image} />
                                <Text style={styles.foodQuantity}>{`${item.foodQuantity}X`}</Text>
                                <View style={styles.itemInfoFood}>
                                    <Text style={styles.foodName}>{item.foodName}</Text>
                                    <Text style={styles.foodPrice}>{`${itemPrice.toLocaleString('vi-VN')}đ`}</Text>
                                </View>

                            </View>
                        );
                    }}
                />
            </View>
                <ScrollView scrollEnabled={false}>
            <View style={styles.title}>
                <Text style={styles.textTitle}>Thanh toán</Text>
            </View>
                <View style={[styles.order, {flexDirection:'row', justifyContent:'space-between'}]}>
                    <Icon style={{marginLeft:20, marginRight:10}} name="payment" size={26} color={'#F24822'}/>

                    <Text style={{fontSize:19,fontWeight:'500'}}>Phương thức thanh toán</Text>
                    <View style={{flexWrap: 'wrap'}}> 
                        <Text style={[styles.textPay,{fontSize:16, maxWidth:'48%'}]}>Thanh toán khi nhận hàng</Text>
                    </View>
                </View>
                <View style={[styles.title, {height:10}]}>
                </View>
                <View style={[styles.order]}>
                    <View style={{flexDirection:'row', marginLeft:20, marginRight:20}}>
                        <IconInvoice style={styles.iconInvoice} name="file-invoice-dollar" size={26} color={'#F24822'}/>
                        <Text style={{fontSize:19,fontWeight:'500'}}>Chi tiết thanh toán</Text>     
                    </View>
                    <View style={[styles.price]}>
                       <Text style={styles.textPay}>Tổng tiền hàng</Text>  
                       <Text style={styles.textPay}>{totalPrice.toLocaleString('vi-VN')}đ</Text>
                    </View>
                    <View style={[styles.price]}>
                       <Text style={styles.textPay}>Tổng phí vận chuyển</Text>  
                       <Text style={styles.textPay}>{shipPrice.toLocaleString('vi-VN')}đ</Text>
                    </View>
                    <View style={[styles.price]}>
                       <Text style={[styles.textPay,{fontSize:20, fontWeight:'500'}]}>Tổng thanh toán</Text>
                       <Text style={[styles.textPay,{color:'#F24822'}]}>
                       {(totalPrice + shipPrice).toLocaleString('vi-VN')}đ
                       </Text>
                    </View>
                </View>
                </ScrollView>
            
                
                <View style={styles.buttonBar}>
                    <Text style={styles.totalPrice}>{(totalPrice+shipPrice).toLocaleString('vi-VN')}đ</Text>
                    <TouchableOpacity style={[stylesB.containerButton, styles.button]} onPress={handleCreateOrder}>
                        <Text style={[stylesB.actionButtonText,{fontSize:20}]}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
                {loading && (
                     <ActivityIndicator size="large" color="#F24822" style={{ marginTop: '80%', position:'absolute', width:'100%'}} />
                )}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    title:{
        height:40,
        justifyContent:'center',
        marginLeft:20
    },
    textTitle:{
        fontSize:20,
        fontWeight:'500',
        color:'#555'
    },
    address:{
        marginLeft : 10,
        paddingTop:14,
        paddingBottom:14,
        paddingLeft:42,
        paddingRight:10,
        backgroundColor:'#fff',
        width: '95%',
        borderBottomWidth:1,
        borderColor:'#F24822',
        fontSize:20,
        marginBottom:0,
        borderRadius:4
    },
    iconLocation:{
        position:'absolute',
        marginTop:14,
        marginLeft:18
    },
    order:{
        backgroundColor:'#fff',
        paddingBottom:10,
        paddingTop:10,
        
    },
    foodItem:{
        flexDirection:'row',
        marginTop:8,
        marginBottom:8,
        width:'100%'
    },
    foodName:{
        fontSize:16
    },
    foodPrice:{
        fontSize:16,
        marginTop:10
    },
    foodQuantity:{
        marginLeft:10,
        marginTop:10,
        color:'#666'
    },
    image:{
        height:50,
        width:50,
        marginLeft:20
    },
    itemInfoFood:{
        marginLeft:30,
        marginTop:9,
    },
    line: {
        width: '90%',
        height: 1,
        backgroundColor: '#999',
        marginLeft:'5%',
        marginRight:'5%'
    },
    textPay:{
        marginLeft:20,
        fontSize:18,
        marginRight:20,
    },
    price:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    iconInvoice:{
        marginRight:10,
        marginBottom:20,
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
        backgroundColor:'#fff'
    },    
    totalPrice:{
        fontSize:24,
        color:'red',
        marginBottom:30
    },
    button:{
        width:200,
        height:50,
        borderRadius:10,
        marginBottom:34,
      },
})

export default FoodDelivery;