import React from "react";
import { View, Text, Button } from "react-native";
import { styles } from "../../themes/styleSheet"

const HomeScreen = ({navigation}) =>{
    return(
        <View style={styles.screenContainer}>
            <Text style={styles.text}>HOME SCREEN</Text>
            <Button 
                title="go to screen1"
                onPress={() =>
                    navigation.navigate('TabNav', { name: 'test Screen1' })
                }
            />
        </View>
    )
};

export { HomeScreen }