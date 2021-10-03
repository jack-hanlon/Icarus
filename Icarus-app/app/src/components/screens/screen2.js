import React from "react";
import {SafeAreaView,Button,TouchableOpacity,Text,View,ImageBackground, StyleSheet,Image} from 'react-native'
import { styles } from "../../themes/styleSheet";

const Screen2 = () =>{
    return(
      <View style={styles.screenContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ICARUS</Text>
          <Image style={styles.logo} source={require('../assets/icarus.jpg')}/>
          <Text>Solar Panel Efficiency</Text>
        </View>

        <View style={styles.bodyContainer}>

        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.pvText}>Calculated PV Panel Efficiency:</Text>
      <View style={styles.recommendations}><Text style={styles.buttonText}>Typical Range: </Text></View>
      </View>

    )
};

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     position: 'absolute',
//     left: 150,
//   },
//   logoContainer: {
//     position: 'absolute',
//     top: 70,
//     alignItems: 'center',
//   },
//   logoText: {
//     fontWeight: 'bold',
//     fontSize: 40,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
//   button: {
//     alignItems: "center",
//     backgroundColor: "dodgerblue",
//     height: 50,
//     width: 150,
//     padding: 10,
//   },
//   buttonText: {
//     fontSize: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: "#FFF"
//   },
//   recommendations: {
//     backgroundColor: "dodgerblue",
//     width: '80%',
//     height: '50%',
//     bottom: 50,
//   },
//   pvText: {
//     fontSize: 25,
//     bottom:100,
//   }


// });

export { Screen2 }
