import { CHANGE_LAT, CHANGE_LON, SET_PARAM} from "./actions"
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