import React, {useState, useEffect} from 'react';
import styles from './style.css';
import Block from './Block';
import Control from './Control';
import {newEmpty, newActive, HEIGHT, WIDTH,TIME_GAP} from './constants';
import 'antd/dist/antd.css';


const Body = () => {
    const timerRef = React.useRef(null);
    const [posiX,setX] = useState(4);
    const [posiY,setY] = useState(0);
    const [activeBlock, setActive] = useState([0]);
    const [wallData, setWall] = useState([0]);
    const [score, setScore] = useState(0);
    

    useEffect(() => {
        if(checkHit()){
            console.log('hit');
            setWall(combine());
            setY(0);
            setX(4);
            setActive(newActive());
        }
    },[posiY]);

    const combine = () => {
        const newWall = JSON.parse(JSON.stringify(wallData));
        for(let i = 0; i < activeBlock[0].length; i++){
            for(let j = 0; j < activeBlock.length; j++){
               newWall[posiY + j][posiX + i] |= activeBlock[j][i] ;
            }
        }
        console.log(newWall);
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
            return newWall;
        const returnWall = [];
        console.log(clearLevel);
        for(let i = 0; i < clearLevel.length; i++){
            const newLevel = new Array(WIDTH).fill(0);
            returnWall.push(newLevel);
        }
        for(let i = 0; i < newWall.length; i++){
            if(!clearLevel.includes(i))
                returnWall.push(newWall[i]);
        }
        setScore(prev => prev+clearLevel.length);
        console.log(returnWall);
        return returnWall;
    }
    const handleReset = () => {
        setWall(newEmpty());
        setActive(newActive());
        setX(4);
        setY(0);
        timerRef.current = setInterval(() => {setY(posiY => Math.min(posiY + 1, HEIGHT - activeBlock.length -1))}, TIME_GAP);
    }

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

    const checkHit = () => {
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
    }

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
        <div>总分数： {score}</div>
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