import React from "react";
import { View } from 'react-native'
import { styles } from "../../themes/styleSheet";
import { BasicText } from "../atoms/text";

const OutputBar = ({label}) => {
    return (
        <View style={styles.textOutputBar}>
            <BasicText label='Input Lat: ' />
            <BasicText label={label.label3} />
            <BasicText label='Input Lon: ' />
            <BasicText label={label.label4} />

        </View>
    )
    
};

export { OutputBar }