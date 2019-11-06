import React, {useState, useEffect,useRef} from 'react';
import {connect, useDispatch} from 'react-redux';
import styles from './style.css';
import Block from './Block';
import Control from './Control';
import {newEmpty, newActive, HEIGHT, WIDTH,TIME_GAP} from './constants';
import 'antd/dist/antd.css';
import logo from '../../assets/Tetris_logo.jpg';
import * as ACTION from '../../store/constants';


const Body = (props) => {
    const dispatch = useDispatch();
    const {score, dead,wallData,activeBlock,posiX,posiY,timerID, start} = props;
    const {handleReset,handleLeft,handleRight,handleDown,handleUp} = props;
    useEffect( () => {
        if(dead){
            if(start){
                clearInterval(timerID);
                alert("GAME OVER !")
            }
        }else{
            const id = setInterval( ()=>dispatch({type : ACTION.TIME_DROP}), TIME_GAP );
            dispatch({type : ACTION.SET_TIMER, data : id })
        }
    } ,[dead])
    useEffect( () => {
        if(wallData.size !== 0) {
            if(wallData[0].includes(1) || wallData[1].includes(1))
                dispatch({type : ACTION.GAME_END})
        }
    } ,[wallData])

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
    const welcomeLogo = () => (
        <div className = {styles.welcomeLogo}>
            <img src = {logo} width = "250px"/>
        </div>
    )
    return(
        <>
        <div className = {styles.scoretitle}>总分数： {score}</div>
        <div className = {start ? styles.mainBody : styles.mainBody_init}>
            {start ? display() : welcomeLogo()}
        </div>
        <Control 
        handleReset = {handleReset} 
        handleLeft = {handleLeft} 
        handleRight = {handleRight}
        handleDown = {handleDown}
        handleUp = {handleUp}
        />
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
        timerID : state.get('timerID'),
        start : state.get('start')
    });

const mapDispatch = (dispatch) => {
    return {
        handleReset : () => dispatch({type: ACTION.RESET}),
        handleLeft : () => dispatch({type : ACTION.CLICK_LEFT}),
        handleRight : () => dispatch({type : ACTION.CLICK_RIGHT}),
        handleDown : () => dispatch({type : ACTION.TIME_DROP}),
        handleUp : () => dispatch({type : ACTION.CLICK_UP}),
    };
}

export default connect(mapState, mapDispatch)(Body);