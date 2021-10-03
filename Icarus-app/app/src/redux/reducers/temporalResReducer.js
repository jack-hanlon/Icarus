import { TEMP_RES } from "../actions/actions";

const init_tempRes = {
    temp_res: 'daily',
};

const tempResReducer = (state=init_tempRes, action)=>{
    switch(action.type){
        case TEMP_RES:
            return{
                ...state,
                temp_res:action.payload
            }
        default:
            return state
    }
};

export default tempResReducer;