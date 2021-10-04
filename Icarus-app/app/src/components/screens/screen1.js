import React, {useState, useEffect} from "react";
import {Image, View, Text, TextInput, TouchableOpacity, Button } from "react-native";
import axios from "axios";
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

import convertDate from "../../utils/dateTimeToInt";
import dataFormater from "../../utils/ApiDataFormater";
import pickerData from "../assets/modalPickerData";

import * as Location from 'expo-location';

import { store } from "../../redux/store";

const format_url = (temp_res, param, lon, lat, start, end) => `https://power.larc.nasa.gov/api/temporal/${temp_res}/point?parameters=${param}&community=RE&longitude=${lon}&latitude=${lat}&start=${start}&end=${end}&format=JSON`;


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

// Get states from redux store
    const dispatch = useDispatch();
    const lat = useSelector(state=>state.coords.lat);
    const lon = useSelector(state=>state.coords.lon);
    const param = useSelector(state=>state.param.param);
    const startDate = useSelector(state=>state.dates.startDate)
    const endDate = useSelector(state=>state.dates.endDate)
    const tempRes = useSelector(state=>state.tempRes.temp_res)
    
// store data from fetch request
    const [data, setData] = useState()

// Modal view boolean
    const [modalVisible, setModalVisible] =  useState(false);

// Geolocation boolean
    const [getLocation, setGetLocation] = useState(false);

    const [startTmp, setStartTmp] = useState(new Date(1598051730000));
    const [endTmp, setEndTmp] = useState(new Date(1598051730000));
// Boolean state of modal calender
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

// boolean state of radio buttons
    const [checked, setChecked] = useState('daily');

// Geoloaction states
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

// Handles GeoLocation
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
    useEffect(()=>{
        dispatch(setTempRes(checked))
    },[checked])
// Handle response from Geolocation req
    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

// Update state with Geolocation output
    const handleGetLoc = () =>{
        setGetLocation(()=>!getLocation)
        dispatch(changeLat(location.coords.latitude))
        dispatch(changeLon(location.coords.longitude))
        //console.log(location.coords.latitude, location.coords.longitude)
    };

// Handle Modal views
    const handleModal = () => setModalVisible(()=>!modalVisible)
    const handleStart = () => setShowStart(()=>!showStart)
    const handleEnd = () => setShowEnd(()=>!showEnd)

// Handle Calendar  dates
    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowStart(Platform.OS === 'ios');
        const goodDate = convertDate(currentDate, tempRes)
        dispatch(setStartDate(goodDate))
        
      };
    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowEnd(Platform.OS === 'ios');
        const goodDate = convertDate(currentDate,tempRes )
        dispatch(setEndDate(goodDate))
      };

    //   console.log(store.getState())
// Fetch form POWER API

// const updateData = (response) => {
//     // Takes the response of the api call, extracts, splits
//     // then updates data states for plotting
    
//     if(parameterName == 'T2M'){
//       const T2M = response.data.properties.parameter.T2M
//       console.log(T2M)
//       const dates = Object.keys(T2M)
//       const temps = Object.keys(T2M)
//       setLabel(dates), setData(temps)
//     }
//    else if (parameterName == 'ALLSKY_SFC_SW_DWN') {
//     const Flux = response.data.properties.parameter.ALLSKY_SFC_SW_DWN
//     console.log(Flux)
//     const dates = Object.keys(Flux)
//     const flux = Object.keys(Flux)
//     setLabel(dates), setData(flux)
//    } 

//    else {
//      return;
//    }
//   };
  
const apiCall = () => {
    const data_url = format_url(tempRes, param, lon, lat, startDate, endDate)
    console.log(data_url)
    // axios.get(data_url)
    //   .then(response => {
    //     //console.log(response)
    //     updateData(response);
    // }, error => {
    //   console.log(error)
    // });
  }

//   const apiCallAsync = async () => {
//     const data_url = format_url(tempRes, param, lon, lat, startDate, endDate)
//     try {
//         const resp = await axios.get(data_url);
//         console.log(resp.data);
//     } catch (err) {
//         // Handle Error Here
//         console.error(err);
//     }
// }

//  // Handle Submit button
  const handleSubmit = () =>{
        apiCall
  }


    return(

        <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ICARUS</Text>
          <Image style={styles.logo} source={require('../assets/icarus.jpg')}/>
          <Text>Data Access Viewer</Text>
        </View>
            <View style={styles.rowContainer}>

            <TouchableOpacity
                style={styles.button}
                onPress={handleModal}
            >
                <Text style={styles.buttonText}>Manual Selection</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                //onPress={()=>console.log('nothing')}
                onPress={() =>
                    navigation.navigate('Maps', { name: 'test Maps' })
                }
            >
                <Text style={styles.buttonText}>Use Google Map</Text>
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
                        value={startTmp}
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
                        value={endTmp}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeEnd}
                        />
                    )}
                    </View>
                </View>

                    <TouchableOpacity style={styles.button} onPress={handleModal}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>




            </Modal>
            <Text style={styles.text2}>Parameters selected:</Text>
            <Text style={styles.text2}>Lat = {lat}   Lon = {lon}   Param = {param}</Text>
            <TouchableOpacity style={styles.button} onPress={apiCall}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
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
