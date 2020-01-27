import React from 'react';
import { observer } from 'mobx-react';

import { entities } from 'store';

import './App.css';

export const App = observer(() => {
  console.log('render', entities);

  return (
    <div className="App">
      {entities.map(({ name }) => name)}
      {/* {entities.someArray && entities.someArray.parent.parent.entities.someArray[0][0].name.parent} */}
      {/* {entities.someArray && entities.someArray.parent.parent.test.shikaka} */}
    </div>
  );
});
