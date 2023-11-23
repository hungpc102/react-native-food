import { StyleSheet, Dimensions } from 'react-native';

  const {width, height} = Dimensions.get('window')

const stylesB = StyleSheet.create({
    textInput:{
        paddingLeft:10,
        borderBottomWidth:1,
        borderColor:"#ccc",
        fontSize: 22,
        marginBottom:28,
        width:320,
        fontWeight:'500',
      },
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems:"center",
        // justifyContent:'center',
    },
    containerButton:{
         width:width * 0.5,
         height:height * 0.066,
         borderRadius:30,
         backgroundColor:"#F24822",
         marginTop:10,
         marginBottom:10,
         alignItems: 'center',
         justifyContent:'center'
       }
       ,
    actionButtonText:{
        // flex:1,
        fontSize:24,
        // paddingTop:14,
        fontWeight:'600',
        color:"#fff"
    },
    textDirectional:{
        padding:0,
        fontSize:18,
        fontWeight:'800'
      },

      // Tìm kiếm css
      containerSearch:{
        marginTop:50,
        marginBottom:20,
        width:320,
        height: 44,
        flexDirection:'row',
        borderRadius:18,
        overflow: 'hidden',
      },
      inputSearch:{
        backgroundColor:'#E6E6E6',
        paddingLeft:30,
        fontSize:18,
        flex:1,
        paddingRight:50
      },
    
      iconSearch:{
        position:'absolute',
        right:0,
        height:40,
        width:40,
        paddingTop:6,
        paddingRight:12
      },

})

export default stylesB