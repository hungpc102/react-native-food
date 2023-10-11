import React, { useState } from 'react';
import { View, Image, Text, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Props } from '../services/interfaces/navigationTypes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesB from '../assets/css/stylesB';
import {createFood} from '../services/createFoodServices'

const Restaurant = ({ navigation }: Props) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [foodName, setFoodName] = useState('');
  const [foodInfo, setFoodInfo] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodQuantity, setFoodQuantity] = useState('');
  const [foodCategory, setFoodCategory] = useState('');

  async function pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
    }
  }

const handleCreateFood = () => {
  createFood(selectedImage, foodName, foodInfo, foodPrice, foodQuantity, foodCategory)
}

  // const createFood = async () => {
  //   try {
  //     const imageUri = selectedImage;
  //     const imageBase64 = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
      
  //     const formData = new FormData();
      
  //     formData.append('FOOD_PICTURE', imageBase64); 
  //     formData.append('FOOD_NAME', foodName);
  //     formData.append('FOOD_INFO', foodInfo);
  //     formData.append('FOOD_PRICE', foodPrice);
  //     formData.append('FOOD_QUANTITY', foodQuantity);
  //     formData.append('CATEGORY', foodCategory);

  //     const response = await axios.post(foodApiCreate, formData, {
  //       headers: {
  //         Accept:'application/json',
  //         'Content-Type': 'multipart/form-data', 
  //       },
  //     });
  //     alert('Món ăn đã được tạo')
  //   } catch (error) {
  //     console.log(error);
     
  //   }
  // }

  return (
    
    <View style={styles.container}>
      <View >
        {selectedImage && (
          <Image style={styles.imageFood}
            source={{ uri: selectedImage }}
            
          />
        )}
      </View>
      
          <TouchableOpacity style={[stylesB.containerButton,styles.containerButton ]} onPress={pickImage} >
            <Text style={[stylesB.actionButtonText, {fontSize:16, paddingTop:8}]} >Chọn ảnh từ thư viện</Text>
          </TouchableOpacity>
      <View style={styles.swapInput}>

          <TextInput style={styles.input}
            placeholder="Tên món ăn"
            onChangeText={(text) => setFoodName(text)}
            value={foodName}
          />
          <TextInput style={styles.input}
            placeholder="Thông tin món ăn"
            onChangeText={(text) => setFoodInfo(text)}
            value={foodInfo}
          />
          <TextInput style={styles.input}
            placeholder="Giá"
            onChangeText={(text) => setFoodPrice(text)}
            value={foodPrice}
          />
          <TextInput style={styles.input}
            placeholder="Số lượng"
            onChangeText={(text) => setFoodQuantity(text)}
            value={foodQuantity}
          />
          <TextInput style={styles.input}
            placeholder="Danh mục"
            onChangeText={(text) => setFoodCategory(text)}
            value={foodCategory}
          />
          
      </View>
          <TouchableOpacity style={[stylesB.containerButton,styles.containerButton, {width:300} ]} onPress={handleCreateFood} >
            <Text style={[stylesB.actionButtonText, {fontSize:16, paddingTop:8}]} >Thêm món ăn</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={[stylesB.containerButton,styles.containerButton , {width:300}]}  >
            <Text style={[stylesB.actionButtonText, {fontSize:16, paddingTop:8}]} >Cập nhập món ăn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[stylesB.containerButton,styles.containerButton , {width:300}]}  >
            <Text style={[stylesB.actionButtonText, {fontSize:16, paddingTop:8}]} >Xoá món ăn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[stylesB.containerButton,styles.containerButton, {width:300} ]}  >
            <Text style={[stylesB.actionButtonText, {fontSize:16, paddingTop:8}]} >Tìm món ăn</Text>
          </TouchableOpacity> */}

    </View>
  );

};
const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    flex:1,
    width:'100%',
    backgroundColor:'#fff'
  },
  imageFood:{
    width:210,
    height:210,
    borderWidth:4,
    borderColor:'#F24822',
    marginTop:'10%',
    marginBottom:20,
    borderRadius:20
  },
  containerButton:{
    height:40,
    alignContent:'center',
    justifyContent:'center',
    marginTop:0,
    borderRadius:14
  },
  swapInput:{
    marginTop:10,
    marginBottom:20
  },
  input:{
    borderWidth:1,
    margin:5,
    height:40,
    width:300,
    borderRadius:10,
    fontSize:18,
    paddingLeft:10
  },
  button: {
    width: 100
  }
})

export default Restaurant;
