import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screen1 } from './screen1';
import { Screen2 } from './screen2';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();
const TabNav = () =>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="Viewer" component={Screen1} options={{ headerShown: false, tabBarIcon: ({color,size}) => (<MaterialCommunityIcons name="chart-line" color={color} size={size}/> ), }} />
            <Tab.Screen name="Efficiency" component={Screen2} options={{ headerShown: false, tabBarIcon: ({color,size}) => (<MaterialCommunityIcons name="white-balance-sunny" color={color} size={size}/> ), }} />
        </Tab.Navigator>
    )
}
export { TabNav}
