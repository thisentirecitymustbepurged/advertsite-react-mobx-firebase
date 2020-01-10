import React from 'react';
import { observer } from 'mobx-react';

import { entities, test } from 'store';

import './App.css';

export const App = observer(() => {
  console.log('render');

  return (
    <div className="App">
      {entities.parent.entities.test}
    </div>
  );
});
