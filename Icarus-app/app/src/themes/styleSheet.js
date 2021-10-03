import { StyleSheet } from 'react-native'
import Metrics from './metrics'
import colors from './colors'
import { fontSize } from './fonts'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    screenContainer:{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    text:{
        color:colors.textPrimary,
        margin:10,
        fontSize: fontSize.font20
    },
    text2:{
        color:colors.textPrimary,
        marginLeft:5,
        marginRight:3,
        marginTop:13,
        marginBottom:1,
    },
    textInput:{
        borderColor:'#000',
        borderWidth:1,
        width:Metrics.screenWidth*0.15,
        height: Metrics.screenHeight*0.05,
        margin:1,
        marginTop:10,
        marginRight:5,
        justifyContent:'center',
        alignItems:'center',
    },
    logo: {
        width: 50,
        height: 50,
        position: 'absolute',
        left: 165,
    },
    logoContainer: {
        position: 'absolute',
        top: 70,
        alignItems: 'center',
    },
    logoText: {
        fontWeight: 'bold',
        fontSize: fontSize.font40,
    },
    bodyContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    uploadButton: {
        alignItems: "center",
        backgroundColor: "dodgerblue",
        height: 50,
        width: 120,
        padding: 10,
    },
    uploadButtonText: {
        fontSize: 25,
        alignItems: 'center',
        justifyContent: 'center',
        color: "#FFF"
    },
    recommendations: {
        backgroundColor: "dodgerblue",
        width: '80%',
        height: '50%',
        bottom: 50,
    },
    pvText: {
        fontSize: 25,
        bottom:100,
    },
    homeScreenImgcontainer:{
        flex:0.8,
        alignContent:'center',
        justifyContent:'center',
    },
    homeScreenImage:{
        flex:1,
        position:'absolute',
        top:100,
        // height:Metrics.screenHeight*0.6,
        // width:Metrics.screenWidth*0.8,
    },
    homeScreenButtonBar: {
        flex:0.2,
        flexDirection:'row',
    },
    homeScreenButton: {
        marginHorizontal:10,
        borderColor:'#000',
        color:'#000'
    },
    modalContainer:{
        flex:0.9,
        backgroundColor:'#9dcdfa',
        alignItems:'center',
        justifyContent:'center',
    },
    button:{
        alignItems: "center",
        backgroundColor: "#9dcdfa",
        borderWidth:2,
        borderColor:"#000",
        borderRadius:20,
        padding: 10,
        margin:5,
    },
    rowContainer:{
        flexDirection:'row',
    },
    modalPicker:{
        borderColor:'#000',
        color:'#000',
        marginTop:15,
        marginBottom:15,
        borderRadius:20,
    },
    buttonText:{
        margin:1,
        color:colors.textPrimary,
        padding:4,
    },
    modalSection:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        margin:10,
        width:Metrics.screenWidth*0.8,
        alignItems:'center',
    },
    modalButton:{
        alignItems: "center",
        backgroundColor: "#9dcdfa",
        borderWidth:2,
        borderColor:"#000",
        borderRadius:20,
        
        margin:5,
    }
})


export { styles };
