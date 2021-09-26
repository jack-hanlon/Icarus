import React from 'react';
import { Text, View, TextInput } from "react-native"
import colors from '../../themes/colors';
import { styles } from '../../themes/styleSheet';

const BasicText = ({label}) => {
    return(
        <Text style={styles.textBox}>{label}</Text>
    );
};

const TextInputBox = ({onChange}) => {
    return (
        <TextInput
            style={styles.textInput}
            keyboardType='numeric'
            placeholder='eg.: 43.00'
            placeholderTextColor={colors.textPrimary}
            onChangeText={onChange}
        />
    )

}

export { BasicText, TextInputBox }