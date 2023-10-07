import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, ScrollView, LayoutAnimation } from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { foodApiGetAll } from '../connect_API/FoodAPI';

const HomePage2 = ({ navigation }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryDatas, setCategoryDatas] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([])
  const [imageData, setImageData] = useState<any[]>([])

  useEffect(() => {
    axios.get(foodApiGetAll)
      .then((response) => {
        const data: any = response.data; // Lấy toàn bộ đối tượng dữ liệu
        const foods: any[] = data.foods; // Lấy danh sách món ăn từ đối tượng dữ liệu
        const categories = [...new Set(foods.map((item) => item.CATEGORY))];
        setSelectedCategory(categories[0]);
        setCategoryDatas(foods);
        setCategories(categories)
        const imageData = foods.map((food) => food.FOOD_PICTURE);
        setImageData(imageData);

      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }, []);

  const handleCategoryPress = (category: string): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedCategory(category);
  };

  const handleDetail = () => {
    navigation.navigate('FoodDetail');
  }

  const handleSearch = () => {
    navigation.navigate('SearchScreen');
  }

  return (
    <View style={[stylesB.container, {}]}>
      <Text style={styles.textTitle}>Tìm các món ăn bạn yêu thích nhất!</Text>
      <TouchableOpacity onPress={handleSearch}>
        <View style={stylesB.containerSearch}>
          <Text style={[stylesB.inputSearch, styles.textSearch]}> Tìm món ăn</Text>
          <Icon style={stylesB.iconSearch} name="search" size={30} />
        </View>
      </TouchableOpacity>
      <View style={styles.menus}>
      <ScrollView horizontal={true}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => handleCategoryPress(category)}
            >

              <Text style={styles.category}>{category}</Text>
            {selectedCategory === category && (
              <View style={styles.selected}></View>
            )}
            </TouchableOpacity>
          ))}
      </ScrollView>

      </View>
      <FlatList
        numColumns={2}
        style={styles.containerItemFood}
        data={categoryDatas.filter((item) => item.CATEGORY === selectedCategory)}
        keyExtractor={(item) => item.FOOD_ID.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.swapItemFood} onPress={handleDetail}>
            {item.FOOD_PICTURE ? (
              <Image source={{ uri: `data:image/jpeg;base64,${item.FOOD_PICTURE}` }} style={styles.image} />
            ) : null}
            <Text style={styles.itemFood}>{item.FOOD_NAME}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    marginTop: '16%',
    fontSize: 26,
    width: 260,
    fontWeight: '700',
    textAlign: 'center'
  },
  textSearch: {
    paddingTop: 10,
    color: '#686868'
  },
  menus: {
    width: '100%',
  },
  categoryBar: {
    flexDirection: 'row',
  },
  category: {
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 24,
    fontWeight: '500',
    height: 50,
    width: 130,
    textAlign: 'center'
  },
  selected: {
    height: 8,
    backgroundColor: '#F24822',
    borderRadius: 5,
    bottom: 0,
    position: 'absolute',
    width: 130,
  },
  containerItemFood: {
    backgroundColor: '#E6E6E6',
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 18,
    marginBottom:10
  },
  swapItemFood: {
    height: 170,
    width: 170,
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  itemFood: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
  },
  image:{
    marginTop:4,
    width:160,
    height:136,
    borderRadius:30
  }
})

export default HomePage2;
