import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx'

import { App } from 'components';

import './index.css';

configure({ enforceActions: "always" })

ReactDOM.render(<App />, document.getElementById('root'));
