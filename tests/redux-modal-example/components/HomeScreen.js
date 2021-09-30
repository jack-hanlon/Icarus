import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, } from "react-native";
import { connect, useSelector, useDispatch } from "react-redux";
import { styles } from '../StyleSheet'

import store from '../redux/store/index'
import { changeLat, changeLon} from '../redux/actions/index'

import Modal from "react-native-modal";
import {ScrollPicker} from 'react-native-value-picker';

const paramData = [
    {
      value: 'temp',
      label:'Temperature',
    },
    {
      value: 'flux',
      label:'Flux',
    },
    {
      value: 'humidity',
      label:'Humidity',
    },
    {
      value:'wind speed',
      label:'wind speed',
    },
    {
      value:'wind direction',
      label:'wind direction',
    }
  ]

const HomeScreen = () => {
    const lat = useSelector(state=>state.coords.lat)
    const lon = useSelector(state=>state.coords.lon)
    const param = useSelector(state=>state.params.current)
    
    const [paramModal, setParamModal] = useState(false)
    const [latModal, setLatModal] = useState(false)
    const [lonModal, setLonModal] = useState(false)
    const [pickedValue, setPickedValue] = useState(1);

    const dispatch = useDispatch()

    const toggleParamModal = () => setParamModal(()=>!paramModal);
    const toggleLatModal = () => setLatModal(()=>!latModal)
    const toggleLonModal = () => setLonModal(()=>!lonModal)


    return (
        <View style={styles.container}>
            <View style={styles.inputBar}>
                <Text style={styles.text}>Lat: </Text>
                <Text style={styles.text}>{lat}</Text>
                <TouchableOpacity style={styles.button} onPress={toggleLatModal}>
                    <Text style={styles.text}>set lat</Text>
                </TouchableOpacity>
                <Modal isVisible={latModal}>
                    <View style={styles.modelContainer}>
                        <View style={styles.inputBar}>
                            <Text style={styles.text}>Enter lat Value: </Text>
                        </View>
                        <View style={styles.inputBar}>
                            <TextInput
                                style={styles.inputBox}
                                onChangeText={(val)=>dispatch(changeLat(val))}
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.inputBar}>
                            <TouchableOpacity style={styles.button} onPress={toggleLatModal}>
                                <Text style={styles.text}>go back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

            <View style={styles.inputBar}>
                <Text style={styles.text}>Lon: </Text>
                
                <Text style={styles.text}>{lon}</Text>
                <TouchableOpacity style={styles.button} onPress={toggleLonModal}>
                    <Text style={styles.text}>set lat</Text>
                </TouchableOpacity>
                <Modal isVisible={lonModal}>
                    <View style={styles.modelContainer}>
                        <View style={styles.inputBar}>
                            <Text style={styles.text}>Enter lon Value: </Text>
                        </View>
                        <View style={styles.inputBar}>
                            <TextInput
                                style={styles.inputBox}
                                onChangeText={(val)=>dispatch(changeLon(val))}
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.inputBar}>
                            <TouchableOpacity style={styles.button} onPress={toggleLonModal}>
                                <Text style={styles.text}>go back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.inputBar}>
                <Text style={styles.text}>Param: </Text>
                <Text style={styles.text}>{pickedValue}</Text>
                <TouchableOpacity style={styles.button} onPress={toggleParamModal}>
                    <Text style={styles.text}>set param</Text>
                </TouchableOpacity>
                <Modal isVisible={paramModal}>
                    <View style={styles.modelContainer}>
                        <ScrollPicker 
                            currentValue={pickedValue}
                            extraData={pickedValue}
                            list={paramData}
                            onItemPress={setPickedValue}
                            labelColor="blue"
                            separatorColor="purple"
                            selectedColor="red"
                        />
                        <TouchableOpacity style={styles.button} onPress={toggleParamModal}>
                            <Text style={styles.text}>Go back</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

            </View>
            
                        {/* <ScrollPicker 
                            currentValue={pickedValue}
                            extraData={pickedValue}
                            list={paramData}
                            onItemPress={setPickedValue}
                            labelColor="blue"
                            separatorColor="purple"
                            selectedColor="red"
                        />
                        <TouchableOpacity
                            style={styles.buton}
                            onPress={toggleParamModal}
                        >
                            <Text style={styles.text}>go back</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Text style={styles.text}>{pickedValue}</Text>
            </View>  */}
        </View>
    )
};

export { HomeScreen };
