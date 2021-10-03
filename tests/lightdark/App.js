import React, {useState} from 'react';
import {Switch, Alert,Button,Text, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
export default function AppContainer() {
  return (
    <AppearanceProvider>
      <App />
    </AppearanceProvider>
  );
}

function App() {
  const [colorScheme,setColorScheme] = useState('light');
  const toggleSwitch = () => setColorScheme(previousState => !previousState);


  const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <StatusBar barStyle={themeStatusBarStyle} />
      <Text style={[styles.text, themeTextStyle]}>Color scheme: {colorScheme}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={colorScheme ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={colorScheme}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#FFF',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  lightThemeText: {
    color: '#000',
  },
  darkThemeText: {
    color: '#FFF',
  },
  button: {
    height: 100,
    width: 100,
  }
});
