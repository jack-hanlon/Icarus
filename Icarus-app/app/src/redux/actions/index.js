import {
    CHANGE_LAT,
    CHANGE_LON,
    SET_PARAM,
    SET_START_DATE,
    SET_END_DATE,
    TEMP_RES,
    CHANGE_BRAND,
    } from "./actions"
export const changeLat = (lat) => ({
    type: CHANGE_LAT,
    payload: lat,
})

export const  changeLon = (lon) => ({
    type: CHANGE_LON,
    payload: lon,
})

export const setParam = (val) => ({
    type:SET_PARAM,
    payload:val,
})

export const setStartDate = (val) => ({
    type: SET_START_DATE,
    payload:val,
})

export const setEndDate = (val) => ({
    type: SET_END_DATE,
    payload:val,
})

export const setTempRes = (val) => ({
    type: TEMP_RES,
    payload:val,
})

export const changeBrand = (brand) => ({
    type: CHANGE_BRAND,
    payload: brand,
})
