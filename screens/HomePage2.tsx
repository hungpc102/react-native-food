import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, ScrollView, LayoutAnimation } from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { foodApiGetAll } from '../connect_API/FoodAPI';

const HomePage2 = ({ navigation }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [categoryDatas, setCategoryDatas] = useState<any[]>([]);

  useEffect(() => {
    axios.get(foodApiGetAll)
      .then((response) => {
        const data: any[] = response.data; // Định kiểu dữ liệu của data
        const categories = [...new Set(data.map((item) => item.CATEGORY))];
        setSelectedCategory(categories[0]);
        setCategoryDatas(data);
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
        {[...new Set(categoryDatas.map((categoryData) => categoryData.CATEGORY))].map((category) => (
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
            <Image source={{ uri: item.FOOD_PICTURE }} style={{ width: 146, height: 136 }} />
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
    width: 100,
    textAlign: 'center'
  },
  selected: {
    height: 8,
    backgroundColor: '#F24822',
    borderRadius: 5,
    bottom: 0,
    position: 'absolute',
    width: 100,
  },
  containerItemFood: {
    backgroundColor: '#E6E6E6',
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 18,
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
    fontSize: 18
  },
})

export default HomePage2;
