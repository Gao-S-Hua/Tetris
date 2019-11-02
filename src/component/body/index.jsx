import React, {useState} from 'react';
import styles from '../../style/body.less';
import {Button} from 'antd';
import 'antd/dist/antd.css';
import img from '../../assets/img.png';

const Body = () => {
    const [itemCnt, setCnt] = useState(1);
    return(
        <div className = {styles.bodyWrapper}>
            <div className = {styles.comment}>
            item Number : <b>{itemCnt}</b>
            </div>
            <Button type = 'primary' 
            onClick = {()=>setCnt(itemCnt + 1)}
            > Add </Button>
            <Button type = 'danger'
            onClick = {() => setCnt( Math.max(itemCnt - 1, 0) )}
            > Minus </Button>
            <div></div>
            <img src = {img}/>
        </div>
    );
}

export default Body;