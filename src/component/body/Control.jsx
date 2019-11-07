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
            <Button className = {styles.pause} type = 'primary' onClick = {props.handlePause}>{props.start? "暂 停" : "继 续"}</Button>
            <Button className = {styles.reset} type = 'danger' onClick = {props.handleReset}>重新开始</Button>
            <div className = {styles.instruction}>**使用鼠标或者键盘方向键控制，空格暂停，回车重新开始</div>
        </div>
    );
};

export default Control;