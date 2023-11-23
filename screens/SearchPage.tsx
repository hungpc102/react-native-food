import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,TextInput,FlatList } from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {searchFood} from '../services/foodService/searchFood'

const SearchScreen = ({ navigation }: Props) => {

      const Separator = () => <View style={styles.separator} />;
      const [categoryDatas, setCategoryDatas] = useState<any[]>([])
      const [imageData, setImageData] = useState<any[]>([])
      const [searchText, setSearchText] = useState('')
      const inputRef = useRef<TextInput>(null);

      useEffect(() => {
       
        searchFood(searchText)
          .then((data) => {
            const foods: any[] = data.foods;
            setCategoryDatas(foods);
            const images = foods.map((food) => food.FOOD_PICTURE);
            setImageData(images);
          })
          .catch((error) => {
            // console.error('Lỗi khi lấy dữ liệu từ API:', error);
          });

      }, [searchText ]);
        
      const handleDetail = (foodId:number) => {
        navigation.navigate('FoodDetail', { foodId })
      }

    return(
        <View style={styles.container}>
            <View style={styles.swapSearch}>
                <View style={stylesB.containerSearch}>
                    <TextInput  style={ stylesB.inputSearch}   autoFocus={true} ref={inputRef}
                    onChangeText={(text) => setSearchText(text)}
                     placeholder="Tìm món ăn" autoCapitalize='none'/>
                    <TouchableOpacity onPress={() => inputRef.current?.blur()} >
                        <Icon style={stylesB.iconSearch} name="search" size={30}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listFood}>
                  <FlatList
                    data={categoryDatas}
                    keyExtractor={(item) => item.FOOD_ID.toString()} 
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => handleDetail(item.FOOD_ID)}>
                        <Image source={{ uri: `data:image/jpeg;base64,${item.FOOD_PICTURE}` }} style={styles.image} />
                        <Text style={styles.textName}>{item.FOOD_NAME}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={Separator}
                  />
            </View>
          
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        marginLeft:30,
        marginRight:30,
        flex:1,
        height: 3000
    },
    swapSearch:{
        width:'100%',
        alignItems:'center'
    },
    listFood:{
        paddingBottom:140
    },
    item:{
        width: '100%', 
        flexDirection:'row',
        alignItems: 'center',
        margin:5,
    },
    image:{
        width: 80,
        height: 80,
        borderRadius:20,
        margin: 6,
        marginRight:14,
        borderColor:'#CCCCCC',
        borderWidth:1
    },
    textName:{
        fontSize: 22,
        fontWeight:'500'
    },
    separator: {
        height: 1,
        backgroundColor: 'gray', 
      },
})

export default SearchScreen;