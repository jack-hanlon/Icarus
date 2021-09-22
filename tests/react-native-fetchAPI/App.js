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
      } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
      } from "react-native-chart-kit";
import { styles, chartConfig } from './StyleSheet.js'
import axios from 'axios'




const lat = 43.7068;
const lon = -79.3985;
const test_url = 'https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M&community=RE&longitude=-79.7966&latitude=43.7018&start=20210101&end=20210115&format=JSON'
formated_url = (lon, lat) => `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,T2MDEW,T2MWET,TS,T2M_RANGE,T2M_MAX,T2M_MIN&community=RE&longitude=${lon}&latitude=${lat}&start=20150101&end=20150305&format=JSON`;
const url = formated_url(lon, lat)

/*
### USE FUNCTIONAL COMPONENTS W/ HOOKS DO NOT USE CLASS BASED COMPONENTS ###
  - easier code (no this.state everywhere) and more elegant!!!
TOD
------------------------------------------------
- continue working on fetching data from API
- inspect output of useEffect hook
    * see what the returned JSON looks like
    * figure out how to extract the data from JSON
    * load extracted data into state
    * dates will be loaded into 'Labels', data into 'data' so can be ploted
- Make interactive:
    * maybe add an interactive component to select data date range
    * make plots interactive with onDataPointClick prop
*/

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
    const T2M = response.data.properties.parameter.T2M
    const dates = Object.keys(T2M)
    const temps = Object.values(T2M)
    setLabel(dates), setData(temps)
  }

  const apiCall = () => {
    axios.get(test_url)
      .then(response => {
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

      <View style={styles.textOutputBar}>
        <Text style={styles.textBox}>
          Input Lat: {lat}       Input Lon: {lon}
        </Text> 
      </View>

      <View style={styles.Body}>
      <TouchableOpacity
          style={styles.fetchbutton}
          onPress={apiCall}
        >
          <Text style={styles.texButton}>Fetch Data</Text>
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
          width={220}
          height={220}
          chartConfig={chartConfig}
        />
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}



export default App;