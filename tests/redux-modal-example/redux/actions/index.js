import { CHANGE_LAT, CHANGE_LON, PICK_PARAM } from "./actions";

export const changeLat = (lat) => ({
    type: CHANGE_LAT,
    payload: lat,
})

export const  changeLon = (lon) => ({
    type: CHANGE_LON,
    payload: lon,
})

export const pickParam = (param) => ({
    type: PICK_PARAM,
    payload: param,
})