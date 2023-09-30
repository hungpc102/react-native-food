import { StyleSheet } from 'react-native';
const stylesB = StyleSheet.create({
    textInput:{
        borderBottomWidth:1,
        borderColor:"#E6E6E6",
        fontSize: 24,
        marginBottom:28,
        width:320,
        fontWeight:'500'
      },
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems:"center",
        // justifyContent:'center',
    },
    containerButton:{
        width:170,
         height:70,
         borderRadius:30,
         backgroundColor:"#F24822",
         marginTop:10,
         marginBottom:10,
         alignItems: 'center',
       }
       ,
    actionButtonText:{
        flex:1,
        fontSize:30,
        textAlign:'center',
        paddingTop:12,
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
        marginTop:70,
        marginBottom:30,
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
        flex:1
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