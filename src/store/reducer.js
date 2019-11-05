import {fromJS} from 'immutable';
import {newEmpty, newActive, HEIGHT, WIDTH,TIME_GAP} from '../component/body/constants';
import * as ACTION from './constants';

const defautlState = fromJS({
    score : 999,
    dead : true,
    wallData : [],
    activeBlock : [],
    posiX : 0,
    posiY : 0,
    timerID : null
})

const reducer = (state = defautlState, action) => {
    const posiX = state.get('posiX');
    const posiY = state.get('posiY');
    const activeBlock = state.get('activeBlock');
    switch(action.type){
        case ACTION.RESET:{
            return state.merge({
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
        // Hanlde click down
        case ACTION.CLICK_DOWN: {
            return state.set('posiY', Math.min(posiY + 1,HEIGHT - activeBlock.length));
        }

        case ACTION.TIME_DROP : {
            console.log("TIME OUT");
            return state;
        }

        case ACTION.SET_TIMER:{
            return state.set('timerID', action.data);
        }

    }
    return state;
};

export default reducer;