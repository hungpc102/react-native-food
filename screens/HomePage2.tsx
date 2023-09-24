import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,FlatList, TextInput, ScrollView, LayoutAnimation} from 'react-native';
import stylesB from '../assets/css/stylesB'
import {  Props } from '../services/interfaces/navigationTypes';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconCheck from 'react-native-vector-icons/Ionicons'





const HomePage2 = ({ navigation }: Props) => {
  const categoryDatas = [
    {
      "category": "Pizza",
      "items": [
        {"name":"Pizza Margherita", "imageURL":"../assets/photoInScreens/food.png"},
        {"name":"Pizza hải sản" , "imageURL":"../assets/photoInScreens/food.png"},
        {"name":"Pizza thập cẩm", "imageURL":"../assets/photoInScreens/food.png"},
        {"name":"Pizza nấm", "imageURL":"../assets/photoInScreens/food.png"},
        {"name":"Pizza cay", "imageURL":"../assets/photoInScreens/food.png"},
        {"name":"Pizza bò", "imageURL":"../assets/photoInScreens/food.png"},
        {"name":"Pizza gà", "imageURL":"../assets/photoInScreens/food.png"},
        {"name":"Pizza rau", "imageURL":"../assets/photoInScreens/food.png"},
      ]
    },
    {
      "category": "Burger",
      "items": [{"name":"Burger gà", "imageURL":"../assets/photoInScreens/food.png"},
       {"name":"Burger bò", "imageURL":"../assets/photoInScreens/food.png"},
        {"name":"Burger rau", "imageURL":"../assets/photoInScreens/food.png"},],
    },
    {
      "category": "Hotdog",
      "items": [{"name":"Hotdog truyền thống", "imageURL":"../assets/photoInScreens/food.png"},
       {"name":"Hotdog gà", "imageURL":"../assets/photoInScreens/food.png"},],
    },
    {
      "category": "Tea",
      "items": [{"name":"Trà đào", "imageURL":"../assets/photoInScreens/food.png"},
       {"name":"Trà chanh", "imageURL":"../assets/photoInScreens/food.png"},
        {"name":"Trà xanh", "imageURL":"../assets/photoInScreens/food.png"},]
    },
    {
      "category": "juice",
      "items": [{"name":"Nước cam", "imageURL":"../assets/photoInScreens/food.png"},
       {"name":"Nước dứa", "imageURL":"../assets/photoInScreens/food.png"},
      {"name":"Nước táo", "imageURL":"../assets/photoInScreens/food.png"},],
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState<string>('Pizza');
  const [isPressed, setIsPressed] = useState(false);
  const [iconStates, setIconStates] = useState({
    home: 'home',
    cart: 'cart-outline',
    invoice: 'document-text-outline',
    user:'user-o'
  });

  const handleCategoryPress = (category: string): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
    setSelectedCategory(category);
  };

  const handleIconPress = (iconName:string) => {
    setIconStates((prevState) => ({
      ...prevState,
      home: iconName === 'home' ? 'home' : 'home-outline',
      cart: iconName === 'cart' ? 'cart' : 'cart-outline',
      invoice: iconName === 'invoice' ? 'document-text' : 'document-text-outline',
      user: iconName === 'user' ? 'user' : 'user-o',
    }));
  };
  

    return(
      <View style={[stylesB.container, {}]}>
        <Text style={styles.textTitle}>Tìm các món ăn yêu thích nhất!</Text>
        <View style={styles.containerSearch}>
          <TextInput  style={[, styles.inputSearch]} placeholder="Tìm món ăn" autoCapitalize='none'/>
          <TouchableOpacity >
            <Icon style={styles.iconSearch} name="search" size={30}/>
          </TouchableOpacity>
        </View>
        <View style={styles.menus}>
          <ScrollView horizontal={true}  >
            {categoryDatas.map((categoryData) => (
              <TouchableOpacity
              key={categoryData.category} onPress={() => handleCategoryPress(categoryData.category)} 
              >
                <Text style={styles.category}>{categoryData.category}</Text>
                {selectedCategory === categoryData.category && (
                  <View style = {styles.selected}></View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
          
     
          <FlatList  numColumns={2} style={styles.containerItemFood}
            data={categoryDatas.find(item => item.category === selectedCategory)?.items || []}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.swapItemFood}>
                <Image source={require('../assets/photoInScreens/food.png')} style={{ width: 146, height: 146 }} />
                <Text style={styles.itemFood} >{item.name}</Text>
              </TouchableOpacity>
            )}
            
          />
          <View style={styles.buttonBar}>
            <TouchableOpacity onPress={() => handleIconPress('home')}>
             <IconCheck style={styles.iconButton} name={iconStates.home} size={50} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleIconPress('cart')}>
              <IconCheck style={styles.iconButton} name={iconStates.cart} size={50} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleIconPress('invoice')}>
              <IconCheck style={styles.iconButton} name={iconStates.invoice} size={50} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress('user')}>
              <Icon style={styles.iconButton} name={iconStates.user} size={50} color="white"/>
            </TouchableOpacity>

          </View>
            
        </View>
        
    )
}

const styles = StyleSheet.create({

  textTitle:{
    marginTop: '6%',
    fontSize:30,
    width:260,
    fontWeight:'700',
    textAlign:'center'
  },
  containerSearch:{
    marginTop:70,
    marginBottom:30,
    width:320,
    height: 44,
    flexDirection:'row',
    borderRadius:18,
    overflow: 'hidden'
  },
  inputSearch:{
    backgroundColor:'#E6E6E6',
    paddingLeft:30,
    fontSize:18,
    flex:1
  },

  iconSearch:{
    position:'absolute',
    right:0,
    height:40,
    width:40,
    paddingTop:6,
    paddingRight:12
  },
  menus:{
    width:'100%',
    
  },
  categoryBar:{
    flexDirection:'row',
  },
  category:{
    paddingRight:10,
    paddingLeft:10,
    fontSize:30,
    fontWeight:'500',
    height:50,
    width:120,
    textAlign:'center'
  },
  selected:{
    height:8,
    backgroundColor:'#F24822',
    borderRadius:5,
    bottom:0,
    position:'absolute',
    width:120,
  },
  containerItemFood:{
    backgroundColor:'#E6E6E6',
    borderRadius:40,
    marginLeft:10,
    marginRight:10,
    marginTop:18,
    marginBottom:18,
  },
  swapItemFood:{
    height:180,
    width:170,
    backgroundColor:'#fff',
    margin:12,
    borderRadius:30,
    alignItems:'center',
  },
  itemFood:{
    textAlign:'center',
    fontWeight:'500',
    fontSize:18
    
  },
  buttonBar:{
    width:'100%',
    height:70,
    backgroundColor:'#F24822',
    bottom:0,
    flexDirection:'row',
    borderTopWidth:1,
    borderColor:'#F24822',
  },
  iconButton:{
    marginRight:28,
    marginLeft:28,
    marginTop:6
  }
  
})

export default HomePage2
