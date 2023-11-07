import React, { useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, LayoutAnimation, Pressable } from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getAllFoods} from '../services/foodService/getAllFood'

const HomePage2 = ({ navigation }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryDatas, setCategoryDatas] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([])
  const [imageData, setImageData] = useState<any[]>([])

  useEffect(() => {
    getAllFoods()
      .then((data) => {
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

  const handleDetail = (foodId:number) => {
    navigation.navigate('FoodDetail', { foodId })
  }

  const handleSearch = () => {
    navigation.navigate('SearchScreen');
    
  }

  const scrollViewRef = useRef(null);
  const selectedRef = useRef(null);

  // Sử dụng useEffect để tự động cuộn đến vị trí mục đã chọn khi selectedCategory thay đổi
  useEffect(() => {
    if (scrollViewRef.current && selectedCategory) {
      // Tìm index của selectedCategory trong mảng categories
      const index = categories.indexOf(selectedCategory);

      if (index !== -1) {
        // Tính toán vị trí ngang để cuộn đến
        const offsetX = index * 68; // Thay ITEM_WIDTH bằng độ rộng của mỗi mục

        // Sử dụng scrollTo để cuộn đến vị trí đã tính toán
        (scrollViewRef.current as ScrollView).scrollTo({ x: offsetX, animated: true });
      }
    }
  }, [selectedCategory]);

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
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={scrollViewRef}>
          {categories.map((category) => (
            <Pressable
              key={category}
              onPress={() => handleCategoryPress(category)}
            >

              <Text style={styles.category}>{category}</Text>
            </Pressable>
          ))}

<View
        ref={selectedRef}
        style={[
          styles.selected,
          {
            left: selectedCategory
              ? categories.indexOf(selectedCategory) * 136
              : 0,
          },
        ]}
      />
      </ScrollView>

      </View>
      <FlatList
        numColumns={2}
        style={styles.containerItemFood}
        data={categoryDatas.filter((item) => item.CATEGORY === selectedCategory)}
        keyExtractor={(item) => item.FOOD_ID.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.swapItemFood} onPress={() => handleDetail(item.FOOD_ID)}>
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
    width: 136,
    textAlign: 'center'
  },
  selected: {
    height: 5,
    backgroundColor: '#F24822',
    borderRadius: 5,
    bottom: 0,
    position: 'absolute',
    width: 136,
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
