import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { MainPage } from './components/organisms/mainPage';
import  { BasicText } from './components/atoms/text'

function App() {
  const [lat, setlat] = useState();
  const [lon, setlon] = useState()
  const [lattmp, setlattmp] = useState()
  const [lontmp, setlontmp] = useState()

  const setValues = () => {
    setlon(lontmp), setlat(lattmp)
  }

  return (
    <MainPage 
      label1='lat' 
      label2='lon'
      label3='Input lat: '
      label5='Input lon: '
      label4={lat}
      label6={lon}
      onChange1={(latVal) => setlattmp(latVal)}
      onChange2={(lonval) => setlontmp(lonval)}
      submitPress={setValues}
    />
  );
}

export default App; 
