import React from "react";
import { View, Text, Button, Image, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../../themes/styleSheet"

const HomeScreen = ({navigation}) =>{
    return(
        <View style={styles.container}>
            
            <View style={styles.homeScreenImgcontainer}>
                <Image 
                    
                    source={require('../assets/icarus.jpg')} 

                    />
            </View>
            <View style={styles.homeScreenButtonBar}>
            <TouchableOpacity
                style={styles.uploadButton}
                onPress={() =>
                    navigation.navigate('TabNav', { name: 'test Screen1' })
                }
            >
            <Text style={styles.text}> sploosh</Text>
           </TouchableOpacity>
            </View>
        </View>
    )
};

export { HomeScreen }