import React from "react";
import { View } from "react-native"
import { TopBar } from "../molecules/topBar";
import { OutputBar } from "../molecules/textOutputBar";
import { styles } from "../../themes/styleSheet";

const LatLonIn = (props) => { 
    
    return (
        <View style={styles.latloninContainer}>
            <TopBar onChange={props.onChange}/>
            <OutputBar label={props.label}/>
        </View>
    )
    
};

export { LatLonIn };