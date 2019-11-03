import {fromJS} from 'immutable';


const defautlState = fromJS({
    score : 0,
    dead : true,
    wallData : [],
    activeData : [],
    activeX : 0,
    activeY : 0
})

const reducer = (state = defautlState, action) => {
    switch(action.type){
        case "change_log":
            return state.set("logInfo", !state.get("logInfo"))
    }
    return state;
};

export default reducer;