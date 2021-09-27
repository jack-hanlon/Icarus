import React, {useState} from "react"
import {View, Image } from "react-native"
import { styles } from "../../themes/styleSheet"
import { LatLonIn } from "../organisms/LatLonInput"
import { PlotBody } from "../organisms/plotSection"

const MainPage = () => {

    const testLabel = [1, 2, 3, 4, 5, 6]
    const testData = [20, 45, 28, 80, 99, 43]

    const dummyData= {
        labels: testLabel,
        datasets: [
        {
            data: testData,
            strokeWidth: 2 // optional
        }
        ],
        
    };

    const [lat, setlat] = useState();
    const [lon, setlon] = useState()
    const [lattmp, setlattmp] = useState()
    const [lontmp, setlontmp] = useState()

    const setValues = () => {
        setlon(lontmp), setlat(lattmp)
    }

    const dataProp = {
        data: dummyData,
    }

    const textLabels = {
        label3: lat,
        label4: lon,
    };

    const onChange = {

        latChange: (tmpLatVal)=>setlattmp(tmpLatVal),
        lonChange: (tmpLonVal)=>setlontmp(tmpLonVal),
        submitBTN: setValues,
    };
  
    return (
    <View style={styles.container}>
        <View style={styles.imageHeaderContainer}>
            <Image
                source={require("../../assets/images/Godlogo.jpg")}
                style={styles.imageHeader}
            />
        </View>
        
        <View >
            <LatLonIn 
                onChange={onChange}
                label={textLabels}
                />
        </View>

        <View>
            <PlotBody dataProp={dummyData}/>
        </View>
    </View>
    )
}

export { MainPage }