import React from "react";
import { View } from "react-native"
import { styles } from "../../themes/styleSheet"
import { BasicText, TextInputBox } from "../atoms/text";
import { SubmitButton } from "../atoms/buttons";

const TopBar = ({onChange}) => {
    return (
        <View style={styles.topBar}>
            {/* <BasicText label='Hello'/> */}
            <BasicText label = 'Lat: '/>
            <TextInputBox onChange = {onChange.latChange}/>
            <BasicText label = 'Lon: '/>
            <TextInputBox onChange = {onChange.lonChange}/>
            <SubmitButton onPress = {onChange.submitBTN}/>
        </View>
    )
};

export { TopBar };