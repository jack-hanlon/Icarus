import {CHANGE_BRAND} from "../actions/actions";

const init_brand = {
    brand: null,
};

const brandReducer = (state=init_brand, action) =>{
    switch(action.type){
        case CHANGE_BRAND:
            return{
                ...state,
                brand:action.payload,
            }
        default:
            return state
    }
};

export default brandReducer;
