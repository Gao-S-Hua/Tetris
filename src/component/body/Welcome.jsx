import React from 'react';
import logo from '../../assets/Tetris_logo.jpg';
import {Button} from 'antd'
import styles from './style.css';
import blockBlue from '../../assets/block_blue.png'
import blockGreen from '../../assets/block_green.png'
import blockRed from '../../assets/block_red.png'
import blockYellow from '../../assets/block_yellow.png'

const Welcome = (props) => {
    const {theme, changeTheme} = props;
    return(
        <div className = {styles.welcomeLogo}>
            <img src = {logo} width = "250px"/>
            <div className = {styles.modeselection}>
            <Button type = 'primary' className = {styles.modebutton} onClick = {props.easyMode}>简单模式</Button>
            <Button type = 'danger' className = {styles.modebutton} onClick = {props.hardMode}>困难模式</Button>
            </div>
            <div className = {styles.themeChange}>
            <div className = {theme === 'blue' ? styles.selectedtheme : styles.theme } onClick = {()=>changeTheme('blue')}><img src = {blockBlue} width = "30px"/></div>
            <div className = {theme === 'green' ? styles.selectedtheme : styles.theme} onClick = {()=>changeTheme('green')}><img src = {blockGreen} width = "30px"/></div>
            <div className = {theme === 'red' ? styles.selectedtheme : styles.theme} onClick = {()=>changeTheme('red')}><img src = {blockRed} width = "30px"/></div>
            <div className = {theme === 'yellow' ? styles.selectedtheme : styles.theme} onClick = {()=>changeTheme('yellow')}><img src = {blockYellow} width = "30px"/></div>
            </div>
        </div>
    );
};

export default Welcome;