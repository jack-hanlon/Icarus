import React from "react";
import { View, Text } from "react-native";
import { styles } from "../../themes/styleSheet"

const Screen1 = () =>{
    return(
        <View style={styles.screenContainer}>
            <Text style={styles.text}>Screen1</Text>
        </View>
    )
};

export { Screen1 }