import { mobxUtils } from 'common';
import { test } from './test';
import { entities } from './entities';


export const store = mobxUtils.observableWithParent({
  test,
  entities
});

window.store = store;
