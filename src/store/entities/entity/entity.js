import { mobxUtils } from 'common';

const creator = initial => {
  const entity = mobxUtils.observableWithParent(initial);

  entity.update = partial => Object.assign(entity, partial);

  return entity;
};

export const entity = {
  creator
};
