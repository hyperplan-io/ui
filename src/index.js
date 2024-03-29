import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '@blueprintjs/core/lib/css/blueprint.css';
import { apiRootUrl } from './utils/Api';
require('dotenv').config();

const root = <App />;
ReactDOM.render(root, document.getElementById('root'));
console.log(`server root is ${apiRootUrl}`);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
