import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './src/components/screens/homeScreen'
import { Screen1 } from './src/components/screens/screen1';
import { TabNav } from './src/components/screens/tabNav';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { Maps } from './src/components/screens/maps';

const Stack = createNativeStackNavigator();

const App = () =>{
  return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TabNav" 
            component={TabNav} 
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Maps" 
            component={Maps} 
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Screen1" 
            component={Screen1} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )

};

export default App;