import React from 'react';
import { observer } from 'mobx-react';

import { entities } from 'store';

import './App.css';

export const App = observer(() => {
  console.log('render');

  return (
    <div className="App">
      {/* {entities.someArray && entities.someArray[0]} */}
      {/* {entities.someArray && entities.someArray.parent.parent.test.shikaka} */}
    </div>
  );
});
