import { mobxUtils } from 'common';

const model = {
  foo: 'bar'
};

const instance = mobxUtils.observableWithParent(model);

window.test = instance;

export const test = instance;
