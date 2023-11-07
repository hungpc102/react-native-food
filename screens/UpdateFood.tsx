import React, { useState , useEffect} from 'react';
import { View, Image, Text, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { Props } from '../services/interfaces/navigationTypes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesB from '../assets/css/stylesB';
import { pickImage } from '../Components/SelectedImage';
import { getFoodById } from '../services/foodService/getFoodById';
import { useRoute, RouteProp } from '@react-navigation/native';
import { updateFood } from '../services/foodService/updateFood';

type ParamList = {
  FoodDetail: { foodId: string }; 
}

const UpdateFood = ({ navigation }: Props) => {
  const [imageDataBase64, setImageDataBase64] = useState('');
  const [foodName, setFoodName] = useState('');
  const [foodInfo, setFoodInfo] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodQuantity, setFoodQuantity] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const route = useRoute<RouteProp<ParamList, 'FoodDetail'>>(); 
  const foodId = route.params.foodId;
  const foodIdNUmber=  parseInt(foodId, 10)


  const handleSelectedImage = async () => {
    await pickImage(setImageDataBase64)

  }
  
  useEffect(() => {
    getFoodById(foodIdNUmber)
      .then((data) => {
        const foodData: any = data.food; 
        const imageData =  foodData.FOOD_PICTURE; 
        setImageDataBase64(imageData);
        setFoodName(foodData.FOOD_NAME)
        setFoodInfo(foodData.FOOD_INFO)
        setFoodPrice(foodData.FOOD_PRICE.toString())
        setFoodQuantity(foodData.FOOD_QUANTITY.toString())
        setFoodCategory(foodData.CATEGORY)
      })
      .catch((error) => {
        alert('ID món ăn không tồn tại')
        // console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }, []);


  const handleUpdateFood = () => {
    updateFood(foodId, imageDataBase64, foodName, foodInfo, foodPrice, foodQuantity, foodCategory )
  }

  return (
    
         <KeyboardAvoidingView behavior='padding' style={[styles.container, {backgroundColor:'#eee'}]}>
      
      <View style={styles.swapImage}>
        {imageDataBase64 && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${imageDataBase64}` }}
            style={styles.imageFood}
          />
        )}
      </View>
      
          <TouchableOpacity style={[stylesB.containerButton,styles.containerButton ]} onPress={handleSelectedImage} >
            <Text style={[stylesB.actionButtonText, {fontSize:16, paddingTop:8}]} >Chọn ảnh từ thư viện</Text>
          </TouchableOpacity>
      <View style={styles.swapInput}>

          <TextInput style={[styles.input,{backgroundColor: '#fff', marginBottom:12}]}
            placeholder="Tên món ăn"
            onChangeText={(text) => setFoodName(text)}
            value={foodName}
          />
          <TextInput style={[styles.input,{backgroundColor: '#fff', marginBottom:12}]}
            placeholder="Thông tin món ăn"
            onChangeText={(text) => setFoodInfo(text)}
            value={foodInfo}
          />
          <TextInput style={[styles.input,{backgroundColor: '#fff', marginBottom:12}]}
            placeholder="Giá"
            onChangeText={(text) => setFoodPrice(text)}
            value={foodPrice}
          />
          <TextInput style={[styles.input,{backgroundColor: '#fff', marginBottom:12}]}
            placeholder="Số lượng"
            onChangeText={(text) => setFoodQuantity(text)}
            value={foodQuantity}
          />
          <TextInput style={[styles.input,{backgroundColor: '#fff', marginBottom:12}]}
            placeholder="Danh mục"
            onChangeText={(text) => setFoodCategory(text)}
            value={foodCategory}
          />
          
      </View>
        <TouchableOpacity style={[stylesB.containerButton,styles.containerButton, {width:340, height:50} ]} onPress={handleUpdateFood} >
        <Text style={[stylesB.actionButtonText, {fontSize:18, paddingTop:14}]} >Cập nhập món ăn</Text>
        </TouchableOpacity>

    </KeyboardAvoidingView>

   
  );

};
const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    width:'100%',
    backgroundColor:'#fff'
  },
  swapImage:{
    width:210,
    height:210,
    borderColor:'#999',
    borderWidth:4,
    borderRadius:20,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor:'#fff'
  },
  imageFood:{
    width:210,
    height:210,
    marginBottom:20,
  },
  containerButton:{
    height:40,
    alignContent:'center',
    justifyContent:'center',
    marginTop:0,
    borderRadius:10
  },
  swapInput:{
    marginTop:10,
    marginBottom:20
  },
  input:{
    borderWidth:1,
    margin:5,
    height:50,
    width:340,
    borderRadius:10,
    fontSize:18,
    paddingLeft:10,
    backgroundColor: '#fff', 
    marginBottom:12
  },
  button: {
    width: 100
  }
})

export default UpdateFood;
