import React, {useState, useEffect} from "react";
import {Image, View, Text, TextInput, TouchableOpacity,  Alert } from "react-native";
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
    VictoryZoomContainer,
    VictoryBrushContainer,
    createContainer,
    VictoryAxis,
    VictoryVoronoi,
    VictoryVoronoiContainer,
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
    const [data, setData] = useState(dummyData)

// layer graph containers and set domain
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
    const [zoomDomain, setZoomDomain] = useState(
        {x:[new Date("2020-02-10"),new Date("2020-02-19")]})
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
    const handleGraph = () => setShowGraph(()=>!showGraph)
    const handleZoomDomain = (domain) =>{
        setZoomDomain(domain)
      }

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

const updateData = (response) => {
    // Takes the response of the api call, extracts, splits
    // then updates data states for plotting

    if(param== 'T2M'){
      const T2M = response.data.properties.parameter.T2M
      console.log(store.getState())
      const dataFormated =dataFormater(T2M).data
    //   const zoomDomainBounds = findZoomWindow()
    //   const window = [{x:[zoomDomainBounds[0].date, zoomDomainBounds[1].date],
    //                    }]
    //   setZoomDomain(window)
      setData(dataFormated)
    }

   else if (param == 'ALLSKY_SFC_SW_DWN') {
    const Flux = response.data.properties.parameter.ALLSKY_SFC_SW_DWN
    const dataFormated =dataFormater(Flux).data
      //console.log(dataFormated)
    setData(dataFormated)
    //setLabel(dates), setData(flux)
   }
   else if(param== 'CLOUD_AMT'){
    const Cloud = response.data.properties.parameter.CLOUD_AMT
            //console.log(T2M)
    const dataFormated =dataFormater(Cloud).data
    setData(dataFormated)
    }



   else {
     return;
   }
  };

useEffect(()=>{

})
    const apiCall = () => {
        const data_url = format_url(tempRes, param, lon, lat, startDate, endDate)
        //console.log(data_url)
        if(param==='CLOUD_AMT' && tempRes ==='daily'){
            Alert.alert(
                "Probelm",
                `Cloud amount data only exists for monthly temporal resolution. Please Retry`,
                [
                  {
                    text: "Cancel",
                    //onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", //onPress: () => console.log("OK Pressed")
                }
                ]
              );
            return
        }
        if(endDate < startDate){
            Alert.alert(
                "Probelm",
                `end date is smaller than start date. Please Retry`,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            return
        }
        axios.get(data_url)
        .then(response => {
            //console.log(response)
            updateData(response);
        }, error => {
        console.log(error)
        });
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

  const findZoomWindow = () =>{
      const length = data.length
      const halfIdx = Math.floor(length/2)
      const rangeWidth = Math.floor(length*0.1)
      const x_low = data[halfIdx]
      const x_high = data[halfIdx+rangeWidth]
      return [x_low, x_high]
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
                        <Text style={styles.text}>Enter coordinates</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.text}>Lat: </Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(val)=>dispatch(changeLat(val))}
                            keyboardType='numeric'
                            placeholder={lat.toString()}
                            />
                        <Text style={styles.text}>Lon: </Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(val)=>dispatch(changeLon(val))}
                            keyboardType='numeric'
                            placeholder={lon.toString()}
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
                        <Text style={styles.text}>Choose Parameter</Text>
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
                        <Text style={styles.text}>Temporal resolution</Text>
                    </View>
                    <View style={styles.rowContainer}>
                    <Text style={styles.text}>Daily</Text>
                    <RadioButton
                            value="daily"
                            status={ checked === 'daily' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('daily')}
                        />
                        <Text style={styles.text}>Monthly</Text>
                        <RadioButton
                            value="monthly"
                            status={ checked === 'monthly' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('monthly')}
                        />
                    </View>
                    <View style={styles.modalSection}>
                        <Text style={styles.text}>Pick date range:</Text>
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
            <View>
            <Text style={styles.text2}>Parameters selected:</Text>
            <Text style={styles.text2}>Lat = {lat}   Lon = {lon}   Param = {param}</Text>
            <Text style={styles.text2}>Start date: {startDate}   end date: {endDate}</Text>
            <TouchableOpacity style={styles.button} onPress={apiCall}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            </View>
            <Chart
                width={Metrics.screenWidth * 0.9}
                height={Metrics.screenHeight * 0.2}
                scale={{x: "time", y: "linear"}}
                containerComponent={
                    <VictoryVoronoiContainer
                    labels={({ datum }) => `${datum.date.getDate()},${datum.date.getMonth()},${datum.date.getFullYear()}, ${datum.data}`}
                    />
                }
                >
                {/* <VictoryAxis dependentAxis/> */}
                <VictoryAxis fixLabelOverlap={true} />
                <Line data={data} x="date" y="data"/>
            </Chart>
            {/* <ScrollView>
            <View>
            <Chart
                width={Metrics.screenWidth * 0.8}
                height={Metrics.screenHeight * 0.5}
                scale={{x: "time", y: "linear"}}
                containerComponent={
                    <VictoryZoomVoronoiContainer
                        labels={({ datum }) => `${datum.date}, ${datum.data}`}
                        zoomDimension="x"
                        zoomDomain={zoomDomain}
                        onZoomDomainChange={handleZoomDomain}
                        />
                    }
                >
                <VictoryAxis fixLabelOverlap={true} />
                <Line data={data} x="date" y="data"/>
            </Chart>
            <Chart
                width={Metrics.screenWidth * 0.8}
                height={Metrics.screenHeight * 0.1}

                padding={{ top: 10, left: 20, right: 50, bottom: 30 }}
                scale={{x: "time", y: "linear"}}
                containerComponent={
                    <VictoryBrushContainer
                        brushDimension="x"
                        brushDomain={zoomDomain}
                        onBrushDomainChange={handleZoomDomain}
                    />
                }
                >
                <VictoryAxis fixLabelOverlap={true} />
                <Line data={data} x="date" y="data"/>
            </Chart>

            </View>
            </ScrollView> */}

        </View>
    )
};

export { Screen1 }
