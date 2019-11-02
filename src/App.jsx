import React from 'react';
import Head from './component/head/';
import {Provider} from 'react-redux';
import Loadable from 'react-loadable';
import {BrowserRouter, Route} from 'react-router-dom';
import store from './store';
import {Icon} from 'antd';
import 'antd/dist/antd.css';

const loading = <Icon type="loading" style={{ fontSize: '300px', margin : '100px 100px'}}/>;
const Body = Loadable({
    loader : () => (import('./component/body/')),
    loading : () => loading
});

const Test = Loadable({
    loader : () => import('./component/body/Test'),
    loading : () => loading
});

const App = () => {
    return(
        <Provider store = {store}>
            <BrowserRouter>
                <Head />
                <Route path = '/' exact component = {Body} ></Route>
                <Route path = '/test' exact component = {Test}></Route>
            </BrowserRouter>
        </Provider>
    );
};
export default App;