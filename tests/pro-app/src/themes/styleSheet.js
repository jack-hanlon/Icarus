import { StyleSheet } from 'react-native'
import colors from './colors'
import Metrics from './metrics';

// change all height, width, and positions to be
// multiples of Metrics.screenHeight/screenWidth
// for eg: height : Metrics.screenHeight*(10/365)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',

    },
    imageHeaderContainer: {
        position: "absolute",
        top: 10,
        flex:1,
    },
    imageHeader: {
        width: Metrics.screenWidth,
        height: 150,
    },
    topBar: {
        flex: 1,
        position: 'absolute',
        top: 175,
        flexDirection: 'row',
    },
    textInput: {
        color: colors.textPrimary,
        borderColor: colors.borderColor,
        borderWidth: 1,
        padding: 10,
        width: 85,
        height: 35,
        margin: 1
    },
    textOutputBar:{
        flex: 1,
        top:225,
        position: "absolute",
        flexDirection: 'row',
    },
    submitButton: {
        margin: 1,
        padding: 1,
        borderWidth:1,
        borderColor: colors.borderColor,
        borderWidth:1,
        marginHorizontal:10,
    },  
    textBox: {
        color: colors.textPrimary,
        marginHorizontal:10,
        marginTop:10
    },
    buttonText: {
        color: colors.textPrimary,
        marginHorizontal:10,
        marginTop:5,
        marginBottom:5,
        textAlign:'center'
    },
    latloninContainer: {
        flex:0.4,
        margin: 1,
        alignItems: 'center',
    },
    chartRow: {
        flex: 0.1,
        
      },
    body: {
        flex: 0.5,
    }

})

const chartConfig={
    backgroundColor: '#0089FF',
    backgroundGradientFrom: '#373A3A',
    backgroundGradientTo: '#323535',
    decimalPlaces: 2, 
    color: (opacity = 255) => `rgba(168, 247, 255, ${opacity})`,
    style: {
      borderRadius: 1,
      marginTop:1
    },
  }

export { styles, chartConfig };