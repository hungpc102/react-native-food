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
      }

})

export default stylesB