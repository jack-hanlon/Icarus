import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {


  return (

    <View style={styles.container}>
      <Text>Hello Test!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
const getArticlesFromApi = async () => {
    let response = await fetch(
      'https://examples.com/data.json'
    );
    let json = await response.json();
    return json.movies;
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
