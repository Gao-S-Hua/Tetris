import React from 'react';
import {connect, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import styles from './head.css';

const Head = (props) => {
    const log = props.log;
    const dispatch = useDispatch();
    const handleLog = () => {
        const action = {
            type : "change_log"
        };
        dispatch(action);
    }

    return(
        <div className = {styles.headbody}>
            <div className = {styles.welcome}>俄罗斯方块</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        log : state.get("logInfo")
    }
}

// const mapDispatchToProps = () => {
//     return null;
// }

export default connect(mapStateToProps, null)(Head);