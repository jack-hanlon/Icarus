import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions,StyleSheet, Text, TouchableNativeFeedback, View, Image, Alert, SafeAreaView, Button,Platform} from 'react-native';


export default function App() {

  return (
    <View style = {{
      backgroundColor: "#fff",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center", //main axis
      alignItems: "center", //secondary axis
      alignContent: "center",
      flexWrap: "wrap",
    }}>
    <View style={{
      backgroundColor: "dodgerblue",
      //flexBasis: 100,// width or height
      //flexShrink: 1,
      width: 100,
      height: 100,
      //alignSelf: 'flex-start',
    }}/>
    <View style={{
      backgroundColor: "gold",
      width: 100,
      height: 100,
    }}/>
    <View style={{
      backgroundColor: "tomato",
      width: 100,
      height: 100,

    }}/>
    </View>
  );
}

const containerStyle = { backgroundColor: "orange"}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
});
