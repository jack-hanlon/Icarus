import React from 'react'
import axios from 'axios'

const lat = 43.7068;
const lon = -79.3985;
const test_url1 = 'https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M&community=RE&longitude=-75.7097&latitude=45.3928&start=20210101&end=20210131&format=JSON'
const test_url2 = 'https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M&community=RE&longitude=-123.1706&latitude=49.3199&start=20210101&end=20210131&format=JSON'
const test_url3 ='https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M&community=RE&longitude=-123.4343&latitude=48.4239&start=20210101&end=20210331&format=JSON'
formated_url = (lon, lat) => `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,T2MDEW,T2MWET,TS,T2M_RANGE,T2M_MAX,T2M_MIN&community=RE&longitude=${lon}&latitude=${lat}&start=20150101&end=20150305&format=JSON`;
const url = formated_url(lon, lat)

const updateData = (response) => {
    // Takes the response of the api call, extracts, splits
    // then updates data states for plotting
    const T2M = response.data.properties.parameter.T2M
    const dates = Object.keys(T2M)
    const temps = Object.values(T2M)
    setLabel(dates), setData(temps)
  }

  const apiCall = () => {
    axios.get(test_url2)
      .then(response => {
      updateData(response);
    }, error => {
      console.log(error)
    });
  }