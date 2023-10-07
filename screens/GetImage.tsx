import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { Props } from '../services/interfaces/navigationTypes';

const GetImage = ({ navigation }: Props) => {
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    // Gọi API để lấy dữ liệu hình ảnh
    axios.get('http://192.168.1.5:3000/food/get-image')
      .then(response => {
        console.log(response.data)
        setImageData(response.data.image);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Lấy ảnh</Text>
      {imageData ? <Image source={{ uri: `data:image/jpeg;base64,${imageData}` }} style={styles.image} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default GetImage;
