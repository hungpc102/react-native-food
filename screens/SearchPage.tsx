import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,TextInput,FlatList } from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';
import Icon from 'react-native-vector-icons/FontAwesome';



const SearchScreen = ({ navigation }: Props) => {
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
      const allFoodItemNames = categoryDatas.flatMap(category => category.items.map(item => item.name));

      const Separator = () => <View style={styles.separator} />;

    return(
        <View style={styles.container}>
            <View style={styles.swapSearch}>
                <View style={stylesB.containerSearch}>
                    <TextInput  style={ stylesB.inputSearch} placeholder="Tìm món ăn" autoCapitalize='none'/>
                    <TouchableOpacity >
                        <Icon style={stylesB.iconSearch} name="search" size={30}/>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={allFoodItemNames}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                <TouchableOpacity style={styles.item}>
                    <Image source={require('../assets/photoInScreens/food.png')} style={{ width: 90, height: 90 }} />
                    <Text  style={styles.textName}>{item}</Text>
                </TouchableOpacity>
                )}
                ItemSeparatorComponent={Separator}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        marginLeft:30,
        marginRight:30
    },
    swapSearch:{
        width:'100%',
        alignItems:'center'
    },
    item:{
        width: '100%', 
        flexDirection:'row',
        alignItems: 'center',
        margin:5
    },
    textName:{
        fontSize: 24,
        fontWeight:'500'
    },
    separator: {
        height: 1,
        backgroundColor: 'gray', // Màu của dòng kẻ ngang
      },
})

export default SearchScreen;