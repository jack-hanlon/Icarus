import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { 
  Text, 
  View, 
  SafeAreaView,
  TextInput, 
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
      } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
      } from "react-native-chart-kit";
import { styles, chartConfig } from './StyleSheet.js';
import axios from 'axios';
import RadioGroup from 'react-native-radio-buttons-group';
// import { Provider ,Appbar,RadioButton} from 'react-native-paper';



const window = Dimensions.get('window');
// const lat = 43.7068;
// const lon = -79.3985;
// const test_url1 = 'https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M&community=RE&longitude=-75.7097&latitude=45.3928&start=20210101&end=20210131&format=JSON'
// const test_url2 = 'https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M&community=RE&longitude=-123.1706&latitude=49.3199&start=20210101&end=20210131&format=JSON'
// const test_url3 ='https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M&community=RE&longitude=-123.4343&latitude=48.4239&start=20210101&end=20210331&format=JSON'
const format_url = (param, lon, lat) => `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=${param}&community=RE&longitude=${lon}&latitude=${lat}&start=20210101&end=20210730&format=JSON`;
// const url = format_url(param, lon, lat)

const radioButtonsData = [
  {
    id: 'T2M',
    label: (
      <Text style={{color: '#A8F7FF'}}>{'Temp'}</Text>
    ),
    color:'#A8F7FF',
    selected:false,
  },
  {
    id:'ALLSKY_SFC_SW_DWN',
    label:(
      <Text style={{color: '#A8F7FF'}}>{'Flux'}</Text>
    ),
    color:'#A8F7FF',
    selected:false,
  }
]

const App = () => {

  const testLabel = [1, 2, 3, 4, 5, 6]
  const testData = [20, 45, 28, 80, 99, 43]

  const artificialData= {
    labels: testLabel,
    datasets: [
      {
        data: testData,
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Random Data"] // optional
  };
  
  const [lat, setlat] = useState();
  const [lon, setlon] = useState()
  const [lattmp, setlattmp] = useState()
  const [lontmp, setlontmp] = useState()

  const [label, setLabel] = useState(testLabel)
  const [data, setData] = useState(testData)
  const [islaoding, setLoading] = useState(true)
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [parameterName, setParameter] = useState()

  const apiDataPlot= {
    labels: label,
    datasets: [
      {
        data: data,
        strokeWidth: 2 // optional
      }
    ],
    //legend: ["Random Data"] // optional
  };
  const updateData = (response) => {
    // Takes the response of the api call, extracts, splits
    // then updates data states for plotting
    
    if(parameterName == 'T2M'){
      const T2M = response.data.properties.parameter.T2M
      console.log(T2M)
      const dates = Object.keys(T2M)
      const temps = Object.keys(T2M)
      setLabel(dates), setData(temps)
    }
   else if (parameterName == 'ALLSKY_SFC_SW_DWN') {
    const Flux = response.data.properties.parameter.ALLSKY_SFC_SW_DWN
    console.log(Flux)
    const dates = Object.keys(Flux)
    const flux = Object.keys(Flux)
    setLabel(dates), setData(flux)
   } 

   else {
     return;
   }
  };
  
  const apiCall = () => {
    const data_url = format_url(parameterName, lon, lat)
    console.log(parameterName, lon, lat)
    axios.get(data_url)
      .then(response => {
        //console.log(response)
        updateData(response);
    }, error => {
      console.log(error)
    });
  }

  const setValues = () => {
    setlon(lontmp), setlat(lattmp);
  }

  const resetValues = () => {
    setlon(''), setlat('')
  }

  const onPressRadioButton = radioButtonsArray => {
    //console.log(radioButtonsArray);
    setRadioButtons(radioButtonsArray);
    for (const x of radioButtons) {
      if(x.selected==true){
        setParameter(x.id)
      }
    }
    console.log(parameterName)
  };

  return (
    <SafeAreaView style={styles.container}>
{/* // App split into 2 section
//    - top bar: with lat and lon input 
      - a main section with a graph*/}

      <View style={styles.imageContainertop}>
        <Image 
          source={require("./Godlogo.jpg")} 
          style={styles.image}
        />
      </View>

      <View style={styles.topBar}>
      
        <Text style={styles.textBox}>Lat</Text>
        <TextInput 
          style={styles.inputBox}
          keyboardType="numeric"
          placeholder='e.g: 43.00'
          placeholderTextColor="#9ED0D5"
          onChangeText={(latVal) => setlattmp(latVal)}
           />
        <Text style={styles.textBox}>Lon</Text>
        <TextInput 
          style={styles.inputBox}
          keyboardType="numeric"
          placeholder='e.g: 43.00'
          placeholderTextColor="#9ED0D5"
          onChangeText={(lonVal) => setlontmp(lonVal)}
           />
        <TouchableOpacity
          style={styles.button}
          onPress={setValues}
          >
          <Text style ={styles.texButton}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.textOutputBar}>
        <Text style={styles.textBox}>
          Input Lat: {lat}       Input Lon: {lon}
        </Text> 
      </View> */}
      {/* <View style={styles.radioButtonRow}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
          layout="row"
        />
      </View> */}
      <View style={styles.textOutputBar}>
       
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            layout="row"
          />
        <View style={styles.textOutputBarParams}>
          <Text style={styles.textBox}>
            Lat: {lat}    Lon: {lon}    Parameter: {parameterName}
          </Text>
        </View>
      </View>
      <View style={styles.Body}>
      <TouchableOpacity
          style={styles.fetchbutton}
          onPress={apiCall}
        >
          <Text style={styles.texButton}>Fetch</Text>
        </TouchableOpacity>

{/* add .finally(()=>{setLoading(false)}); promise to axios.get to get
loading wheel while graph loads then display graph when laoding finished 
also need to play with states to clear graph between loading diff datasets
and have laoding wheel appear only when a fetch request is made*/}

        {/* {islaoding ? (
          <ActivityIndicator animating={true} color={'#A8F7FF'}/>) : 
          <Text style={styles.textBox}>not loading data</Text>} */}

        <LineChart
          data={apiDataPlot}
          width={window.width}
          height={220}
          withDots={false}
          withHorizontalLines={false}
          withVerticalLines={false}
          yAxisInterval={1200}
          chartConfig={chartConfig}
          bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
              }}
        />
      </View> 
        
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}



export default App;