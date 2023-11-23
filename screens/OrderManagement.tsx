import React, {useState, useEffect} from 'react';
import { Text, View , StyleSheet, TouchableOpacity, FlatList, Pressable} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { getAllOrder } from '../services/orderService/getAllOrder';
import {updateOrder} from '../services/orderService/updateOrder'
import { useIsFocused } from '@react-navigation/native';
import { Props } from '../services/interfaces/navigationTypes';
import { Order } from '../services/interfaces/DataType';
 

function Pending({navigation}:Props) {
  const orderStatus:string = 'Pending';
  const [orders, setOrders] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false); 
  const isFocused = useIsFocused();

   const handleToInvoice = (orderId:number, orderStatus:string)=>{
  navigation.navigate('InvoiceScreen', {orderId, orderStatus})
 }

 const handleConfirmOrder = async(orderId:number, orderStatus:string) => {
    await updateOrder(orderId, orderStatus)
    setDataUpdated(false)
  }


 const handleCancelOrder = async(orderId:number, orderStatus:string) => {
  await updateOrder(orderId, orderStatus)
  setDataUpdated(false)
}

  const fetchData = async () => {   
        const fetchedOrders = await getAllOrder(orderStatus);
        setOrders(fetchedOrders);
        setDataUpdated(true);
     
    };

  useEffect(()=>{
    if(!dataUpdated || isFocused){
      fetchData();
    }
  },[dataUpdated, isFocused])

  const renderOrderItem = ({ item}:{item:Order}) => {
      const maxNameLength = 36;

    const orderName = item.ORDER_NAME.length > maxNameLength
    ? `${item.ORDER_NAME.substring(0, maxNameLength)}...`
    : item.ORDER_NAME;

    const updatedAt = new Date(item.updatedAt);
    const formattedDate = `${updatedAt.getDate()}/${updatedAt.getMonth() + 1}`;

    return(
    <View style={styles.itemOrder}>
        <Pressable onPress={()=> handleToInvoice(item.ORDER_ID, item.ORDER_STATUS)}>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Icon name="pending-actions" size={20} color={'#FFA500'}></Icon>
        <Text style={styles.statusOrder}>{item.ORDER_STATUS}</Text>
        <Text style={{marginLeft:10, marginTop:1, color:'#333', fontSize:14}}>{formattedDate}</Text>
      </View>
  
      <Text style={styles.nameOrder}>{orderName}</Text>
      <Text style={styles.priceOrder}>{item.TOTAL_INVOICE.toLocaleString('vi-VN')+'đ'}</Text>
        <Text style={styles.navigationButton}>{'>'}</Text>

      <View style={styles.line}></View>
      </Pressable>
      <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <TouchableOpacity style={styles.button} onPress={() => handleConfirmOrder(item.ORDER_ID, 'Delivering')}>
          <Text style={[styles.textButton, {color:'#00CED1'}]}>Xác nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=> handleCancelOrder(item.ORDER_ID, 'Canceled')}>
          <Text style={styles.textButton}>Huỷ đơn</Text>
          </TouchableOpacity>
      </View>
    </View>
  )};

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.ORDER_ID.toString()}
      />
    </View>
  );
}

function Delivering({navigation}:Props) {
  const orderStatus:string = 'Delivering';
  const [orders, setOrders] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false); 
  const isFocused = useIsFocused();

   const handleToInvoice = (orderId:number, orderStatus:string)=>{
  navigation.navigate('InvoiceScreen', {orderId, orderStatus})
 }

 const handleConfirmOrder = async(orderId:number, orderStatus:string) => {
    await updateOrder(orderId, orderStatus)
    setDataUpdated(false)
  }

  const fetchData = async () => {
    
        const fetchedOrders = await getAllOrder(orderStatus);
        setOrders(fetchedOrders);
        setDataUpdated(true);

    };

  useEffect(()=>{
    if(!dataUpdated || isFocused){
      fetchData();
    }
  },[dataUpdated, isFocused])

  const renderOrderItem = ({ item}:{item:Order}) => {
      const maxNameLength = 30;

    const orderName = item.ORDER_NAME.length > maxNameLength
    ? `${item.ORDER_NAME.substring(0, maxNameLength)}...`
    : item.ORDER_NAME;

    const updatedAt = new Date(item.updatedAt);
    const formattedDate = `${updatedAt.getDate()}/${updatedAt.getMonth() + 1}`;

    return(
    <View style={styles.itemOrder}>
        <Pressable onPress={()=> handleToInvoice(item.ORDER_ID, item.ORDER_STATUS)}>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Icon name="delivery-dining" size={20} color={'#A0529C'}></Icon>
        <Text style={[styles.statusOrder, {color:'#A0529C'}]}>{item.ORDER_STATUS}</Text>
        <Text style={{marginLeft:10, marginTop:1, color:'#333', fontSize:14}}>{formattedDate}</Text>
      </View>
  
      <Text style={styles.nameOrder}>{orderName}</Text>
      <Text style={styles.priceOrder}>{item.TOTAL_INVOICE.toLocaleString('vi-VN')+'đ'}</Text>
        <Text style={styles.navigationButton}>{'>'}</Text>

      </Pressable>
      <View style={styles.line}></View>
      <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <TouchableOpacity style={styles.button} onPress={() => handleConfirmOrder(item.ORDER_ID, 'Delivered')}>
          <Text style={[styles.textButton, {color:'#00CED1'}]}>Đã giao</Text>
          </TouchableOpacity>
      </View>
    </View>
  )};

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.ORDER_ID.toString()}
      />
    </View>
  );
}

function Delivered({navigation}:Props) {
  const orderStatus:string = 'Delivered';
  const [orders, setOrders] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false); 
  const isFocused = useIsFocused();

   const handleToInvoice = (orderId:number, orderStatus:string)=>{
  navigation.navigate('InvoiceScreen', {orderId, orderStatus})
 }

 const handleConfirmOrder = async(orderId:number, orderStatus:string) => {
    await updateOrder(orderId, orderStatus)
    setDataUpdated(false)
  }

  const fetchData = async () => {
        const fetchedOrders = await getAllOrder(orderStatus);
        setOrders(fetchedOrders);
        setDataUpdated(true);
    };

  useEffect(()=>{
    if(!dataUpdated || isFocused) {
      fetchData();
    }
  },[dataUpdated,isFocused ])

  const renderOrderItem = ({ item}:{item:Order}) => {
      const maxNameLength = 30;

    const orderName = item.ORDER_NAME.length > maxNameLength
    ? `${item.ORDER_NAME.substring(0, maxNameLength)}...`
    : item.ORDER_NAME;

    const updatedAt = new Date(item.updatedAt);
    const formattedDate = `${updatedAt.getDate()}/${updatedAt.getMonth() + 1}`;

    return(
    <View style={styles.itemOrder}>
        <Pressable onPress={()=> handleToInvoice(item.ORDER_ID, item.ORDER_STATUS)}>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Icon name="check-circle" size={20} color={'#333'}></Icon>
        <Text style={[styles.statusOrder, {color:'#333'}]}>{item.ORDER_STATUS}</Text>
        <Text style={{marginLeft:10, marginTop:1, color:'#333', fontSize:14}}>{formattedDate}</Text>
      </View>
  
      <Text style={styles.nameOrder}>{orderName}</Text>
      <Text style={styles.priceOrder}>{item.TOTAL_INVOICE.toLocaleString('vi-VN')+'đ'}</Text>
        <Text style={styles.navigationButton}>{'>'}</Text>

      </Pressable>
    </View>
  )};

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.ORDER_ID.toString()}
      />
    </View>
  );
}

function Canceled({navigation}:Props) {
  const orderStatus:string = 'Canceled';
  const [orders, setOrders] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false); 
  const isFocused = useIsFocused();

   const handleToInvoice = (orderId:number, orderStatus:string)=>{
  navigation.navigate('InvoiceScreen', {orderId, orderStatus})
 }

 const handleConfirmOrder = async(orderId:number, orderStatus:string) => {
    await updateOrder(orderId, orderStatus)
    setDataUpdated(false)
  }

  const fetchData = async () => {
        const fetchedOrders = await getAllOrder(orderStatus);
        setOrders(fetchedOrders);
        setDataUpdated(true);

    };

  useEffect(()=>{
    if(!dataUpdated || isFocused) {
      fetchData();
    }
  },[dataUpdated,isFocused ])

  const renderOrderItem = ({ item}:{item:Order}) => {
      const maxNameLength = 30;

    const orderName = item.ORDER_NAME.length > maxNameLength
    ? `${item.ORDER_NAME.substring(0, maxNameLength)}...`
    : item.ORDER_NAME;

    const updatedAt = new Date(item.updatedAt);
    const formattedDate = `${updatedAt.getDate()}/${updatedAt.getMonth() + 1}`;

    return(
    <View style={styles.itemOrder}>
        <Pressable onPress={()=> handleToInvoice(item.ORDER_ID, item.ORDER_STATUS)}>
      <View style={{ flexDirection: 'row', marginLeft: 20 }}>
        <Icon name="error" size={20} color={'red'}></Icon>
        <Text style={[styles.statusOrder, {color:'red'}]}>{item.ORDER_STATUS}</Text>
        <Text style={{marginLeft:10, marginTop:1, color:'#333', fontSize:14}}>{formattedDate}</Text>
      </View>
  
      <Text style={[styles.nameOrder, {color:'#999'}]}>{orderName}</Text>
      <Text style={[styles.priceOrder, {color:'#999'}]}>{item.TOTAL_INVOICE.toLocaleString('vi-VN')+'đ'}</Text>
      </Pressable>
    </View>
  )};

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.ORDER_ID.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemOrder:{
    width:'100%',
    backgroundColor:'#fff',
    marginTop:20,
    paddingTop:20,
    paddingBottom:10
  },
  statusOrder:{
    fontSize:16,
    marginLeft:4,
    color:'#FFA500'
  },
  nameOrder:{
    fontSize:20,
    marginTop:4,
    marginLeft:20
  },
  priceOrder:{
    fontSize:18,
    marginLeft:20,
    marginTop:10,
    marginBottom:10
  },
  line:{
    width:'100%',
    borderWidth:0.6,
    borderColor:'#ddd',
  },
  button:{
    justifyContent:'center',
    marginTop:10
  },
  textButton:{
    textAlign:'center',
    fontSize:17,
    color:'#F24822',
    fontWeight:'600'
  },
  navigationButton:{
    position:'absolute',
    marginLeft:'86%',
    fontSize:26,
    color:'#666',
    fontWeight:'500',
    padding:20
  }
})


const Tab = createMaterialTopTabNavigator();

export default function OrderManagement() {
    return (
        <View style={{ backgroundColor:'#fff',flex: 1 }}>
            <View style={{ marginTop:0 }}>
            </View>
            <Tab.Navigator
            
            screenOptions={{
            tabBarLabelStyle: { fontSize: 17, textTransform: 'none' },
            tabBarScrollEnabled: true,
            tabBarItemStyle :{width:'auto'},
            tabBarActiveTintColor:'#F24822',
            tabBarInactiveTintColor:'#000',
            tabBarIndicatorStyle: { backgroundColor: '#F24822' } ,
            tabBarGap: 40,
            tabBarPressColor:'#fff',
           
          }}
            >   
                <Tab.Screen name="Chờ xác nhận" component={Pending}  />
                <Tab.Screen name="Đang giao" component={Delivering}/>
                <Tab.Screen name="Đã giao" component={Delivered}/>
                <Tab.Screen name="Đã huỷ" component={Canceled}/>
            </Tab.Navigator>
            
        </View>    
      )
}
 
