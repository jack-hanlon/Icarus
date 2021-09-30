import { CHANGE_LAT, CHANGE_LON } from "../actions/actions";

const initialCoord = {
    lat:0,
    lon:0,
};

const coordReducer = (state=initialCoord, action) => {
    switch (action.type){
        case CHANGE_LAT:
            return{
                ...state,
                lat: action.payload
            };
        case CHANGE_LON:
            return{
                ...state,
                lon: action.payload
            };
        default:
            return state;
    }
};

export default coordReducer;