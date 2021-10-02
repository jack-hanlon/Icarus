import { StyleSheet } from 'react-native'
import Metrics from './metrics'
import colors from './colors'
import { fontSize } from './fonts'
const styles = StyleSheet.create({
    screenContainer:{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
    },
    text:{
        color:colors.textPrimary,
        margin:10,
        fontSize: fontSize.font20
    },
})

export { styles };