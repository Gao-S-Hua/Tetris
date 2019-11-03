import React from 'react';
import styles from './style.css';
import blockImg from '../../assets/block_blue.png'
const Block = (props) => {
    return <div className = {styles.block}> {props.set ? <img src = {blockImg} width = '25' height = '25'/> : null} </div>
}

export default Block;
