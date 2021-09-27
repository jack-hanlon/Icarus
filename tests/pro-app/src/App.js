import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { MainPage } from './components/screens/mainPage';


function App() {
  
  return (
    <MainPage/>
    // <MainPage 
    //   label1='lat' 
    //   label2='lon'
    //   label3='Input lat: '
    //   label5='Input lon: '
    //   label4={lat}
    //   label6={lon}
    //   onChange1={(latVal) => setlattmp(latVal)}
    //   onChange2={(lonval) => setlontmp(lonval)}
    //   submitPress={setValues}
    // />
  );
}

export default App; 
