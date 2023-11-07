import * as React from 'react';
import { Text, View , StyleSheet, TouchableOpacity} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'


function Pending() {
  return (
    <View style={{ flex: 1}}>
      
        <View style={styles.itemOrder}>
          <View style={{flexDirection:'row', marginLeft:20}}>
            <Icon name="pending-actions" size= {20} color={'#FFD700'}> </Icon>
            <Text style={styles.statusOrder}>Chờ xác nhận</Text>
          </View>
          
          <Text style={styles.nameOrder}>Tên món</Text>
          <Text style={styles.priceOrder}>Tổng số tiền</Text>
        <View style={styles.line}></View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Huỷ đơn</Text>
        </TouchableOpacity>
        </View>
      
    </View>
  );
}

function Delivering() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function Delivered() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>

  );
}

function Canceled() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
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
    color:'#FFD700'
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
    borderWidth:1,
    borderColor:'#999',
  },
  button:{
    justifyContent:'center',
    marginTop:10
  },
  textButton:{
    textAlign:'center',
    fontSize:17,
    color:'#F24822'
  }
})


const Tab = createMaterialTopTabNavigator();

export default function TopBarOrder() {
    return (
        <View style={{ backgroundColor:'#fff',flex: 1 }}>
            <View style={{ marginTop:'14%' }}>
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
                <Tab.Screen name="Chờ xác nhận" component={Pending}/>
                <Tab.Screen name="Đang giao" component={Delivering}/>
                <Tab.Screen name="Đã giao" component={Delivered}/>
                <Tab.Screen name="Đã huỷ" component={Canceled}/>
            </Tab.Navigator>
            
        </View>    
      );
}