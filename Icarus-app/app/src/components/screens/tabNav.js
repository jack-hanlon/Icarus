import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screen1 } from './screen1';
import { Screen2 } from './screen2';

const Tab = createBottomTabNavigator();
const TabNav = () =>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="Viewer" component={Screen1} options={{ headerShown: false }} />
            <Tab.Screen name="Efficiency" component={Screen2} options={{ headerShown: false }}/>
        </Tab.Navigator>
    )
}
export { TabNav}
