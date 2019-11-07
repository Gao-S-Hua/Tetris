import {fromJS} from 'immutable';
import {newEmpty, newActive, HEIGHT, WIDTH} from '../component/body/constants';
import * as ACTION from './constants';

const defautlState = fromJS({
    score : 999,
    dead : true,
    wallData : [],
    activeBlock : [],
    posiX : 0,
    posiY : 0,
    timerID : null,
    start : false
})

const reducer = (state = defautlState, action) => {
    const posiX = state.get('posiX');
    const posiY = state.get('posiY');
    const wallData = state.get('wallData');
    const activeBlock = state.get('activeBlock');
    
    switch(action.type){
        case ACTION.RESET:{
            return state.merge({
                start : true,
                score : 0,
                dead : false,
                wallData : newEmpty(),
                activeBlock : newActive(),
                posiX : 4,
                posiY : 0
            }
            )
        }
        // Handle Click left
        case ACTION.CLICK_LEFT:{
            return state.merge({
                posiX : Math.max(posiX - 1, 0)
            })
        }
        // Handle click right
        case ACTION.CLICK_RIGHT:{
            return state.merge({
                posiX : Math.min(posiX + 1, WIDTH - activeBlock[0].length),
            })
        }
        // Handle click up
        case ACTION.CLICK_UP:{
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
            if(checkHit(posiY, posiX, activeBlock, wallData)){
                console.log('hit');
                const {scoreNew,newWallReturn} = combine(posiY, posiX, activeBlock, wallData);
                return state.merge({
                    wallData : newWallReturn,
                    score : state.get('score') + scoreNew,
                    posiX : 4,
                    posiY : 0,
                    activeBlock : newActive()
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
            return state.set('start', !state.get('start'));
        }

    }
    return state;
};

export default reducer;


const checkHit = (posiY, posiX, activeBlock, wallData) => {
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
}