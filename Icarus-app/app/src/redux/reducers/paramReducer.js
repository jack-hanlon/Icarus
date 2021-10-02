import { SET_PARAM } from "../actions/actions";

const init_param = {
    param: null,
};

const paramReducer = (state=init_param, action) =>{
    switch(action.type){
        case SET_PARAM:
            return{
                ...state,
                param:action.payload,
            }
        default:
            return state
    }
};

export default paramReducer;