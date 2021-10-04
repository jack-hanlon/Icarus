import React from "react";
import { View, Text, Button, Image, TouchableOpacity, TextInput } from "react-native";
import { styles } from "../../themes/styleSheet"

import { useDispatch, useSelector } from "react-redux";
import { changeLon, changeLat, setParam, setTempRes, setEndDate, setStartDate } from "../../redux/actions/index";

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
                <Text style={styles.buttonText}>Resume</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        dispatch(changeLon(0))
                        dispatch(changeLat(0))
                        dispatch(setParam(null))
                        dispatch(setTempRes('daily'))
                        dispatch(setStartDate(null))
                        dispatch(setEndDate(null))
                        navigation.navigate('TabNav', { name: 'test Screen1' })
                        }}
                >
                <Text style={styles.buttonText}>Begin</Text>
            </TouchableOpacity>
           </View>
           </View>
        </View>
        </View>
    )
};

export { HomeScreen }
