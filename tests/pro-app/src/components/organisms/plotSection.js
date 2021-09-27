import React from "react";
import { View } from 'react-native'
import { styles } from "../../themes/styleSheet";
import { Plot } from "../molecules/Plot";

const PlotBody = (props) => {
    return (
        <View style={styles.body}>
            <Plot dataProp={props.dataProp} />
        </View>
    )
};

export { PlotBody }