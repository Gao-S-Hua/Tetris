import React, {useState, useEffect,useRef} from 'react';
import {connect, useDispatch} from 'react-redux';
import styles from './style.css';
import Block from './Block';
import Control from './Control';
import {newEmpty, newActive, HEIGHT, WIDTH,TIME_GAP} from './constants';
import 'antd/dist/antd.css';
import * as ACTION from '../../store/constants';


const Body = (props) => {
    const dispatch = useDispatch();
    const {score, dead,wallData,activeBlock,posiX,posiY,timerID} = props;
    const {handleReset,handleLeft,handleRight,handleDown,handleUp} = props;
    useEffect( () => {
        if(dead){
            clearInterval(timerID);
        }else{
            console.log("set timer");
            const id = setInterval( ()=>dispatch({type : ACTION.TIME_DROP}), TIME_GAP );
            dispatch({type : ACTION.SET_TIMER, data : id })
            console.log(id);
        }
    } ,[dead])
    const Debug = () => (
        <div>
            posiX : {posiX}     posiY : {posiY}     dead : {dead.toString()} timerID : {timerID}
            <br />
            {activeBlock};
        </div>
    )
    const display = () => {
        const rawData = newEmpty();
        for(let i = 0; i < wallData.length; i++){
            for(let j = 0; j < wallData[0].length;j++){
                rawData[i][j] = wallData[i][j];
            }
        }
        for(let i = 0; i < activeBlock.length; i++){
            for(let j = 0; j < activeBlock[0].length; j++){
                rawData[posiY + i][posiX + j] |= activeBlock[i][j];
            }
        }
        const dataBlock = [];
        for(let i = 0; i < rawData.length; i++){
            for(let j = 0; j < rawData[0].length;j++){
                dataBlock.push(<Block key = {i.toString()+'_'+j.toString()} set = {rawData[i][j]}/>)
            }
        }
        return dataBlock;
    }
    return(
        <>
        <div className = {styles.scoretitle}>总分数： {score}</div>
        <div className = {styles.mainBody}>
            {display()}
        </div>
        <Control 
        handleReset = {handleReset} 
        handleLeft = {handleLeft} 
        handleRight = {handleRight}
        handleDown = {handleDown}
        handleUp = {handleUp}
        />
        <Debug />
        </>
    );
}

// Handlers :



const mapState = (state) => (
    {
        score : state.get('score'),
        dead : state.get('dead'),
        wallData : state.get('wallData'),
        activeBlock : state.get('activeBlock'),
        posiX : state.get('posiX'),
        posiY : state.get('posiY'),
        timerID : state.get('timerID')
    });

const mapDispatch = (dispatch) => {
    return {
        handleReset : () => dispatch({type: ACTION.RESET}),
        handleLeft : () => dispatch({type : ACTION.CLICK_LEFT}),
        handleRight : () => dispatch({type : ACTION.CLICK_RIGHT}),
        handleDown : () => dispatch({type : ACTION.CLICK_DOWN}),
        handleUp : () => dispatch({type : ACTION.CLICK_UP}),
    };
}

export default connect(mapState, mapDispatch)(Body);