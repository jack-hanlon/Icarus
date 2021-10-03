import React, {useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../../themes/styleSheet";

import { useDispatch, useSelector } from "react-redux";
import { changeLat, changeLon } from '../../redux/actions/index'

import MapView, {Marker} from "react-native-maps";


const Maps = ({navigation}) =>{
    const dispatch = useDispatch();
    const lat = useSelector(state=>state.coords.lat);
    const lon = useSelector(state=>state.coords.lon);

    const [mapRegion, setmapRegion] = useState({
        latitude: 48.4626,
        longitude: -123.3105,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    const [markerCoord, setMarkerCoord] = useState({
        latitude: 48.4626,
        longitude: -123.3105,
    });

    const handleSubmit = () =>{
        dispatch(changeLat(markerCoord.latitude))
        dispatch(changeLon(markerCoord.longitude))
    }
    return(
        <View style={styles.container}>
            <MapView
                style={{alignSelf:'stretch', flex:0.9}}
                initialRegion={mapRegion}
                onRegionChange={(region)=>setmapRegion}
            >
                <Marker draggable
                    coordinate={markerCoord} 
                    onDragEnd={(val)=>setMarkerCoord(val.nativeEvent.coordinate)}
                    //onDragEnd={(val)=>console.log(val.nativeEvent.coordinate)}
                />
            </MapView>
            <TouchableOpacity 
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.text2}>Use coordinate</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity 
                style={styles.button}
                onPress={() =>
                    navigation.navigate('TabNav', { name: 'test Screen1' })
                }
            >
                <Text style={styles.text2}>Back to graphs</Text>
            </TouchableOpacity> */}
        </View>
    )
};

export { Maps };