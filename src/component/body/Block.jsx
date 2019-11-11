import React from 'react';
import styles from './style.css';
import blockBlue from '../../assets/block_blue.png'
import blockGreen from '../../assets/block_green.png'
import blockRed from '../../assets/block_red.png'
import blockYellow from '../../assets/block_yellow.png'
const Block = (props) => {
    const {theme} = props;
    let blockImg;
    if(theme === 'red') blockImg = blockRed;
    if(theme === 'blue') blockImg = blockBlue;
    if(theme === 'green') blockImg = blockGreen;
    if(theme === 'yellow') blockImg = blockYellow;
    return <div className = {styles.block}> {props.set ? <img src = {blockImg} width = '25' height = '25'/> : null} </div>
}

export default Block;
