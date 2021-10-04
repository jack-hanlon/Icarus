import React, {useState, useEffect} from "react";
import {StyleSheet,ImageBackground,Image, View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import { styles } from "../../themes/styleSheet"
import Metrics from "../../themes/metrics";
import { changeLat, changeLon, setStartDate, setEndDate, setTempRes, setParam } from '../../redux/actions/index'
import { useSelector, useDispatch } from "react-redux";
import ModalSelector from 'react-native-modal-selector'
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker'
import { RadioButton } from 'react-native-paper';
import {
    VictoryChart as Chart,
    VictoryLine as Line,
    VictoryZoomContainer as ZoomContainer,
    VictoryBrushContainer as BrushContainer,
    createContainer,
    VictoryAxis,
    } from 'victory-native'

import dataFormater from "../../utils/ApiDataFormater";
import pickerData from "../assets/modalPickerData";
import brandData from "../assets/brandData";

import * as Location from 'expo-location';


const Screen2 = () =>{

    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false)
    const toggleModal = () => setModalVisible(()=>!modalVisible)

    const [checked, setChecked] = useState('daily');
    
    return(
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ICARUS</Text>
          <Image style={styles.logo} source={require('../assets/icarus.jpg')}/>
          <Text>Solar Panel Efficiency</Text>
        </View>

        <View style={styles.bodyContainer}>

        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text style={styles.buttonText}>Upload Data</Text>
        </TouchableOpacity>
        <Modal isVisible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalSection}>
                <Text style={styles.text2}>Enter coordinates</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.text2}>Lat: </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(val)=>dispatch(changeLat(val))}
                    keyboardType='numeric'
                    />
                <Text style={styles.text2}>Lon: </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(val)=>dispatch(changeLon(val))}
                    keyboardType='numeric'
                    />


            </View>
            <View style={styles.modalSection}>
                <Text style={styles.text2}>Select Brand</Text>
            </View>
            <View style={styles.rowContainer}>
                <ModalSelector
                    style={styles.modalPicker}
                    touchableStyle={{borderColor:'#000',borderWidth:1}}
                    selectTextStyle={{color:'#000'}}
                    data={brandData}
                    initValue="Solar Panel Brand"
                    onChange={(val)=>dispatch(setParam(val.key))}
                />

            </View>
            <View style={styles.modalSection}>
            <Text style={styles.text2}>Net Panel Surface Area</Text>
            </View>
              <View style={styles.rowContainer}>
            </View>
            <View style={styles.modalSection}>
                <Text style={styles.text2}>Temporal resolution</Text>
            </View>
            <View style={styles.rowContainer}>
            <Text style={styles.text2}>Daily</Text>
            <RadioButton
                    value="daily"
                    status={ checked === 'daily' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('daily')}
                />
                <Text style={styles.text2}>Monthly</Text>
                <RadioButton
                    value="monthly"
                    status={ checked === 'monthly' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('monthly')}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <Text style={styles.pvText}>Calculated PV Panel Efficiency:</Text>
      <View style={styles.recommendations}><Text style={styles.buttonText}>Typical Range: </Text></View>
      </View>

    )
};


export { Screen2 }
