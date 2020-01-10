import { mobxUtils } from 'common';

const model = ['a', 'b', 'c'];

export const entities = mobxUtils.observableWithParent(model);

window.entities = entities;
