import { mobxUtils } from 'common';
import { test } from './test';

export const store = mobxUtils.observableWithParent({
  test
});

window.store = store;
