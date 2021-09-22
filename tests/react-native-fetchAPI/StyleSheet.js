import { StyleSheet, Dimensions } from 'react-native'

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000",
      alignItems: "center",
      justifyContent: "center",
    },
    imageContainertop: {
        position: "absolute",
        top: 10,
        flex: 1,
    },
    image: {
        width: window.width,
        height: 150,
    },

    topBar: {
      flex: 1,
      top:175,
      flexDirection: "row",
      position: "absolute"
    },

    textBox: {
      color: '#ffffffff',
      marginHorizontal:10,
      marginTop:10
    },

    inputBox: {
      color: "#ffffffff",
      borderColor: '#A8F7FF',
      borderWidth: 1,
      padding:10,
      width:85,
      height:35,
      margin:1
    },
    textOutputBar:{
      flex: 1,
      top:225,
      position: "absolute"
    },
    Body: {
      flex:1,
      top:300,
    },
    button: {
      margin:1,
      padding:1,
      borderWidth:1,
      borderColor:'#A8F7FF',
      marginHorizontal:10
    },
    texButton: {
      color: '#A8F7FF',
      marginHorizontal:10,
      marginTop:5,
      marginBottom:5,
      textAlign:'center'
    },
    chartRow: {
      flex: 1,
      width: '100%',
      height: '100%',
    },

    fetchbutton: {
      margin:1,
      padding:1,
      borderWidth:1,
      borderColor:'#A8F7FF',
      marginVertical: 10,
      marginBottom:20,

    }
  });
  
  const chartConfig={
    backgroundColor: '#0089FF',
    backgroundGradientFrom: '#373A3A',
    backgroundGradientTo: '#323535',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 255) => `rgba(168, 247, 255, ${opacity})`,
    style: {
      borderRadius: 16,
      marginTop:40
    },
  }

  export { styles, chartConfig }