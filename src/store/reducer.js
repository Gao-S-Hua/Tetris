import {fromJS} from 'immutable';
import {newEmpty, newActive, HEIGHT, WIDTH} from '../component/body/constants';
import * as ACTION from './constants';

const defautlState = fromJS({
    score : 999,
    mode : true,
    dead : true,
    wallData : [],
    activeBlock : [],
    posiX : 0,
    posiY : 0,
    timerID : null,
    start : false,
    pause : false,
    theme : 'blue'
})

const reducer = (state = defautlState, action) => {
    const posiX = state.get('posiX');
    const posiY = state.get('posiY');
    const wallData = state.get('wallData');
    const activeBlock = state.get('activeBlock');
    const pause = state.get('pause');
    const mode = state.get('mode');
    switch(action.type){
        case ACTION.RESET:{
            const newState = state.merge({
                start : true,
                score : 0,
                dead : false,
                pause : false,
                wallData : newEmpty(),
                activeBlock : newActive(mode),
                posiX : 4,
                posiY : 0
            }
            )
            if(action.mode == 0) // not set, use previous mode
                return newState;
            if(action.mode == 1) // set to easy mode
                return newState.set('mode', true);
            if(action.mode == 2) // set to hard mode
                return newState.set('mode', false);
        }
        // Handle Click left
        case ACTION.CLICK_LEFT:{
            if(!pause){
                if(!checkLeftHit(posiY, posiX, activeBlock, wallData))
                    return state.set('posiX', posiX - 1)
                else
                    return state;
            }
            return state;
        }
        // Handle click right
        case ACTION.CLICK_RIGHT:{
            if(!pause){
                if(!checkRightHit(posiY, posiX, activeBlock, wallData))
                    return state.set('posiX', posiX + 1)
                else
                    return state;
            }
            return state;
        }
        // Handle click up
        case ACTION.CLICK_UP:{
            if(pause) return state;
            const reverseBlock = [];
            for(let i = 0; i < activeBlock[0].length; i++){
                const newLine = [];
                for(let j = activeBlock.length-1; j >=0; j--){
                    newLine.push(activeBlock[j][i]);
                }
                reverseBlock.push(newLine);
            }
            if( (posiX + reverseBlock[0].length) <= WIDTH && (posiY + reverseBlock.length) <= HEIGHT)
                return state.set('activeBlock', reverseBlock)
        }
        // Combine handle_drop with time_drop
        case ACTION.TIME_DROP : {
            if(pause) return state;
            if(checkHit(posiY, posiX, activeBlock, wallData)){
                const {scoreNew,newWallReturn} = combine(posiY, posiX, activeBlock, wallData);
                return state.merge({
                    wallData : newWallReturn,
                    score : state.get('score') + scoreNew,
                    posiX : 4,
                    posiY : 0,
                    activeBlock : newActive(mode)
                })
            }
            else{ 
                return state.set('posiY',posiY + 1);
            }
        }

        case ACTION.SET_TIMER:{
            return state.set('timerID', action.data);
        }

        case ACTION.GAME_END : {
            return state.set('dead', true);
        }
        
        case ACTION.PAUSE : {
            return state.set('pause', !state.get('pause'));
        }

        case ACTION.BACKHOME : {
            clearInterval(state.get('timerID'));
            return defautlState;
        }

        case ACTION.CHANGETHEME : {
            return state.set('theme', action.mode)
        }

    }
    return state;
};

export default reducer;


const checkHit = (posiY, posiX, activeBlock, wallData) => {
    if(activeBlock.length == undefined) return false;
    // Check hit bottom
    if(posiY + activeBlock.length == HEIGHT) return true;
    // Check hit wall
    for(let i = 0; i < activeBlock[0].length; i++){
        for(let j = 0; j < activeBlock.length; j++){
           if(wallData[posiY + j + 1][posiX+i] && activeBlock[j][i])
                return true;
        }
    }
    return false;
};

const combine = (posiY, posiX, activeBlock, wallData) => {
    const newWall = JSON.parse(JSON.stringify(wallData));
    for(let i = 0; i < activeBlock[0].length; i++){
        for(let j = 0; j < activeBlock.length; j++){
           newWall[posiY + j][posiX + i] |= activeBlock[j][i] ;
        }
    }
    // clear wall
    const clearLevel = [];
    for(let i = 0; i < newWall.length; i++){
        let clear = true;
        for(let j = 0; j < newWall[0].length; j++){
           clear &= newWall[i][j];
           if(!clear) break;
        }
        if(clear) clearLevel.push(i);
    }
    if(clearLevel.length == 0) // Dont need to clear
        return {scoreNew : 0, newWallReturn : newWall};

    const returnWall = [];
    for(let i = 0; i < clearLevel.length; i++){
        const newLevel = new Array(WIDTH).fill(0);
        returnWall.push(newLevel);
    }
    for(let i = 0; i < newWall.length; i++){
        if(!clearLevel.includes(i))
            returnWall.push(newWall[i]);
    }
    return {scoreNew : clearLevel.length, newWallReturn : returnWall};
};

const checkLeftHit = (posiY, posiX, activeBlock,wallData) => {
    if(posiX == 0) return true;
    for(let i = 0; i < activeBlock[0].length; i++){
        for(let j = 0; j < activeBlock.length; j++){
           if(wallData[posiY + j][posiX+i - 1] && activeBlock[j][i])
                return true;
        }
    }
    return false;
};

const checkRightHit = (posiY, posiX, activeBlock,wallData) => {
    if(posiX + activeBlock[0].length == WIDTH)  return true;
    for(let i = 0; i < activeBlock[0].length; i++){
        for(let j = 0; j < activeBlock.length; j++){
           if(wallData[posiY + j][posiX+i + 1] && activeBlock[j][i])
                return true;
        }
    }
    return false;
};