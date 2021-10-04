import { SET_START_DATE, SET_END_DATE } from "../actions/actions";

const intialDates = {
    startDate:null,
    endDate: null,
};

const dateReducer = (state=intialDates, action) =>{
    switch(action.type){
        case SET_START_DATE:
            return{
                ...state,
                startDate:action.payload
            }
        case SET_END_DATE:
            return{
                ...state,
                endDate:action.payload
            }
        default:
            return state
    }
};

export default dateReducer;