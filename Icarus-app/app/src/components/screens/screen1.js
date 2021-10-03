import React, {useState, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, Button } from "react-native";
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

import * as Location from 'expo-location';

const format_url = (temp_res,param, lon, lat) => `https://power.larc.nasa.gov/api/temporal/${temp_res}/point?parameters=${param}&community=RE&longitude=${lon}&latitude=${lat}&start=20210101&end=20210730&format=JSON`;


const dummyRawData = 
{
  "20210101": -0.65,"20210102": 0.16,"20210103": -0.98,"20210104": -0.17,
  "20210105": -0.41,"20210106": -0.94,"20210107": -2.08,"20210108": -4.16,
  "20210109": -1.83,"20210110": -1.87,"20210111": -0.43,"20210112": -1.13,
  "20210113": 0.27,"20210114": 1.85,"20210115": 1.75,"20210116": 0.48,
  "20210117": 0.67,"20210118": -1.07,"20210119": -1.1,"20210120": -4.37,
  "20210121": -0.32,"20210122": -1.59,"20210123": -6.02,"20210124": -5.99,
  "20210125": -3.67,"20210126": -2.56,"20210127": -4.12,"20210128": -7.61,
  
};


const dummyData = dataFormater(dummyRawData).data


const Screen1 = ({navigation}) =>{

    const dispatch = useDispatch();
    const lat = useSelector(state=>state.coords.lat);
    const lon = useSelector(state=>state.coords.lon);
    const param = useSelector(state=>state.param.param);
    const startDate = useSelector(state=>state.dates.startDate)
    const endDate = useSelector(state=>state.dates.endDate)
    const tempRes = useSelector(state=>state.tempRes.temp_res)

    const [modalVisible, setModalVisible] =  useState(false);
    const [getLocation, setGetLocation] = useState(false);

    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date(1598051730000));
    //const [mode, setMode] = useState('date');
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    const [checked, setChecked] = useState('daily');

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    
     useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
        }, [getLocation]);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const handleGetLoc = () =>{
        setGetLocation(()=>!getLocation)
        dispatch(changeLat(location.coords.latitude))
        dispatch(changeLon(location.coords.longitude))
        //console.log(location.coords.latitude, location.coords.longitude)   
    };

    const handleModal = () => setModalVisible(()=>!modalVisible)
    const handleStart = () => setShowStart(()=>!showStart)
    const handleEnd = () => setShowEnd(()=>!showEnd)

    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowStart(Platform.OS === 'ios');
        setStartDate(currentDate);
      };
    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowEnd(Platform.OS === 'ios');
        setEndDate(currentDate);
      };
          

    return(

        <View style={styles.container}>
            <View style={styles.rowContainer}>
            <TouchableOpacity 
                style={styles.button}
                onPress={handleModal}
            >
                <Text style={styles.buttonText}>Chose things</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                //onPress={()=>console.log('nothing')}
                onPress={() =>
                    navigation.navigate('Maps', { name: 'test Maps' })
                }
            >
                <Text style={styles.buttonText}>Locate on map</Text>
            </TouchableOpacity>
            </View>
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
                    {/* </View>
                    <View style={styles.rowContainer}> */}
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleGetLoc}
                        >
                            <Text style={styles.buttonText}>Locate me</Text>
                        </TouchableOpacity>
                        
            
                    </View>
                    <View style={styles.modalSection}>
                        <Text style={styles.text2}>Choose Parameter</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <ModalSelector 
                            style={styles.modalPicker}
                            touchableStyle={{borderColor:'#000',borderWidth:1}}
                            selectTextStyle={{color:'#000'}}
                            data={pickerData}
                            initValue="Click to select param"
                            onChange={(val)=>dispatch(setParam(val.key))}
                        />
                    
                    </View>       
                    <View style={styles.modalSection}>
                        <Text style={styles.text2}>Pick date range:</Text>
                    </View> 
                    <View style={styles.rowContainer}>
                    
                    <TouchableOpacity style={styles.modalButton} onPress={handleStart}>
                        <Text style={styles.buttonText}>start date</Text>
                    </TouchableOpacity>
                    {showStart && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={startDate}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeStart}
                        />
                    )}
                    <TouchableOpacity style={styles.modalButton} onPress={handleEnd}>
                        <Text style={styles.buttonText}>end date</Text>
                    </TouchableOpacity>
                    {showEnd && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={endDate}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeEnd}
                        />
                    )}
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
                </View>
        
                    <TouchableOpacity style={styles.button} onPress={handleModal}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                
                 
                    
                
            </Modal>
            <Text style={styles.text2}>Things you have chosen:</Text>
            <Text style={styles.text2}>Lat = {lat}   Lon = {lon}   Param = {param}</Text>
    
            {/* <MapView
                style={{ alignSelf: 'stretch', flex:0.75}}
                region={mapRegion}
                //onRegionChange={handleRegionChange}

            >
                <Marker draggable
                    coordinate={markerCoord} />
            </MapView>
             */}
            <Chart 
                width={Metrics.screenWidth * 0.8}
                height={Metrics.screenHeight * 0.3}
                scale={{x: "time", y: "linear"}}
                >
                
                <VictoryAxis fixLabelOverlap={true} />
                <Line data={dummyData} x="date" y="data"/>   
            </Chart>
            
        </View> 
    )
};

export { Screen1 }