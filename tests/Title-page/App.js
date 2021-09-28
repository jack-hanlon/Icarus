import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions,StyleSheet, Text, TouchableNativeFeedback, View, Image, Alert, SafeAreaView, Button,Platform} from 'react-native';
import WelcomeScreen from "./app/screens/WelcomeScreen";

export default function App() {

  return <WelcomeScreen /> ;
}
