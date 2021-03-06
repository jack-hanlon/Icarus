import React, {useState, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, } from "react-native";
import { connect, useSelector, useDispatch } from "react-redux";
import { styles } from '../StyleSheet'

import store from '../redux/store/index'
import { changeLat, changeLon, pickParam} from '../redux/actions/index'

import Modal from "react-native-modal";
import {ScrollPicker} from 'react-native-value-picker';

const paramData = [
    {
      value: 'temp',
      label:'Temperature',
    },
    {
      value: 'flux',
      label:'Flux',
    },
    {
      value: 'humidity',
      label:'Humidity',
    },
    {
      value:'wind speed',
      label:'wind speed',
    },
    {
      value:'wind direction',
      label:'wind direction',
    },
    {
        value:'new1',
        label:'new1',
    },
    {
        value:'new2',
        label:'new2',
    },
    {
        value:'new3',
        label:'new3',
    },
    {
        value:'new4',
        label:'new4',
    },
    {
        value:'new5',
        label:'new5',
    },
    {
        value:'new6',
        label:'new6',
    },
    {
        value:'new7',
        label:'new7',
    },
  ]

const HomeScreen = () => {
    const lat = useSelector(state=>state.coords.lat)
    const lon = useSelector(state=>state.coords.lon)
    const param = useSelector(state=>state.params.param)
    
    const [paramModal, setParamModal] = useState(false)
    const [latModal, setLatModal] = useState(false)
    const [lonModal, setLonModal] = useState(false)
    const [selctionModal, setSelectionModal] = useState(false)
    const [pickedValue, setPickedValue] = useState(paramData[1].label);

    const dispatch = useDispatch()
    const toggleSelectionModal = () => setSelectionModal(()=>!selctionModal)
    const toggleParamModal = () => setParamModal(()=>!paramModal);
    const toggleLatModal = () => setLatModal(()=>!latModal)
    const toggleLonModal = () => setLonModal(()=>!lonModal)

    useEffect(() => {
        dispatch(pickParam(pickedValue))
        console.log(param)
        console.log(pickedValue)
    },[pickedValue])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={toggleSelectionModal}>
                <Text style={styles.text}>Chose all params</Text>
            </TouchableOpacity>
            <Modal isVisible={selctionModal}>
                <View style={styles.modelContainer}>
                    <View style={styles.inputBar}>
                        <Text style={styles.text}>Lat: </Text>
                        <Text style={styles.text}>{lat}</Text>
                        <TouchableOpacity style={styles.button} onPress={toggleLatModal}>
                            <Text style={styles.text}>set lat</Text>
                        </TouchableOpacity>
                        <Modal isVisible={latModal}>
                            <View style={styles.modelContainer}>
                                <View style={styles.inputBar}>
                                    <Text style={styles.text}>Enter lat Value: </Text>
                                </View>
                                <View style={styles.inputBar}>
                                    <TextInput
                                        style={styles.inputBox}
                                        onChangeText={(val)=>dispatch(changeLat(val))}
                                        keyboardType='numeric'
                                    />
                                </View>
                                <View style={styles.inputBar}>
                                    <TouchableOpacity style={styles.button} onPress={toggleLatModal}>
                                        <Text style={styles.text}>go back</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>

                    <View style={styles.inputBar}>
                        <Text style={styles.text}>Lon: </Text>
                        
                        <Text style={styles.text}>{lon}</Text>
                        <TouchableOpacity style={styles.button} onPress={toggleLonModal}>
                            <Text style={styles.text}>set lat</Text>
                        </TouchableOpacity>
                        <Modal isVisible={lonModal}>
                            <View style={styles.modelContainer}>
                                <View style={styles.inputBar}>
                                    <Text style={styles.text}>Enter lon Value: </Text>
                                </View>
                                <View style={styles.inputBar}>
                                    <TextInput
                                        style={styles.inputBox}
                                        onChangeText={(val)=>dispatch(changeLon(val))}
                                        keyboardType='numeric'
                                    />
                                </View>
                                <View style={styles.inputBar}>
                                    <TouchableOpacity style={styles.button} onPress={toggleLonModal}>
                                        <Text style={styles.text}>go back</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View style={styles.inputBar}>
                        <Text style={styles.text}>Param: </Text>
                        <Text style={styles.text}>{param}</Text>
                        <TouchableOpacity style={styles.button} onPress={toggleParamModal}>
                            <Text style={styles.text}>set param</Text>
                        </TouchableOpacity>
                        <Modal isVisible={paramModal}>
                            <View style={styles.modelContainer}>
                                <ScrollPicker 
                                    currentValue={pickedValue}
                                    extraData={pickedValue}
                                    list={paramData}
                                    onItemPress={setPickedValue}
                                    labelColor="blue"
                                    separatorColor="purple"
                                    selectedColor="red"
                                />
                                <TouchableOpacity style={styles.button} onPress={toggleParamModal}>
                                    <Text style={styles.text}>Go back</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>

                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={toggleSelectionModal}>
                    <Text style={styles.text}>Back</Text>
                </TouchableOpacity>
            </Modal>
        <View style={styles.inputBar}>
            <Text style={styles.text}>Entered values: </Text>
        </View>
        <View style={styles.inputBar}>
            <Text style={styles.text}>lat: {lat}  lon: {lon}  param: {param}</Text>
        </View>
        </View>


       
    )
};

export { HomeScreen };

//  {/* <View style={styles.container}>
      
//       <View style={styles.inputBar}>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={toggleSelectionModal}
//       >
//       <Text style={styles.text}>Pick Param</Text>
//       </TouchableOpacity>
//       <Modal isVisible={selctionModal}>
//         <View style={styles.modelContainer}>
//           <View style={styles.modelOptionsBar}>
//             <TouchableOpacity style={styles.button} onPress={toggleLatModal}>
//               <Text style={styles.text}>Set Lat</Text>
//             </TouchableOpacity>
//             <Modal isVisible={latModal}>
//               <View style={styles.modelOptionsBar}>
//                 <Text style={styles.text}>Chose Lat Value: </Text>
//                 <TextInput 
//                   style={styles.inputBox} 
//                   keyboardType='numeric'
//                   onChangeText={(val)=>dispatch(latReducer(val))}
//                   />
//                   <TouchableOpacity style={styles.button} onPress={toggleLatModal}>
//                     <Text style={styles.text}>Submit lat</Text>
//                   </TouchableOpacity>
//               </View>
//             </Modal>

//             <TouchableOpacity style={styles.button} onPress={toggleLonModal}>
//               <Text style={styles.text}>Set lon</Text>
//             </TouchableOpacity>
//             <Modal isVisible={lonModal}>
//               <View style={styles.modelOptionsBar}>
//                 <Text style={styles.text}>Chose Lon Value: </Text>
//                 <TextInput 
//                   style={styles.inputBox} 
//                   onChangeText={(val)=>dispatch(lonReducer(val))}
//                   />
//                 <TouchableOpacity style={styles.button} onPress={toggleLonModal}>
//                     <Text style={styles.text}>Submit lon</Text>
//                   </TouchableOpacity>
//               </View>
//             </Modal>
//             <TouchableOpacity style={styles.button} onPress={toggleParamModal}>
//               <Text style={styles.text}>Set Param</Text>
//             </TouchableOpacity>
//             <Modal isVisible={paramModal}>
//               <View style={styles.PickerContainer}>
//                 <ScrollPicker 
//                   currentValue={pickedValue}
//                   extraData={pickedValue}
//                   list={paramData}
//                   onItemPress={setPickedValue}
//                   labelColor="blue"
//                   separatorColor="purple"
//                   selectedColor="red"
//                 />
       
//               </View>
//               <TouchableOpacity style={styles.button} onPress={toggleParamModal}>
//                 <Text style={styles.text}>Good</Text>
//             </TouchableOpacity>
//             </Modal>
//           </View>
//             <TouchableOpacity style={styles.button} onPress={toggleSelectionModal}>
//               <Text style={styles.text}>Submit</Text>
//             </TouchableOpacity>
//         </View>
//       </Modal>
//       </View>
//     </View> */}