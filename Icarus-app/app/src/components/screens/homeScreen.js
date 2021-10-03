import React from "react";
import { View, Text, Button, Image, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../../themes/styleSheet"

import { useDispatch, useSelector } from "react-redux";
import { changeLon, changeLat, setParam } from "../../redux/actions/index";

const HomeScreen = ({navigation}) =>{

    const dispatch=useDispatch()
    
    return(
        <View style={styles.container}>
            
            <View style={styles.homeScreenImgcontainer}>
                <Image 
                    
                    source={require('../assets/icarus.jpg')} 

                    />
            </View>
            <View style={styles.homeScreenButtonBar}>
            <View>
            <View style={styles.rowContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate('TabNav', { name: 'test Screen1' })
                    }
                >
                <Text style={styles.buttonText}> sploosh</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        dispatch(changeLon(null))
                        dispatch(changeLat(null))
                        dispatch(setParam(null))
                        navigation.navigate('TabNav', { name: 'test Screen1' })
                        }}
                >
                <Text style={styles.buttonText}> sploosh new</Text>
            </TouchableOpacity>
           </View>
           </View>
        </View>
        </View>
    )
};

export { HomeScreen }