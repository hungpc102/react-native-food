import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,FlatList, TextInput, ScrollView, LayoutAnimation} from 'react-native';
import stylesB from '../assets/css/stylesB'
import {  Props } from '../services/interfaces/navigationTypes';
import Icon from 'react-native-vector-icons/FontAwesome';



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
 

  const handleCategoryPress = (category: string): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
    setSelectedCategory(category);
  };

  const handleDetail = () =>{
    navigation.navigate('FoodDetail')
  }

  const handlSearch = () =>{
    navigation.navigate('SearchScreen')
  }


    return(
      <View style={[stylesB.container, {}]}>
        <Text style={styles.textTitle}>Tìm các món ăn bạn yêu thích nhất!</Text>
          <TouchableOpacity onPress={handlSearch}>
            <View style={stylesB.containerSearch}>
                <Text  style={ [stylesB.inputSearch, styles.textSearch]}> Tìm món ăn</Text>
                <Icon style={stylesB.iconSearch} name="search" size={30}/>
            </View>
          </TouchableOpacity>
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
              <TouchableOpacity style={styles.swapItemFood} onPress={handleDetail}>
                <Image source={require('../assets/photoInScreens/food.png')} style={{ width: 146, height: 136 }} />
                <Text style={styles.itemFood} >{item.name}</Text>
              </TouchableOpacity>
            )}
            
          />
            
        </View>
        
    )
}

const styles = StyleSheet.create({

  textTitle:{
    marginTop: '16%',
    fontSize:26,
    width:260,
    fontWeight:'700',
    textAlign:'center'
  },
  textSearch:{
    paddingTop:10,
    color:'#686868'
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
    fontSize:24,
    fontWeight:'500',
    height:50,
    width:100,
    textAlign:'center'
  },
  selected:{
    height:8,
    backgroundColor:'#F24822',
    borderRadius:5,
    bottom:0,
    position:'absolute',
    width:100,
  },
  containerItemFood:{
    backgroundColor:'#E6E6E6',
    borderRadius:30,
    marginLeft:10,
    marginRight:10,
    marginTop:18,
  },
  swapItemFood:{
    height:170,
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
  
})

export default HomePage2
