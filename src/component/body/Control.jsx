import React from 'react';
import {Button, Icon} from 'antd';
import styles from './style.css'

const Control = (props) => {
    return(
        <div className = {styles.control}>
            <div className = {styles.controltext}>操控</div>
            <Button className = {styles.button1} onClick = {props.handleUp} >上</Button>
            <Button className = {styles.button2} onClick = {props.handleLeft}>左</Button>
            <Button className = {styles.button3} onClick = {props.handleRight}>右</Button>
            <Button className = {styles.button1} onClick = {props.handleDown}>下</Button>
            <Button className = {styles.reset} type = 'danger' onClick = {props.handleReset}>重新开始</Button>
        </div>
    );
};

export default Control;