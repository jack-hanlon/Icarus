import { Text, } from "react-native"
import { styles } from "../../../../react-native-fetchAPI/StyleSheet";

const basicText = (label) => {
    return(
        <Text styles={styles.basicText}>{label}</Text>
    );
};