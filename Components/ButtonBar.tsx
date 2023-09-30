
import React from 'react';
import HomePage2 from '../screens/HomePage2';
import UserScreen from '../screens/UserScreen';
import InvoiceScreen from '../screens/InvoiceScreen';
import CartScreen from '../screens/CartScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconCheck from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';


const ButtonBar = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="HomePage2"
      screenOptions={(route) => ({
        headerShown:false,
        tabBarInactiveTintColor:'#333',
        tabBarActiveTintColor: '#F24822', 
        tabBarStyle: {
          height: 80, 
          paddingBottom:20,
        },
        
      })}
      >
      <Tab.Screen name="HomePage2"  component={HomePage2} options={{
        headerShown:false,
        tabBarLabel: 'Trang chủ',
        tabBarLabelStyle: {
          fontSize: 14,
          
        },
        tabBarIconStyle:{
          fontSize: 30,
        },
        tabBarIcon: ({ color, size }) => (
          <IconCheck name="home" color={color} size={size} /> )
        }}
      />

      <Tab.Screen name="CartScreen" component={CartScreen} options={{
        tabBarLabel: 'Giỏ hàng',
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarIconStyle:{
          fontSize: 30,
        },
        tabBarIcon: ({ color, size }) => (
          <IconCheck name="cart" color={color} size={size} /> )
        }}
      />

      <Tab.Screen name="InvoiceScreen" component={InvoiceScreen} options={{
        tabBarLabel: 'Hoá đơn',
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarIconStyle:{
          fontSize: 30,
        },
        tabBarIcon: ({ color, size }) => (
          <IconCheck name="document-text" color={color} size={size} /> )
        }}
      />

      <Tab.Screen name="UserScreen" component={UserScreen} options={{
        tabBarLabel: 'Tôi',
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarIconStyle:{
          fontSize: 30,
        },
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" color={color} size={size} /> )
        }}
      />
    </Tab.Navigator>
  );


};

export default ButtonBar