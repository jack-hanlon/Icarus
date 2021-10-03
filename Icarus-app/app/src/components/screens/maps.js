import React, {useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import MapView, {Marker} from "react-native-maps";

import { styles } from "../../themes/styleSheet";

const Maps = ({navigation}) =>{
    const [mapRegion, setmapRegion] = useState({
        latitude: 48.4626,
        longitude: -123.3105,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    const [markerCoord, setMarkerCoord] = useState({
        latitude: 48.4626,
        longitude: -123.3105,
    });
    return(
        <View style={styles.container}>
            <MapView
                style={{alignSelf:'stretch', flex:0.7}}
                region={mapRegion}
            >
                <Marker draggable
                    coordinate={markerCoord} />
            </MapView>
            <TouchableOpacity 
                style={styles.button}
                onPress={() =>
                    navigation.navigate('TabNav', { name: 'test Screen1' })
                }
            >
                <Text style={styles.text2}>Back to graphs</Text>
            </TouchableOpacity>
        </View>
    )
};

export { Maps };