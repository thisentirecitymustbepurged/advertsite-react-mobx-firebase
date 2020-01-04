import React from 'react';
import ReactDOM from 'react-dom';

import { App } from 'components';

import store from 'store';

import './index.css';

import * as mobx from 'mobx';

window.mobx = mobx;

console.log(store);

ReactDOM.render(<App />, document.getElementById('root'));
