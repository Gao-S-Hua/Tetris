import React from 'react';
import logo from '../../assets/Tetris_logo.jpg';
import {Button} from 'antd'
import styles from './style.css';

const Welcome = (props) => {
    return(
        <div className = {styles.welcomeLogo}>
            <img src = {logo} width = "250px"/>
            <div className = {styles.modeselection}>
            <Button type = 'primary' className = {styles.modebutton} onClick = {props.easyMode}>简单模式</Button>
            <Button type = 'danger' className = {styles.modebutton} onClick = {props.hardMode}>困难模式</Button>
            </div>
        </div>
    );
};

export default Welcome;