import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../../themes/styleSheet"
import Metrics from "../../themes/metrics";
import { changeLat } from '../../redux/actions/index'
import { useSelector, useDispatch } from "react-redux";

import {
    VictoryChart as Chart,
    VictoryLine as Line,
    VictoryZoomContainer as ZoomContainer,
    VictoryBrushContainer as BrushContainer,
    createContainer,
    VictoryAxis,
    VictoryArea,
    } from 'victory-native'

import dataFormater from "../../utils/ApiDataFormater";


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


const Screen1 = () =>{
    const dispatch = useDispatch()
    const lat = useSelector(state=>state.coords.lat)

    return(

        <View style={styles.container}>
            <Text style={styles.text}>Lat val {lat}</Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={(val)=>dispatch(changeLat(val))}
                keyboardType='numeric'

                />
            <View>
            <Chart 
                width={Metrics.screenWidth * 0.8}
                height={Metrics.screenHeight * 0.3}
                scale={{x: "time", y: "linear"}}
                >
                
                <VictoryAxis fixLabelOverlap={true} />
                <Line data={dummyData} x="date" y="data"/>   
            </Chart>
            </View>
        </View> 
    )
};

export { Screen1 }