import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';

const FoodDelivery = ({navigation}: Props) =>{
    return(
        <View>
            <Text>Giao hàng</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default FoodDelivery;