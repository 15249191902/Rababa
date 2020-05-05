import React from 'react';
import {Button} from 'antd'
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// import Login from './component/Login
// import Case from './component/Case'
// import Children from './component/Children'
import Router from "./router/index"
ReactDOM.render(
  <Router></Router>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
