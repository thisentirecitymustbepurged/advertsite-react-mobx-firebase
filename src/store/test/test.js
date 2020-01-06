import { mobxUtils } from 'common';

const model = {
  shikaka: 'shikaka'
};

export const test = mobxUtils.observableWithParent(model);

window.test = test;
