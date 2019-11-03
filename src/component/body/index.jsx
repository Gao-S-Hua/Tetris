import React, {useState, useEffect} from 'react';
import styles from './style.css';
import Block from './Block';
import Control from './Control';
import {newEmpty, newBlock, HEIGHT, WIDTH} from './constants';
import 'antd/dist/antd.css';


const Body = () => {
    const timerRef = React.useRef(null);
    const [posiX,setX] = useState(4);
    const [posiY,setY] = useState(0);
    const [activeBlock, setActive] = useState([0]);
    const [wallData, setWall] = useState([0]);
    
    const handleReset = () => {
        setWall(newEmpty());
        const active = newBlock[Math.round(Math.random()*4)];
        setActive(active);
        setX(4);
        setY(0);
        timerRef.current = setInterval(() => {setY(posiY => Math.min(posiY + 1, HEIGHT - activeBlock.length -1))}, 800);
        // timerRef.current = setInterval(() => handleDown(), 800);
    }
    // useEffect(() => {
    //     if(posiY + activeBlock.length == HEIGHT){
            
    //     }
    // },[posiY])
    const handleLeft = () => {setX(Math.max(posiX - 1,0))};
    const handleRight = () => {
        setX(Math.min(posiX + 1,WIDTH - activeBlock[0].length ) );
    };
    const handleDown = () => {
        const newY = Math.min(posiY + 1,HEIGHT - activeBlock.length)
        setY(newY);
    };
    const handleUp = () => {
        const reverseBlock = [];
        for(let i = 0; i < activeBlock[0].length; i++){
            const newLine = [];
            for(let j = activeBlock.length-1; j >=0; j--){
                newLine.push(activeBlock[j][i]);
            }
            reverseBlock.push(newLine);
        }
        if( (posiX + reverseBlock[0].length) <= WIDTH && (posiY + reverseBlock.length) <= HEIGHT)
            setActive(reverseBlock);
    };


    const display = () => {
        const rawData = newEmpty();
        for(let i = 0; i < wallData.length; i++){
            for(let j = 0; j < wallData[0].length;j++){
                rawData[i][j] = wallData[i][j];
            }
        }
        for(let i = 0; i < activeBlock.length; i++){
            for(let j = 0; j < activeBlock[0].length; j++){
                rawData[posiY + i][posiX + j] = activeBlock[i][j];
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
        <div>总分数： 5 </div>
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
        </>
    );
}

export default Body;