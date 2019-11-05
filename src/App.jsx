import React from 'react';
import Head from './component/head/';
import {Provider} from 'react-redux';
import Loadable from 'react-loadable';
import store from './store';
import {Icon} from 'antd';
import 'antd/dist/antd.css';

const loading = <Icon type="loading" style={{ fontSize: '300px', margin : '100px 100px'}}/>;
const Body = Loadable({
    loader : () => (import('./component/body/index')),
    loading : () => loading
});


const App = () => {
    return(
        <Provider store = {store}>
            <Head />
            <Body />
        </Provider>
    );
};
export default App;