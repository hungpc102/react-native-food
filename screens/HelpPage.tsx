import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import stylesB from '../assets/css/stylesB'
import { Props } from '../services/interfaces/navigationTypes';



const HelpPage = ({navigation}: Props) =>{
    return(
        <View style={stylesB.container}>
            <Text style={styles.titleText}>Trung tâm hỗ trợ</Text>
            <View style={styles.listMenus}>
                <View style={styles.menu1}>
                    <Text style={styles.textMenu}>Trang chủ</Text>
                    <Text style={styles.textMenu}>Gới thiệu</Text>
                </View>
                <View style={styles.menu2}>
                    <Text style={styles.textMenu}>Đơn hàng của bạn</Text>
                    <Text style={styles.textMenu}>Tài khoản</Text>
                    <Text style={styles.textMenu}>Theo dõi đơn hàng</Text>
                    <Text style={styles.textMenu}>Giỏ hàng của bạn</Text>
                    <Text style={styles.textMenu}>Tìm kiếm</Text>
                    <Text style={styles.textMenu}>FAQ</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={{fontSize:20, color:'#fff'}}>2023 NOT SO FOOD</Text>
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    titleText:{
        fontSize:32,
        marginTop:'15%',
        fontWeight: '600'
    },
    listMenus:{
        flexDirection: 'row',
        marginVertical: 30,
        marginTop:160,
    },
    menu1:{
        marginRight:70
    },
    menu2:{
        
    },
    textMenu:{
        fontSize:18
    },
    footer:{
        bottom:0,
        position:'absolute',
        width:'100%',
        borderRadius:0,
        backgroundColor:'#F24822',
        height:90,
        alignItems:'center',
        justifyContent: 'center'
    }
})

export default HelpPage;




