import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from './components/HomeScreen';
import { styles } from './StyleSheet';
import store from './redux/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}

