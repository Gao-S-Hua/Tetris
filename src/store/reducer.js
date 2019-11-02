import {fromJS} from 'immutable';


const defautlState = fromJS({
    logInfo : false
})

const reducer = (state = defautlState, action) => {
    switch(action.type){
        case "change_log":
            return state.set("logInfo", !state.get("logInfo"))
    }
    return state;
};

export default reducer;