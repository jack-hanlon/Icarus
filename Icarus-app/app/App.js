import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './src/components/screens/homeScreen'
import { Screen1 } from './src/components/screens/screen1';
import { TabNav } from './src/components/screens/tabNav';
import { Maps } from './src/components/screens/maps';

import { store, persistor } from './src/redux/store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'


const Stack = createNativeStackNavigator();

const App = () =>{
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
              //options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Maps" 
              component={Maps} 
              //options={{ headerShown: false }}
            />
          
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )

};

export default App;