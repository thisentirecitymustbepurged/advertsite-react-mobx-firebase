import { mobxUtils } from 'common';
import { database } from 'api';
import { entity } from './entity';

const creator = initial => {
  const entities = mobxUtils.observableWithParent(initial);

  entities.update = array => {
    entities.length = 0;

    entities.push(...array.map(entity.creator));
  };
  entities.post = async () => {
    const res = await database.entities.post();

    return res;
  };
  entities.get = async () => {
    const res = await database.entities.get();

    entities.update(res);
  };
  entities.subscribe = async () => {
    const unsubscribe = await database.entities.subscribe(entities.update);

    entities.unsubscribe = unsubscribe;
  };
  entities.creator = creator;

  return entities;
};

export const entities = creator([]);
