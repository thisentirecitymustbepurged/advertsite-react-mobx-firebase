import React from 'react';
import { observer } from 'mobx-react';

import { test, store } from 'store';
import logo from 'assets/logo.svg';

import './App.css';

export const App = observer(() => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        {/* {test.foo} */}
        {store.test.shit}
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
));
