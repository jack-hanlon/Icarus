import { PICK_PARAM } from "../actions/actions";

const initialState = {
    param: "",

};

const paramReducer = (state=initialState, action) => {
    switch (action.type){
        case PICK_PARAM:
            return{
                ...state,
                param: action.payload,
            }

        default:
            return state;
    };
    
}

export default paramReducer;