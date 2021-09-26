import React from "react"
import {View, Image } from "react-native"
import { styles } from "../../themes/styleSheet"
import { BasicText, TextInputBox } from "../atoms/text"
import { SubmitButton } from "../atoms/buttons"

const MainPage = (props) => {
    return (
    <View style={styles.container}>
        <View style={styles.imageHeaderContainer}>
            <Image
                source={require("../../assets/images/Godlogo.jpg")}
                style={styles.imageHeader}
            />
        </View>
        <View style={styles.topBar}>
            <BasicText label = {props.label1}/>
            <TextInputBox onChange = {props.onChange1}/>
            <BasicText label = {props.label2}/>
            <TextInputBox onChange = {props.onChange2}/>
            <SubmitButton onPress = {props.submitPress}/>
        </View>
        <View style={styles.textOutputBar}>
            <BasicText label = {props.label3} />
            <BasicText label = {props.label4} />
            <BasicText label = {props.label5} />
            <BasicText label = {props.label6} />
        </View>
    </View>
    )
}

export { MainPage }