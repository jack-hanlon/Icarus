import React from "react";
import { View, Text } from "react-native";
import { styles } from "../../themes/styleSheet"

const Screen2 = () =>{
    return(
        <View style={styles.screenContainer}>
            <Text style={styles.text}>Screen2</Text>
        </View>
    )
};

export { Screen2 }