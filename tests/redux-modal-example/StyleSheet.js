import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#000000',
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        color: '#63EFFE',
        marginHorizontal:10,
        marginTop:5,
        marginBottom:5,
        textAlign:'center'
    },
    inputBox: {
        color: '#63EFFE',
        borderColor:'#63EFFE',
        borderWidth: 1,
        padding: 10,
        width: 85,
        height: 35,
        margin: 1,
    },
    inputBar: {
        flex:0.1,
        flexDirection:'row',
    },
    button: {
        margin:1,
        padding:1,
        borderWidth:1,
        borderColor:'#63EFFE',
        marginHorizontal:10,
        height: 40, 
      },
    modelContainer: {
        flex: 0.5,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    modelOptionsBar: {
        flex: 0.5,
        flexDirection:'row'
    },
    PickerContainer: {
        height: 180,
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
      },
      modalbutton: {
        margin:1,
        padding:1,
        borderWidth:1,
        borderColor:'#63EFFE',
        marginHorizontal:10,
        height: 40, 
        position:'absolute',
        top:200,
      },
})

export { styles };