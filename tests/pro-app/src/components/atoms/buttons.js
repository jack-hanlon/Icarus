import React from 'react'
import {TouchableOpacity, Text} from 'react-native'
import { styles } from "../../themes/styleSheet"

const SubmitButton = ({onPress}) => {
    return (
        <TouchableOpacity
         style={styles.submitButton}
         onPress={onPress}
        >
        <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
    )
}

export { SubmitButton };
