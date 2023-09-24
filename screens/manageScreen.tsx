import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';

const ManagerScreen = ({ navigation }: Props) => {
  const [nameFood, setNameFood] = useState('');
  const [imageFood, setImageFood] = useState('');
  const [priceFood, setPriceFood] = useState('');
  const [descriptionFood, setDescriptionFood] = useState('');

  const handleSave = () => {
    // Ở đây, bạn có thể thực hiện lưu các giá trị vào một đối tượng hoặc thực hiện các thao tác khác
    const foodData = {
      name: nameFood,
      image: imageFood,
      price: priceFood,
      description: descriptionFood,
    }
}

//     // Tiếp theo, bạn có thể chuyển đối tượng foodData đến màn hình khác bằng navigation
//     navigation.navigate('NextScreen', { foodData });
//   };

  return (
    <View style={stylesB.container}>
        <View >
            <Text>Thêm món ăn</Text>
            <TextInput value={nameFood} style={ styles.textInput} placeholder="Tên món ăn" autoCapitalize="none"
                onChangeText={(text) => setNameFood(text)}
            />
            <TextInput value={nameFood} style={ styles.textInput} placeholder="Ảnh món ăn" autoCapitalize="none"
                onChangeText={(text) => setImageFood(text)}
            />
            <TextInput value={nameFood} style={ styles.textInput} placeholder="Mô tả món ăn" autoCapitalize="none"
                onChangeText={(text) => setPriceFood(text)}
            />
            <TextInput value={nameFood} style={ styles.textInput} placeholder="Số lượng món ăn" autoCapitalize="none"
                onChangeText={(text) => setDescriptionFood(text)}
            />
            
            <TouchableOpacity onPress={handleSave}>
                <Text>Thêm</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text>Cập nhập món ăn</Text>
            <TextInput value={nameFood} style={ styles.textInput} placeholder="ID món ăn" autoCapitalize="none"
            onChangeText={(text) => setNameFood(text)}
            />

            <TextInput value={nameFood} style={ styles.textInput} placeholder="Tên món ăn" autoCapitalize="none"
            onChangeText={(text) => setNameFood(text)}
            />
            <TextInput value={nameFood} style={ styles.textInput} placeholder="Ảnh món ăn" autoCapitalize="none"
                onChangeText={(text) => setNameFood(text)}
            />
            <TextInput value={nameFood} style={ styles.textInput} placeholder="Mô tả món ăn" autoCapitalize="none"
                onChangeText={(text) => setNameFood(text)}
            />
            <TextInput value={nameFood} style={ styles.textInput} placeholder="Giá món ăn" autoCapitalize="none"
                onChangeText={(text) => setNameFood(text)}
            />
            <TextInput value={nameFood} style={ styles.textInput} placeholder="Số lượng món ăn" autoCapitalize="none"
                onChangeText={(text) => setNameFood(text)}
            />
            
            <TouchableOpacity >
                <Text>Cập nhập</Text>
            </TouchableOpacity>
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
    textInput:{
        borderWidth:1,
        height:50,
        fontSize:16,
        width:300,
        margin:10
    }
});

export default ManagerScreen;
