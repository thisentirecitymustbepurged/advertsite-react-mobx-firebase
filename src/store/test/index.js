import { mobxUtils } from 'common';

const model = {
  foo: 'bar'
};

export const test = mobxUtils.observableWithParent(model);
