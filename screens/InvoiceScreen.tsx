import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import { getOrderDetail } from '../services/orderDetailService/getOrderDetail';
import { getOrderById } from '../services/orderService/getOrder';
import { useRoute } from '@react-navigation/native';
import { getFoodById } from '../services/foodService/getFoodById';
import { getInfoUser } from '../services/userService.tsx/getUserById';
import { Order, OrderDetail, Food, User } from '../services/interfaces/DataType';

const InvoiceScreen = () => {
  const route = useRoute();
  const {orderId } = route.params as { orderId: number };
  const [order, setOrder] = useState<Order | undefined>();
  const [orderDetail, setOrderDetail] = useState<OrderDetail[]>([]);
  const [foodDataList, setFoodDataList] = useState<Food[]>([]);
  const [userInfo, setUserInfo] = useState<User | undefined>()
  const [loading, setLoading] = useState(false)


  const getInvoice = async () => {
    try {
      setLoading(true)
      const orderData = await getOrderById(orderId);
      if (orderData) {
        const userId = orderData?.USER_ID;
        const infoUserData = await getInfoUser(userId)
        setUserInfo(infoUserData)
        setOrder(orderData);
      }

      const orderDetailData = await getOrderDetail(orderId);
     
      if (orderDetailData) {
        setOrderDetail(orderDetailData);

        const foodPromises = orderDetailData.map(async (detail:OrderDetail) => {
          const foodData = await getFoodById(detail.FOOD_ID);
          return foodData;
        });

        const foodResults = await Promise.all(foodPromises);
        setFoodDataList(foodResults);

      }

    } catch (error) {
      // Xử lý lỗi khi gọi API
      console.log('Error fetching data:', error);
    }
    finally{
    setLoading(false)
    }
  };

  useEffect(()=>{
    getInvoice()
  },[])

  const maxNameLength = 60

  let orderName = order ? (order.ORDER_NAME.length > maxNameLength ?
    `${order.ORDER_NAME.substring(0, maxNameLength)}...`
    : order.ORDER_NAME)
    : '';

    let formattedDateTime = '';
    if (order && order.updatedAt) {
      const updatedAt = new Date(order.updatedAt);
      const day = updatedAt.getDate();
      const month = updatedAt.getMonth() + 1;
      const year = updatedAt.getFullYear();
      const hours = updatedAt.getHours();
      const minutes = updatedAt.getMinutes();

      formattedDateTime = `${day}/${month}/${year} ${hours + 7}:${minutes}`;
    }
    
    return(
      <ScrollView style={styles.container}>
         <View style={{alignItems:'center'}}>
          <View style={styles.header}>
            <Text numberOfLines={2} style={styles.nameOrder}>{orderName}</Text>
            <Text style={styles.time}>{formattedDateTime}</Text>
          </View>
          <View  style={{width:'90%'}}>
          {orderDetail.map((detail, index) => (
          <View key={index}>
            <View style={styles.row}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textQuantity}>{detail.UNIT_QUANTITY}X</Text>
                {/* Hiển thị tên FOOD thay vì FOOD_ID */}
                <Text style={styles.nameFood}>
                  {foodDataList[index] ? foodDataList[index].FOOD_NAME : ''}
                </Text>
              </View>
              <Text style={styles.priceFood}>{detail.UNIT_PRICE.toLocaleString('vi-VN')}đ</Text>
            </View>
          </View>
        ))}
            
            <View style={styles.line}></View>
            <View style={styles.row}>
              <Text style={{fontSize:15, marginTop:4}}>Tổng tiền hàng</Text>
              <Text style={{marginTop:4}}>{order?.TOTAL_INVOICE.toLocaleString('vi-VN')}đ</Text>
            </View>
            <View style={styles.row}>
              <Text style={{fontSize:15, marginTop:4}}>Tổng phí vận chuyển</Text>
              <Text style={{marginTop:4}}>{order?.SHIPPING_FEE.toLocaleString('vi-VN')}đ</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.row}>
              <Text style={{fontSize:19}}>Tổng thanh toán</Text>
              <Text style={{fontSize:19, fontWeight:'500'}}>{order?.TOTAL_PAYMENT.toLocaleString('vi-VN')}đ</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.row}>
              <Text style={{fontSize:19}}>Thanh toán bằng</Text>
              <Text style={{fontSize:19}}>Tiền mặt</Text>
            </View>
            <View style={styles.line}></View>
            <View style={[styles.row, {justifyContent:'flex-start'}]}>
              <View style={{marginRight:30}}>
                <Text style={{marginTop:10}}>Mã đơn hàng</Text>
                <Text style={{marginTop:10}}>Tên</Text>
                <Text style={{marginTop:10}}>Số điện thoại</Text>
                <Text style={{marginTop:10}}>Địa chỉ</Text>
              </View>
              <View>
                <Text style={{marginTop:10}}>{order?.ORDER_ID}</Text>
                <Text style={{marginTop:10}}>{userInfo?.USER_NAME}</Text>
                <Text style={{marginTop:10}}>{userInfo?.USER_PHONE}</Text>
                <Text style={{marginTop:10}}>{order?.ADDRESS}</Text>
              </View>
            </View>
          </View>
        </View>
        {loading && (
                     <ActivityIndicator size="large" color="#F24822" style={{ marginTop: '80%', position:'absolute', width:'100%'}} />
                )}
      </ScrollView>
       
    )
}

const styles = StyleSheet.create({
   container:{
    flex:1,
     backgroundColor:'#fff',
    //  alignItems:'center'
   },
   header:{
    alignItems:'center',
    marginBottom:30,
    marginTop:10,
    width:'90%'
   },
   nameOrder:{
    fontSize:26,
    fontWeight:'700'
   },
   time:{
    fontSize:14,
    color:'#333',
    marginTop:10
   },
   textQuantity:{
    color:'#333',
    marginTop:12,
   },
   nameFood:{
    fontSize:17,
    marginLeft:10,
    marginTop:10
   },
   priceFood:{
    marginTop:12,
    fontSize:15
   },
   line:{
    borderWidth:0.6,
    borderColor:'#999',
    marginTop:20,
    marginBottom:20
   },
   row:{
    flexDirection:'row',justifyContent:'space-between'
   }
})

export default InvoiceScreen;